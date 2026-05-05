
// Journal Tab — Session Notes

function JournalTab({ char, update }) {
  const addSession = () => {
    const today = new Date().toISOString().slice(0, 10);
    update('sessions', [...(char.sessions || []), { date: today, title: '', notes: '', xpEarned: 0 }]);
  };
  const updateSession = (i, val) => {
    const arr = [...(char.sessions || [])];
    arr[i] = val;
    update('sessions', arr);
  };
  const removeSession = (i) => update('sessions', (char.sessions || []).filter((_, j) => j !== i));

  const sessions = [...(char.sessions || [])].reverse();
  const originalIndex = (revIdx) => (char.sessions || []).length - 1 - revIdx;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SectionTitle>Session Journal</SectionTitle>
          <GhostBtn small onClick={addSession}>+ New Session</GhostBtn>
        </div>

        {sessions.length === 0 ? (
          <div style={{
            fontFamily: 'EB Garamond, serif', fontSize: '14px', color: 'var(--text-muted)',
            fontStyle: 'italic', padding: '30px', textAlign: 'center',
            border: '1px dashed var(--border)', borderRadius: '4px'
          }}>
            No sessions recorded yet. Begin your chronicle.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sessions.map((session, revIdx) => {
              const i = originalIndex(revIdx);
              return (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px', padding: '14px',
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 130px' }}>
                      <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</label>
                      <input
                        type="date"
                        value={session.date || ''}
                        onChange={e => updateSession(i, { ...session, date: e.target.value })}
                        style={{
                          background: 'transparent', border: 'none',
                          borderBottom: '1px solid var(--border)',
                          color: 'var(--text-muted)',
                          fontFamily: 'EB Garamond, serif', fontSize: '13px',
                          outline: 'none', padding: '2px 4px',
                          colorScheme: 'dark',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>Session Title</label>
                      <input
                        value={session.title || ''}
                        onChange={e => updateSession(i, { ...session, title: e.target.value })}
                        placeholder="e.g. The Brass Tower Gambit"
                        style={{
                          background: 'transparent', border: 'none',
                          borderBottom: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          fontFamily: 'EB Garamond, serif', fontSize: '15px',
                          outline: 'none', width: '100%', padding: '2px 4px',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: '0 0 90px' }}>
                      <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>XP Earned</label>
                      <input
                        type="number" min="0"
                        value={session.xpEarned || 0}
                        onChange={e => updateSession(i, { ...session, xpEarned: parseInt(e.target.value) || 0 })}
                        style={{
                          background: 'transparent', border: 'none',
                          borderBottom: '1px solid var(--border)',
                          color: 'var(--accent-gold)',
                          fontFamily: 'Cinzel, serif', fontSize: '16px',
                          outline: 'none', width: '100%', padding: '2px 4px',
                          textAlign: 'center',
                        }}
                      />
                    </div>
                    <GhostBtn small danger onClick={() => removeSession(i)}>✕</GhostBtn>
                  </div>
                  <textarea
                    value={session.notes || ''}
                    onChange={e => updateSession(i, { ...session, notes: e.target.value })}
                    placeholder="What happened this session? Major events, discoveries, conflicts, revelations…"
                    rows={5}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)',
                      borderRadius: '3px', color: 'var(--text-primary)',
                      fontFamily: 'EB Garamond, serif', fontSize: '14px',
                      padding: '10px', outline: 'none',
                      resize: 'vertical', lineHeight: '1.7',
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </div>
  );
}

Object.assign(window, { JournalTab });
