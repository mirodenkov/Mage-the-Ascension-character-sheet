
// Shared components for Mage: The Ascension Character Sheet

// ── Hex Pip ──────────────────────────────────────────────────────────────
function HexPip({ filled, onClick, size = 16, color }) {
  const r = size / 2;
  const w = r * Math.sqrt(3);
  const h = size;
  const pts = [
    [w / 2, 0], [w, h / 4], [w, (3 * h) / 4],
    [w / 2, h], [0, (3 * h) / 4], [0, h / 4]
  ].map(p => p.join(',')).join(' ');

  const fillColor = filled ? (color || 'var(--accent-gold)') : 'var(--hex-empty)';
  const strokeColor = filled ? (color || 'var(--accent-gold)') : 'var(--hex-border)';

  return (
    <svg
      width={w} height={h}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', display: 'inline-block', flexShrink: 0 }}
    >
      <polygon
        points={pts}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="1.2"
        style={{ filter: filled ? 'drop-shadow(0 0 3px rgba(201,168,76,1)) drop-shadow(0 0 7px rgba(201,168,76,0.7)) drop-shadow(0 0 14px rgba(201,168,76,0.4))' : 'none', transition: 'all 0.15s' }}
      />
    </svg>
  );
}

// ── Hex Rating ────────────────────────────────────────────────────────────
function HexRating({ value, max = 5, onChange, size = 16, color, minVal = 0 }) {
  const handleClick = (i) => {
    if (!onChange) return;
    const newVal = (value === i + 1) ? Math.max(i, minVal) : i + 1;
    onChange(newVal);
  };
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center', flexWrap: 'nowrap' }}>
      {Array.from({ length: max }, (_, i) => (
        <HexPip key={i} filled={i < value} onClick={() => handleClick(i)} size={size} color={color} />
      ))}
    </div>
  );
}

// ── Section Title ─────────────────────────────────────────────────────────
function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ flex: '0 0 auto' }}>{children}</span>
        <span style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, var(--accent-gold-dim), transparent)' }} />
      </div>
      {sub && <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontStyle: 'italic' }}>{sub}</div>}
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────────────
function Panel({ children, style }) {
  return (
    <div style={{
      background: 'var(--bg-panel)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '16px',
      ...style
    }}>
      {children}
    </div>
  );
}

// ── Stat Row (label + hex dots) ───────────────────────────────────────────
function StatRow({ label, value, max = 5, onChange, specialty, onSpecialtyChange, minVal = 0, size = 15 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', minHeight: '24px' }}>
      <div style={{
        flex: '0 0 140px',
        fontFamily: 'EB Garamond, serif',
        fontSize: '14px',
        color: 'var(--text-primary)',
        letterSpacing: '0.02em',
        textTransform: 'capitalize',
      }}>
        {label.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}
      </div>
      <HexRating value={value} max={max} onChange={onChange} size={size} minVal={minVal} />
      {onSpecialtyChange !== undefined && (
        <input
          type="text"
          placeholder="specialty"
          value={specialty || ''}
          onChange={e => onSpecialtyChange(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontSize: '11px',
            fontFamily: 'EB Garamond, serif',
            fontStyle: 'italic',
            outline: 'none',
            width: '90px',
            padding: '0 2px',
          }}
        />
      )}
    </div>
  );
}

// ── Text Input ────────────────────────────────────────────────────────────
function TextInput({ label, value, onChange, placeholder, wide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: wide ? '1 1 200px' : '1 1 130px' }}>
      {label && (
        <label style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ''}
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontFamily: 'EB Garamond, serif',
          outline: 'none',
          padding: '2px 4px',
          width: '100%',
        }}
      />
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────
function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && <label style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</label>}
      <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ''}
        rows={rows}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: '3px',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontFamily: 'EB Garamond, serif',
          outline: 'none',
          padding: '8px',
          resize: 'vertical',
          lineHeight: '1.6',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

// ── Ghost Button ──────────────────────────────────────────────────────────
function GhostBtn({ children, onClick, danger, small }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? (danger ? 'rgba(120,20,20,0.3)' : 'rgba(201,168,76,0.12)') : 'transparent',
        border: `1px solid ${danger ? 'rgba(180,50,50,0.4)' : 'var(--border)'}`,
        borderRadius: '3px',
        color: danger ? '#c44' : 'var(--accent-gold)',
        fontFamily: 'Cinzel, serif',
        fontSize: small ? '9px' : '10px',
        letterSpacing: '0.12em',
        cursor: 'pointer',
        padding: small ? '3px 8px' : '5px 12px',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

// ── Health Track ──────────────────────────────────────────────────────────
const HEALTH_LEVELS = [
  { key: 'bruised',      label: 'Bruised',      penalty: '—' },
  { key: 'hurt',         label: 'Hurt',         penalty: '−1' },
  { key: 'injured',      label: 'Injured',      penalty: '−1' },
  { key: 'wounded',      label: 'Wounded',      penalty: '−2' },
  { key: 'mauled',       label: 'Mauled',       penalty: '−2' },
  { key: 'crippled',     label: 'Crippled',     penalty: '−5' },
  { key: 'incapacitated',label: 'Incapacitated',penalty: '✕' },
];

const DAMAGE_TYPES = ['', 'bashing', 'lethal', 'aggravated'];
const DAMAGE_SYMBOLS = { '': '○', bashing: '✕', lethal: '✗', aggravated: '✦' };
const DAMAGE_COLORS = { '': 'var(--hex-border)', bashing: '#a0c0e0', lethal: '#c06060', aggravated: '#c9a84c' };

function HealthTrack({ health, onChange }) {
  const cycle = (key) => {
    const cur = health[key] || '';
    const idx = DAMAGE_TYPES.indexOf(cur);
    const next = DAMAGE_TYPES[(idx + 1) % DAMAGE_TYPES.length];
    onChange({ ...health, [key]: next });
  };

  return (
    <div>
      {HEALTH_LEVELS.map(({ key, label, penalty }) => {
        const val = health[key] || '';
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div
              onClick={() => cycle(key)}
              style={{
                width: '22px', height: '22px',
                border: `1px solid ${val ? DAMAGE_COLORS[val] : 'var(--hex-border)'}`,
                borderRadius: '3px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '13px',
                color: val ? DAMAGE_COLORS[val] : 'transparent',
                background: val ? `${DAMAGE_COLORS[val]}18` : 'transparent',
                transition: 'all 0.15s',
                fontFamily: 'serif',
              }}
            >
              {DAMAGE_SYMBOLS[val]}
            </div>
            <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '13px', color: 'var(--text-primary)', flex: 1 }}>{label}</div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', color: 'var(--text-muted)', width: '24px', textAlign: 'right' }}>{penalty}</div>
          </div>
        );
      })}
      <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontFamily: 'EB Garamond, serif', fontSize: '11px', color: 'var(--text-muted)' }}>
        <span><span style={{ color: '#a0c0e0' }}>✕</span> Bashing</span>
        <span><span style={{ color: '#c06060' }}>✗</span> Lethal</span>
        <span><span style={{ color: 'var(--accent-gold)' }}>✦</span> Aggravated</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  HexPip, HexRating, SectionTitle, Panel, StatRow,
  TextInput, TextArea, GhostBtn, HealthTrack,
  HEALTH_LEVELS, DAMAGE_TYPES, DAMAGE_SYMBOLS, DAMAGE_COLORS
});
