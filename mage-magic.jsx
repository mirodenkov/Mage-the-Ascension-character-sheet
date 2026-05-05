
// Magic Tab — Paradigm, Style, Instruments, Rotes

function MagicTab({ char, update }) {
  const addRote = () => update('rotes', [...(char.rotes || []), { name: '', spheres: '', difficulty: '', description: '' }]);
  const updateRote = (i, val) => {
    const arr = [...(char.rotes || [])];
    arr[i] = val;
    update('rotes', arr);
  };
  const removeRote = (i) => update('rotes', (char.rotes || []).filter((_, j) => j !== i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Paradigm */}
      <Panel>
        <SectionTitle>Paradigm & Belief</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <TextArea label="Paradigm" value={char.paradigm} onChange={v => update('paradigm', v)}
            placeholder="How does your mage understand the nature of reality and magic? What is the fundamental truth that underlies their practice?" rows={4} />
          <TextArea label="Magical Style & Practice" value={char.magicalStyle} onChange={v => update('magicalStyle', v)}
            placeholder="How does your mage work magic? What does it look, feel, smell, or sound like? What rituals or methods do they use?" rows={4} />
          <TextArea label="Practice Description" value={char.practiceDescription} onChange={v => update('practiceDescription', v)}
            placeholder="Name and describe your magical practice (e.g. Hermetic Ceremonialism, Dreamspeaker Shamanism, Virtual Adept Cybermancy…)" rows={3} />
        </div>
      </Panel>

      {/* Instruments */}
      <Panel>
        <SectionTitle>Instruments & Foci</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <TextArea label="Instruments" value={char.instruments} onChange={v => update('instruments', v)}
            placeholder="List your magical foci and instruments — physical tools, words, gestures, or states of mind that focus your will." rows={5} />
          <TextArea label="Quintessence Sources & Tass" value={char.quintessenceSources} onChange={v => update('quintessenceSources', v)}
            placeholder="Where does your mage gather raw magical energy? What form does their Tass take?" rows={5} />
        </div>
      </Panel>

      {/* Rotes */}
      <Panel>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <SectionTitle>Rotes</SectionTitle>
          <GhostBtn small onClick={addRote}>+ Add Rote</GhostBtn>
        </div>

        {(char.rotes || []).length === 0 ? (
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '10px 0' }}>
            No rotes recorded yet. Add the spells and rituals your mage has mastered.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(char.rotes || []).map((rote, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '12px',
              }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-end' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>Rote Name</label>
                    <input
                      value={rote.name || ''}
                      onChange={e => updateRote(i, { ...rote, name: e.target.value })}
                      placeholder="e.g. The Hermetic Unraveling"
                      style={{
                        background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)',
                        color: 'var(--text-primary)', fontFamily: 'EB Garamond, serif', fontSize: '15px',
                        outline: 'none', width: '100%', padding: '2px 4px',
                      }}
                    />
                  </div>
                  <div style={{ flex: '0 0 160px' }}>
                    <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>Spheres</label>
                    <input
                      value={rote.spheres || ''}
                      onChange={e => updateRote(i, { ...rote, spheres: e.target.value })}
                      placeholder="e.g. Forces 3, Prime 2"
                      style={{
                        background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)',
                        color: 'var(--accent-gold)', fontFamily: 'EB Garamond, serif', fontSize: '13px',
                        outline: 'none', width: '100%', padding: '2px 4px',
                      }}
                    />
                  </div>
                  <div style={{ flex: '0 0 80px' }}>
                    <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>Difficulty</label>
                    <input
                      value={rote.difficulty || ''}
                      onChange={e => updateRote(i, { ...rote, difficulty: e.target.value })}
                      placeholder="e.g. 6"
                      style={{
                        background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)',
                        color: 'var(--text-primary)', fontFamily: 'Cinzel, serif', fontSize: '14px',
                        outline: 'none', width: '100%', padding: '2px 4px', textAlign: 'center',
                      }}
                    />
                  </div>
                  <GhostBtn small danger onClick={() => removeRote(i)}>✕</GhostBtn>
                </div>
                <textarea
                  value={rote.description || ''}
                  onChange={e => updateRote(i, { ...rote, description: e.target.value })}
                  placeholder="Effect, casting method, and any special notes…"
                  rows={2}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(201,168,76,0.1)',
                    borderRadius: '3px', color: 'var(--text-muted)',
                    fontFamily: 'EB Garamond, serif', fontSize: '13px', fontStyle: 'italic',
                    padding: '6px', outline: 'none', resize: 'vertical', lineHeight: '1.5',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}

Object.assign(window, { MagicTab });
