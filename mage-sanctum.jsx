
// Sanctum, Equipment & Wonders Tab

const EQUIPMENT_CATEGORIES = ['Weapon','Armor','Tool','Vehicle','Communication','Occult','Personal','Other'];
const WONDER_TYPES = ['Talisman','Fetish','Grimoire','Periapt','Construct','Device','Other'];

function SanctumTab({ char, update }) {
  const addEquipment = () => update('equipment', [...(char.equipment || []), { name: '', category: '', description: '', weight: '' }]);
  const updateEquipment = (i, val) => { const a = [...(char.equipment || [])]; a[i] = val; update('equipment', a); };
  const removeEquipment = (i) => update('equipment', (char.equipment || []).filter((_, j) => j !== i));

  const addWonder = () => update('wonders', [...(char.wonders || []), { name: '', type: '', description: '', arete: 0, quintessence: 0, spheres: '' }]);
  const updateWonder = (i, val) => { const a = [...(char.wonders || [])]; a[i] = val; update('wonders', a); };
  const removeWonder = (i) => update('wonders', (char.wonders || []).filter((_, j) => j !== i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Sanctum */}
      <Panel>
        <SectionTitle>Sanctum</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <TextInput label="Sanctum Name / Location" value={char.sanctum?.name} onChange={v => update('sanctum', { ...char.sanctum, name: v })} wide />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Node Rating</label>
              <HexRating value={char.sanctum?.rating || 0} max={5} onChange={v => update('sanctum', { ...char.sanctum, rating: v })} size={15} />
            </div>
          </div>
          <TextArea label="Description" value={char.sanctum?.description} onChange={v => update('sanctum', { ...char.sanctum, description: v })}
            placeholder="Describe the sanctum: its location, appearance, defenses, wards, and atmosphere…" rows={4} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <TextArea label="Tass Sources" value={char.sanctum?.tass} onChange={v => update('sanctum', { ...char.sanctum, tass: v })}
              placeholder="What form does Tass take here? How much is available?" rows={3} />
            <TextArea label="Notable Locations & Rooms" value={char.sanctum?.locations} onChange={v => update('sanctum', { ...char.sanctum, locations: v })}
              placeholder="Laboratory, library, meditation chamber, hidden rooms…" rows={3} />
          </div>
        </div>
      </Panel>

      {/* Equipment */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SectionTitle>Equipment & Inventory</SectionTitle>
          <GhostBtn small onClick={addEquipment}>+ Add Item</GhostBtn>
        </div>
        {(char.equipment || []).length === 0 ? (
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No equipment recorded.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(char.equipment || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                <input
                  value={item.name || ''}
                  onChange={e => updateEquipment(i, { ...item, name: e.target.value })}
                  placeholder="Item name"
                  style={{ flex: '1 1 160px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '14px', outline: 'none', padding: '2px 4px' }}
                />
                <select
                  value={item.category || ''}
                  onChange={e => updateEquipment(i, { ...item, category: e.target.value })}
                  style={{ flex: '0 0 110px', background: 'var(--bg-deep)', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'EB Garamond, serif', fontSize: '13px', outline: 'none', padding: '2px 4px', cursor: 'pointer' }}
                >
                  <option value="">Category…</option>
                  {EQUIPMENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input
                  value={item.description || ''}
                  onChange={e => updateEquipment(i, { ...item, description: e.target.value })}
                  placeholder="Notes & description…"
                  style={{ flex: 2, background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'EB Garamond, serif', fontSize: '13px', fontStyle: 'italic', outline: 'none', padding: '2px 4px' }}
                />
                <GhostBtn small danger onClick={() => removeEquipment(i)}>✕</GhostBtn>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {/* Wonders */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SectionTitle>Wonders & Fetishes</SectionTitle>
          <GhostBtn small onClick={addWonder}>+ Add Wonder</GhostBtn>
        </div>
        {(char.wonders || []).length === 0 ? (
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No wonders or fetishes recorded.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(char.wonders || []).map((wonder, i) => (
              <div key={i} style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', padding: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'flex-end' }}>
                  <input
                    value={wonder.name || ''}
                    onChange={e => updateWonder(i, { ...wonder, name: e.target.value })}
                    placeholder="Wonder name"
                    style={{ flex: '1 1 160px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '15px', outline: 'none', padding: '2px 4px' }}
                  />
                  <select
                    value={wonder.type || ''}
                    onChange={e => updateWonder(i, { ...wonder, type: e.target.value })}
                    style={{ flex: '0 0 110px', background: 'var(--bg-deep)', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--accent-gold)', fontFamily: 'EB Garamond, serif', fontSize: '13px', outline: 'none', padding: '2px 4px', cursor: 'pointer' }}
                  >
                    <option value="">Type…</option>
                    {WONDER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Arete</label>
                    <HexRating value={wonder.arete || 0} max={5} onChange={v => updateWonder(i, { ...wonder, arete: v })} size={13} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Quintessence</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GhostBtn small onClick={() => updateWonder(i, { ...wonder, quintessence: Math.max(0, (wonder.quintessence || 0) - 1) })}>−</GhostBtn>
                      <span style={{ fontFamily: 'Cinzel, serif', fontSize: '16px', color: 'var(--accent-gold)', minWidth: '20px', textAlign: 'center' }}>{wonder.quintessence || 0}</span>
                      <GhostBtn small onClick={() => updateWonder(i, { ...wonder, quintessence: (wonder.quintessence || 0) + 1 })}>+</GhostBtn>
                    </div>
                  </div>
                  <input
                    value={wonder.spheres || ''}
                    onChange={e => updateWonder(i, { ...wonder, spheres: e.target.value })}
                    placeholder="Spheres (e.g. Forces 3)"
                    style={{ flex: '0 0 140px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--accent-gold)', fontFamily: 'EB Garamond, serif', fontSize: '13px', outline: 'none', padding: '2px 4px' }}
                  />
                  <GhostBtn small danger onClick={() => removeWonder(i)}>✕</GhostBtn>
                </div>
                <textarea
                  value={wonder.description || ''}
                  onChange={e => updateWonder(i, { ...wonder, description: e.target.value })}
                  placeholder="Describe the wonder's appearance, powers, activation, and history…"
                  rows={2}
                  style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '3px', color: 'var(--text-muted)', fontFamily: 'EB Garamond, serif', fontSize: '13px', fontStyle: 'italic', padding: '6px', outline: 'none', resize: 'vertical', lineHeight: '1.5' }}
                />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

Object.assign(window, { SanctumTab });
