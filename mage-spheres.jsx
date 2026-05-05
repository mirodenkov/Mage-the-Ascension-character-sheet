
// Spheres & Arete Tab

const SPHERE_DATA = [
  { key: 'correspondence', label: 'Correspondence', symbol: '⬡', desc: 'Space, distance, connections' },
  { key: 'entropy',        label: 'Entropy',        symbol: '☯', desc: 'Chaos, order, fate' },
  { key: 'forces',         label: 'Forces',         symbol: '⚡', desc: 'Energy, fire, electricity' },
  { key: 'life',           label: 'Life',           symbol: '✦', desc: 'Biology, healing, mutation' },
  { key: 'matter',         label: 'Matter',         symbol: '◈', desc: 'Physical substances, alchemy' },
  { key: 'mind',           label: 'Mind',           symbol: '◎', desc: 'Psyche, dreams, illusion' },
  { key: 'prime',          label: 'Prime',          symbol: '✺', desc: 'Quintessence, raw magic' },
  { key: 'spirit',         label: 'Spirit',         symbol: '☽', desc: 'Umbra, spirits, gauntlet' },
  { key: 'time',           label: 'Time',           symbol: '⧗', desc: 'Past, future, duration' },
];

const SPHERE_RANK_LABELS = ['', 'Initiate', 'Apprentice', 'Disciple', 'Adept', 'Master'];

function SphereCard({ sphere, value, onChange, notes, onNotes }) {
  const [expanded, setExpanded] = React.useState(false);
  const rankLabel = SPHERE_RANK_LABELS[value] || '';

  return (
    <div style={{
      background: value > 0 ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.015)',
      border: `1px solid ${value > 0 ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
      borderRadius: '4px',
      padding: '14px',
      transition: 'all 0.2s',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px',
          borderRadius: '50%',
          background: value > 0 ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${value > 0 ? 'rgba(201,168,76,0.4)' : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px',
          color: value > 0 ? 'var(--accent-gold)' : 'var(--text-muted)',
          flexShrink: 0,
        }}>
          {sphere.symbol}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '12px', color: value > 0 ? 'var(--text-primary)' : 'var(--text-muted)', letterSpacing: '0.05em' }}>{sphere.label}</div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{rankLabel || sphere.desc}</div>
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', color: value > 0 ? 'var(--accent-gold)' : 'var(--text-muted)', opacity: value > 0 ? 1 : 0.3, lineHeight: 1 }}>{value}</div>
      </div>

      {/* Hex Dots */}
      <HexRating value={value} max={5} onChange={onChange} size={17} />

      {/* Notes toggle */}
      <div>
        <div
          onClick={() => setExpanded(!expanded)}
          style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', cursor: 'pointer', textTransform: 'uppercase', userSelect: 'none' }}
        >
          {expanded ? '▲ Hide notes' : '▼ Rotes & notes'}
        </div>
        {expanded && (
          <textarea
            value={notes || ''}
            onChange={e => onNotes(e.target.value)}
            placeholder={`Rotes, effects, and notes for ${sphere.label}…`}
            rows={3}
            style={{
              marginTop: '6px',
              width: '100%', boxSizing: 'border-box',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              color: 'var(--text-primary)',
              fontFamily: 'EB Garamond, serif',
              fontSize: '13px',
              padding: '6px',
              outline: 'none',
              resize: 'vertical',
              lineHeight: '1.5',
            }}
          />
        )}
      </div>
    </div>
  );
}

function SpheresTab({ char, update }) {
  const setSphere = (key, val) => update('spheres', { ...char.spheres, [key]: val });
  const setSphereNotes = (key, val) => {
    const cur = char.sphereNotes || {};
    update('sphereNotes', { ...cur, [key]: val });
  };

  const areteHexes = Array.from({ length: 10 }, (_, i) => i < char.arete);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── Arete Hero Display ── */}
      <Panel style={{ textAlign: 'center', padding: '30px 20px' }}>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>Arete</div>

        {/* Big number */}
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '80px',
          color: 'var(--accent-gold)',
          lineHeight: 1,
          textShadow: '0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15)',
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          {char.arete}
        </div>

        {/* Hex row for Arete */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <HexPip
              key={i}
              filled={i < char.arete}
              size={20}
              onClick={() => {
                const nv = (char.arete === i + 1) ? Math.max(i, 1) : i + 1;
                update('arete', nv);
              }}
            />
          ))}
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          {['','Initiate','Apprentice','Disciple','Adept','Master','Exemplar','Luminary','Oracle','Eidolon','Archmaster'][char.arete] || ''}
        </div>
      </Panel>

      {/* ── Quintessence & Paradox ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Panel>
          <SectionTitle>Quintessence</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '42px', color: 'var(--accent-gold)', lineHeight: 1, opacity: 0.9 }}>{char.quintessence}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <GhostBtn small onClick={() => update('quintessence', char.quintessence + 1)}>＋</GhostBtn>
              <GhostBtn small onClick={() => update('quintessence', Math.max(0, char.quintessence - 1))}>－</GhostBtn>
            </div>
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '6px' }}>Pool: {char.arete} + Backgrounds</div>
        </Panel>
        <Panel>
          <SectionTitle>Paradox</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: '42px', lineHeight: 1,
              color: char.paradox > 0 ? '#c04040' : 'var(--text-muted)',
              textShadow: char.paradox > 5 ? '0 0 20px rgba(200,50,50,0.5)' : 'none',
            }}>{char.paradox}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <GhostBtn small onClick={() => update('paradox', char.paradox + 1)}>＋</GhostBtn>
              <GhostBtn small onClick={() => update('paradox', Math.max(0, char.paradox - 1))}>－</GhostBtn>
            </div>
          </div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '6px' }}>
            {char.paradox === 0 ? 'No paradox accumulated' : char.paradox < 5 ? 'Vulgar magic in play' : char.paradox < 10 ? 'Paradox backlash imminent' : 'Critical paradox!'}
          </div>
        </Panel>
      </div>

      {/* ── Spheres Grid ── */}
      <Panel>
        <SectionTitle>The Nine Spheres</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {SPHERE_DATA.map(sphere => (
            <SphereCard
              key={sphere.key}
              sphere={sphere}
              value={char.spheres[sphere.key]}
              onChange={v => setSphere(sphere.key, v)}
              notes={(char.sphereNotes || {})[sphere.key]}
              onNotes={v => setSphereNotes(sphere.key, v)}
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}

Object.assign(window, { SpheresTab, SPHERE_DATA });
