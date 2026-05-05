
// Advancement Tab — XP Log

const XP_COSTS = [
  { category: 'Attributes', item: 'New dot', cost: 'current × 4' },
  { category: 'Abilities', item: 'New dot', cost: 'current × 2' },
  { category: 'Abilities', item: 'New dot (out of Tradition)', cost: 'current × 3' },
  { category: 'Spheres', item: 'New dot (in Affinity Sphere)', cost: 'current × 7' },
  { category: 'Spheres', item: 'New dot (other Sphere)', cost: 'current × 8' },
  { category: 'Arete', item: 'New dot', cost: 'current × 8' },
  { category: 'Willpower', item: 'New dot', cost: 'current' },
  { category: 'Backgrounds', item: 'New dot', cost: 'current × 2 (ST approval)' },
];

function AdvancementTab({ char, update }) {
  const [showCosts, setShowCosts] = React.useState(false);
  const [newEntry, setNewEntry] = React.useState({ date: new Date().toISOString().slice(0,10), amount: 1, reason: '', type: 'gain' });

  const addEntry = () => {
    if (!newEntry.reason.trim()) return;
    const log = [...(char.xpLog || []), { ...newEntry, id: Date.now() }];
    const totalXP = log.filter(e => e.type === 'gain').reduce((s, e) => s + (e.amount || 0), 0);
    const spentXP = log.filter(e => e.type === 'spend').reduce((s, e) => s + (e.amount || 0), 0);
    update('xpLog', log);
    update('totalXP', totalXP);
    update('spentXP', spentXP);
    setNewEntry({ date: new Date().toISOString().slice(0,10), amount: 1, reason: '', type: 'gain' });
  };

  const removeEntry = (id) => {
    const log = (char.xpLog || []).filter(e => e.id !== id);
    const totalXP = log.filter(e => e.type === 'gain').reduce((s, e) => s + (e.amount || 0), 0);
    const spentXP = log.filter(e => e.type === 'spend').reduce((s, e) => s + (e.amount || 0), 0);
    update('xpLog', log);
    update('totalXP', totalXP);
    update('spentXP', spentXP);
  };

  const remaining = (char.totalXP || 0) - (char.spentXP || 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Summary */}
      <Panel>
        <SectionTitle>Experience Summary</SectionTitle>
        <div style={{ display: 'flex', gap: '0', marginBottom: '4px' }}>
          {[
            { label: 'Total Earned', value: char.totalXP || 0, color: 'var(--accent-gold)' },
            { label: 'Total Spent', value: char.spentXP || 0, color: 'var(--text-muted)' },
            { label: 'Remaining', value: remaining, color: remaining < 0 ? '#c04040' : 'var(--accent-gold)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center', padding: '16px',
              borderRight: '1px solid var(--border)',
            }}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '44px', color, lineHeight: 1, textShadow: color === 'var(--accent-gold)' ? '0 0 30px rgba(201,168,76,0.3)' : 'none' }}>{value}</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
          <div style={{ flex: 1 }} />
        </div>
      </Panel>

      {/* Add Entry */}
      <Panel>
        <SectionTitle>Add Entry</SectionTitle>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</label>
            <div style={{ display: 'flex', gap: '0' }}>
              {['gain','spend'].map(t => (
                <button key={t} onClick={() => setNewEntry(e => ({ ...e, type: t }))}
                  style={{
                    padding: '5px 14px', border: '1px solid var(--border)',
                    background: newEntry.type === t ? (t === 'gain' ? 'rgba(201,168,76,0.15)' : 'rgba(180,50,50,0.15)') : 'transparent',
                    color: newEntry.type === t ? (t === 'gain' ? 'var(--accent-gold)' : '#c04040') : 'var(--text-muted)',
                    fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.1em',
                    cursor: 'pointer', textTransform: 'uppercase',
                    borderRadius: t === 'gain' ? '3px 0 0 3px' : '0 3px 3px 0',
                    marginLeft: t === 'spend' ? '-1px' : 0,
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 80px' }}>
            <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount</label>
            <input type="number" min="1" value={newEntry.amount}
              onChange={e => setNewEntry(n => ({ ...n, amount: parseInt(e.target.value) || 1 }))}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: newEntry.type === 'gain' ? 'var(--accent-gold)' : '#c04040', fontFamily: 'Cinzel, serif', fontSize: '18px', outline: 'none', padding: '2px 4px', textAlign: 'center' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 130px' }}>
            <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</label>
            <input type="date" value={newEntry.date}
              onChange={e => setNewEntry(n => ({ ...n, date: e.target.value }))}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'EB Garamond, serif', fontSize: '13px', outline: 'none', padding: '2px 4px', colorScheme: 'dark' }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', minWidth: '160px' }}>
            <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reason</label>
            <input value={newEntry.reason}
              onChange={e => setNewEntry(n => ({ ...n, reason: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addEntry()}
              placeholder={newEntry.type === 'gain' ? 'e.g. Session 4 award' : 'e.g. Raised Forces to 3'}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '14px', outline: 'none', padding: '2px 4px' }}
            />
          </div>
          <GhostBtn onClick={addEntry}>+ Record</GhostBtn>
        </div>
      </Panel>

      {/* Log */}
      <Panel>
        <SectionTitle>Experience Log</SectionTitle>
        {(char.xpLog || []).length === 0 ? (
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>No entries yet.</div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 50px 1fr 30px', gap: '8px', marginBottom: '6px', padding: '0 4px' }}>
              {['Date','XP','Reason',''].map(h => (
                <div key={h} style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {[...(char.xpLog || [])].reverse().map((entry) => (
              <div key={entry.id} style={{
                display: 'grid', gridTemplateColumns: '110px 50px 1fr 30px',
                gap: '8px', alignItems: 'center',
                padding: '7px 4px',
                borderTop: '1px solid rgba(201,168,76,0.06)',
              }}>
                <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-muted)' }}>{entry.date}</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '15px', color: entry.type === 'gain' ? 'var(--accent-gold)' : '#c04040', textAlign: 'center' }}>
                  {entry.type === 'gain' ? '+' : '−'}{entry.amount}
                </div>
                <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '14px', color: 'var(--text-primary)' }}>{entry.reason}</div>
                <button onClick={() => removeEntry(entry.id)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', opacity: 0.5, padding: '2px' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </Panel>

      {/* XP Cost Reference */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showCosts ? '14px' : 0 }}>
          <SectionTitle>XP Cost Reference</SectionTitle>
          <GhostBtn small onClick={() => setShowCosts(s => !s)}>{showCosts ? 'Hide' : 'Show'}</GhostBtn>
        </div>
        {showCosts && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'EB Garamond, serif', fontSize: '13px' }}>
            <thead>
              <tr>
                {['Category','Advancement','XP Cost'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {XP_COSTS.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                  <td style={{ padding: '6px 8px 6px 0', color: 'var(--text-muted)', fontStyle: 'italic' }}>{row.category}</td>
                  <td style={{ padding: '6px 8px', color: 'var(--text-primary)' }}>{row.item}</td>
                  <td style={{ padding: '6px 0', color: 'var(--accent-gold)', fontFamily: 'Cinzel, serif', fontSize: '12px' }}>{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}

Object.assign(window, { AdvancementTab });
