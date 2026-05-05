
// NPC Connections Tab

const RELATIONSHIP_TYPES = ['Ally','Mentor','Rival','Enemy','Contact','Familiar','Thrall','Neutral','Unknown'];
const STATUS_TYPES = ['Active','Deceased','Missing','Estranged','Hostile','Unknown'];

function NPCCard({ npc, onChange, onRemove }) {
  const [expanded, setExpanded] = React.useState(false);

  const statusColor = {
    'Active': '#6a9a6a', 'Deceased': '#888', 'Missing': '#9a8a4a',
    'Estranged': '#8a7a9a', 'Hostile': '#c04040', 'Unknown': 'var(--text-muted)'
  }[npc.status] || 'var(--text-muted)';

  const relColor = {
    'Ally': '#6a9a6a', 'Mentor': '#7a8aaa', 'Rival': '#9a8a4a', 'Enemy': '#c04040',
    'Contact': 'var(--accent-gold)', 'Familiar': '#9a6aaa', 'Thrall': '#8a5a3a',
    'Neutral': 'var(--text-muted)', 'Unknown': 'var(--text-muted)'
  }[npc.relationship] || 'var(--text-muted)';

  return (
    <div style={{
      background: 'var(--bg-panel)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Header bar */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '11px 14px', cursor: 'pointer',
          background: expanded ? 'rgba(201,168,76,0.05)' : 'transparent',
          borderBottom: expanded ? '1px solid var(--border)' : 'none',
        }}
      >
        {/* Avatar placeholder */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Cinzel, serif', fontSize: '14px', color: 'var(--text-muted)',
        }}>
          {(npc.name || '?')[0].toUpperCase()}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '13px', color: 'var(--text-primary)', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {npc.name || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Unnamed</span>}
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {npc.role || 'No role defined'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {npc.relationship && (
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.1em',
              color: relColor, border: `1px solid ${relColor}`, borderRadius: '2px',
              padding: '2px 6px', opacity: 0.85,
            }}>{npc.relationship}</span>
          )}
          {npc.status && (
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.1em',
              color: statusColor, opacity: 0.75,
            }}>● {npc.status}</span>
          )}
          <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <TextInput label="Name" value={npc.name} onChange={v => onChange({ ...npc, name: v })} wide />
            <TextInput label="Role / Occupation" value={npc.role} onChange={v => onChange({ ...npc, role: v })} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 140px' }}>
              <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Relationship</label>
              <select
                value={npc.relationship || ''}
                onChange={e => onChange({ ...npc, relationship: e.target.value })}
                style={{
                  background: 'var(--bg-deep)', border: 'none', borderBottom: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '14px',
                  outline: 'none', padding: '2px 4px', cursor: 'pointer',
                }}
              >
                <option value="">Select…</option>
                {RELATIONSHIP_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 120px' }}>
              <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</label>
              <select
                value={npc.status || ''}
                onChange={e => onChange({ ...npc, status: e.target.value })}
                style={{
                  background: 'var(--bg-deep)', border: 'none', borderBottom: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '14px',
                  outline: 'none', padding: '2px 4px', cursor: 'pointer',
                }}
              >
                <option value="">Select…</option>
                {STATUS_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <TextInput label="Location" value={npc.location} onChange={v => onChange({ ...npc, location: v })} />
          </div>
          <TextArea label="Description & Appearance" value={npc.description} onChange={v => onChange({ ...npc, description: v })} rows={2} />
          <TextArea label="Notes & History" value={npc.notes} onChange={v => onChange({ ...npc, notes: v })} rows={3} placeholder="Relationship history, secrets known, debts owed, last contact…" />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <GhostBtn small danger onClick={onRemove}>Remove NPC</GhostBtn>
          </div>
        </div>
      )}
    </div>
  );
}

function ConnectionsTab({ char, update }) {
  const addNPC = () => update('npcs', [...(char.npcs || []), { name: '', role: '', relationship: '', status: 'Active', location: '', description: '', notes: '' }]);
  const updateNPC = (i, val) => {
    const arr = [...(char.npcs || [])];
    arr[i] = val;
    update('npcs', arr);
  };
  const removeNPC = (i) => update('npcs', (char.npcs || []).filter((_, j) => j !== i));

  const grouped = RELATIONSHIP_TYPES.reduce((acc, rel) => {
    const members = (char.npcs || []).filter(n => n.relationship === rel);
    if (members.length) acc[rel] = members;
    return acc;
  }, {});
  const ungrouped = (char.npcs || []).filter(n => !n.relationship);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <SectionTitle>NPC Connections</SectionTitle>
          <GhostBtn small onClick={addNPC}>+ Add NPC</GhostBtn>
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '14px' }}>
          {(char.npcs || []).length} connection{(char.npcs || []).length !== 1 ? 's' : ''} recorded. Click any card to expand.
        </div>

        {(char.npcs || []).length === 0 ? (
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px', textAlign: 'center', border: '1px dashed var(--border)', borderRadius: '4px' }}>
            No connections yet. Every mage has allies, enemies, and entanglements.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(char.npcs || []).map((npc, i) => (
              <NPCCard key={i} npc={npc} onChange={v => updateNPC(i, v)} onRemove={() => removeNPC(i)} />
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

Object.assign(window, { ConnectionsTab });
