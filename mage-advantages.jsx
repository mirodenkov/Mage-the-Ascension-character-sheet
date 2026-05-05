
// Backgrounds, Merits & Flaws Tab

const COMMON_BACKGROUNDS = [
  'Allies','Arcane','Avatar','Contacts','Destiny','Dream','Familiar',
  'Influence','Library','Node','Resources','Sanctum','Spies','Tass','Wonder'
];

function BackgroundRow({ bg, index, onChange, onRemove }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '7px 0',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}>
      <div style={{ flex: '0 0 160px' }}>
        <input
          list="bg-list"
          value={bg.name || ''}
          onChange={e => onChange({ ...bg, name: e.target.value })}
          placeholder="Background name"
          style={{
            background: 'transparent', border: 'none',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'EB Garamond, serif', fontSize: '14px',
            outline: 'none', width: '100%', padding: '2px 4px',
          }}
        />
        <datalist id="bg-list">
          {COMMON_BACKGROUNDS.map(b => <option key={b} value={b} />)}
        </datalist>
      </div>
      <HexRating value={bg.value || 0} max={5} onChange={v => onChange({ ...bg, value: v })} size={14} />
      <input
        value={bg.notes || ''}
        onChange={e => onChange({ ...bg, notes: e.target.value })}
        placeholder="Notes…"
        style={{
          flex: 1,
          background: 'transparent', border: 'none',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-muted)',
          fontFamily: 'EB Garamond, serif', fontSize: '13px', fontStyle: 'italic',
          outline: 'none', padding: '2px 4px',
        }}
      />
      <GhostBtn small danger onClick={onRemove}>✕</GhostBtn>
    </div>
  );
}

function MeritFlawRow({ item, onChange, onRemove, isFlaws }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '7px 0',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
    }}>
      <input
        value={item.name || ''}
        onChange={e => onChange({ ...item, name: e.target.value })}
        placeholder={isFlaws ? 'Flaw name' : 'Merit name'}
        style={{
          flex: '0 0 160px',
          background: 'transparent', border: 'none',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-primary)',
          fontFamily: 'EB Garamond, serif', fontSize: '14px',
          outline: 'none', padding: '2px 4px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: 'var(--text-muted)' }}>pts</span>
        <input
          type="number" min="1" max="7"
          value={item.value || ''}
          onChange={e => onChange({ ...item, value: parseInt(e.target.value) || 0 })}
          style={{
            width: '36px',
            background: 'transparent', border: 'none',
            borderBottom: '1px solid var(--border)',
            color: isFlaws ? '#c04040' : 'var(--accent-gold)',
            fontFamily: 'Cinzel, serif', fontSize: '14px',
            outline: 'none', textAlign: 'center',
          }}
        />
      </div>
      <input
        value={item.description || ''}
        onChange={e => onChange({ ...item, description: e.target.value })}
        placeholder="Description…"
        style={{
          flex: 1,
          background: 'transparent', border: 'none',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-muted)',
          fontFamily: 'EB Garamond, serif', fontSize: '13px', fontStyle: 'italic',
          outline: 'none', padding: '2px 4px',
        }}
      />
      <GhostBtn small danger onClick={onRemove}>✕</GhostBtn>
    </div>
  );
}

function AdvantagesTab({ char, update }) {
  const addBg = () => update('backgrounds', [...(char.backgrounds || []), { name: '', value: 0, notes: '' }]);
  const updateBg = (i, val) => {
    const arr = [...(char.backgrounds || [])];
    arr[i] = val;
    update('backgrounds', arr);
  };
  const removeBg = (i) => update('backgrounds', (char.backgrounds || []).filter((_, j) => j !== i));

  const addMerit = () => update('merits', [...(char.merits || []), { name: '', value: 0, description: '' }]);
  const updateMerit = (i, val) => {
    const arr = [...(char.merits || [])];
    arr[i] = val;
    update('merits', arr);
  };
  const removeMerit = (i) => update('merits', (char.merits || []).filter((_, j) => j !== i));

  const addFlaw = () => update('flaws', [...(char.flaws || []), { name: '', value: 0, description: '' }]);
  const updateFlaw = (i, val) => {
    const arr = [...(char.flaws || [])];
    arr[i] = val;
    update('flaws', arr);
  };
  const removeFlaw = (i) => update('flaws', (char.flaws || []).filter((_, j) => j !== i));

  const totalMeritPts = (char.merits || []).reduce((s, m) => s + (m.value || 0), 0);
  const totalFlawPts  = (char.flaws || []).reduce((s, f) => s + (f.value || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Backgrounds */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SectionTitle>Backgrounds</SectionTitle>
          <GhostBtn small onClick={addBg}>+ Add</GhostBtn>
        </div>
        {(char.backgrounds || []).length === 0
          ? <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No backgrounds added yet.</div>
          : (char.backgrounds || []).map((bg, i) => (
            <BackgroundRow key={i} bg={bg} index={i} onChange={v => updateBg(i, v)} onRemove={() => removeBg(i)} />
          ))
        }
      </Panel>

      {/* Merits & Flaws side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <SectionTitle>Merits</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: 'var(--accent-gold)' }}>{totalMeritPts} pts</span>
              <GhostBtn small onClick={addMerit}>+ Add</GhostBtn>
            </div>
          </div>
          {(char.merits || []).length === 0
            ? <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No merits.</div>
            : (char.merits || []).map((m, i) => (
              <MeritFlawRow key={i} item={m} onChange={v => updateMerit(i, v)} onRemove={() => removeMerit(i)} />
            ))
          }
        </Panel>

        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <SectionTitle>Flaws</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: '#c04040' }}>{totalFlawPts} pts</span>
              <GhostBtn small onClick={addFlaw}>+ Add</GhostBtn>
            </div>
          </div>
          {(char.flaws || []).length === 0
            ? <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No flaws.</div>
            : (char.flaws || []).map((f, i) => (
              <MeritFlawRow key={i} item={f} isFlaws onChange={v => updateFlaw(i, v)} onRemove={() => removeFlaw(i)} />
            ))
          }
        </Panel>
      </div>
    </div>
  );
}

Object.assign(window, { AdvantagesTab });
