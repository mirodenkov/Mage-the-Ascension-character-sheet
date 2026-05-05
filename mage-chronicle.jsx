
// Chronicle Tab — Basic Info, Portrait, Attributes, Abilities, Health, Willpower

function ChronicleTab({ char, update }) {
  const fileRef = React.useRef();

  const handlePortrait = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update('portrait', ev.target.result);
    reader.readAsDataURL(file);
  };

  const setAttr = (key, val) => update('attributes', { ...char.attributes, [key]: val });
  const setTalent = (key, val) => update('talents', { ...char.talents, [key]: val });
  const setSkill = (key, val) => update('skills', { ...char.skills, [key]: val });
  const setKnowledge = (key, val) => update('knowledges', { ...char.knowledges, [key]: val });
  const setSpecialty = (section, key, val) => {
    const cur = char[section + 'Specialties'] || {};
    update(section + 'Specialties', { ...cur, [key]: val });
  };

  const ATTR_GROUPS = [
    { label: 'Physical', keys: ['strength', 'dexterity', 'stamina'] },
    { label: 'Social', keys: ['charisma', 'manipulation', 'appearance'] },
    { label: 'Mental', keys: ['perception', 'intelligence', 'wits'] },
  ];

  const TALENT_KEYS = ['alertness','athletics','art','awareness','brawl','empathy','expression','intimidation','leadership','streetwise','subterfuge'];
  const SKILL_KEYS  = ['crafts','drive','etiquette','firearms','martialArts','meditation','meleeWeapons','research','stealth','survival','technology'];
  const KNOW_KEYS   = ['academics','computer','cosmology','enigmas','esoterica','investigation','law','medicine','occult','politics','science'];

  const prettyLabel = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* ── Identity Row ── */}
      <Panel>
        <SectionTitle>Identity</SectionTitle>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

          {/* Portrait */}
          <div
            onClick={() => fileRef.current.click()}
            style={{
              flex: '0 0 110px', height: '140px',
              border: '1px solid var(--border)',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              position: 'relative',
            }}
          >
            {char.portrait
              ? <img src={char.portrait} alt="portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ textAlign: 'center', padding: '8px' }}>
                  <div style={{ fontSize: '28px', opacity: 0.3, marginBottom: '6px' }}>☽</div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>PORTRAIT</div>
                  <div style={{ fontFamily: 'EB Garamond, serif', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>click to upload</div>
                </div>
            }
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePortrait} style={{ display: 'none' }} />
          </div>

          {/* Fields */}
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
            <TextInput label="Name" value={char.name} onChange={v => update('name', v)} wide />
            <TextInput label="Player" value={char.player} onChange={v => update('player', v)} />
            <TextInput label="Chronicle" value={char.chronicle} onChange={v => update('chronicle', v)} />
            <TextInput label="Concept" value={char.concept} onChange={v => update('concept', v)} />
            <TextInput label="Nature" value={char.nature} onChange={v => update('nature', v)} />
            <TextInput label="Demeanor" value={char.demeanor} onChange={v => update('demeanor', v)} />
            <TextInput label="Tradition / Craft" value={char.tradition} onChange={v => update('tradition', v)} />
            <TextInput label="Essence" value={char.essence} onChange={v => update('essence', v)} />
            <TextInput label="Affiliation" value={char.affiliation} onChange={v => update('affiliation', v)} />
          </div>
        </div>
      </Panel>

      {/* ── Attributes ── */}
      <Panel>
        <SectionTitle>Attributes</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {ATTR_GROUPS.map(({ label, keys }) => (
            <div key={label}>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</div>
              {keys.map(k => (
                <StatRow key={k} label={k} value={char.attributes[k]} max={5} minVal={1}
                  onChange={v => setAttr(k, v)} />
              ))}
            </div>
          ))}
        </div>
      </Panel>

      {/* ── Abilities ── */}
      <Panel>
        <SectionTitle>Abilities</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Talents</div>
            {TALENT_KEYS.map(k => (
              <StatRow key={k} label={prettyLabel(k)} value={char.talents[k]} max={5}
                onChange={v => setTalent(k, v)}
                specialty={(char.talentsSpecialties || {})[k]}
                onSpecialtyChange={v => setSpecialty('talents', k, v)}
              />
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Skills</div>
            {SKILL_KEYS.map(k => (
              <StatRow key={k} label={prettyLabel(k)} value={char.skills[k]} max={5}
                onChange={v => setSkill(k, v)}
                specialty={(char.skillsSpecialties || {})[k]}
                onSpecialtyChange={v => setSpecialty('skills', k, v)}
              />
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Knowledges</div>
            {KNOW_KEYS.map(k => (
              <StatRow key={k} label={prettyLabel(k)} value={char.knowledges[k]} max={5}
                onChange={v => setKnowledge(k, v)}
                specialty={(char.knowledgesSpecialties || {})[k]}
                onSpecialtyChange={v => setSpecialty('knowledges', k, v)}
              />
            ))}
          </div>
        </div>
      </Panel>

      {/* ── Health & Willpower ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Panel>
          <SectionTitle>Health</SectionTitle>
          <HealthTrack health={char.health} onChange={v => update('health', v)} />
        </Panel>

        <Panel>
          <SectionTitle>Willpower</SectionTitle>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Permanent</div>
            <HexRating value={char.willpower.permanent} max={10} onChange={v => update('willpower', { ...char.willpower, permanent: v })} size={14} />
          </div>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>Current</div>
            <HexRating value={char.willpower.current} max={char.willpower.permanent} onChange={v => update('willpower', { ...char.willpower, current: v })} size={14} color="var(--accent-crimson-light)" />
          </div>
          <div style={{ marginTop: '20px' }}>
            <SectionTitle>Experience</SectionTitle>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Total</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '28px', color: 'var(--accent-gold)', lineHeight: 1 }}>{char.totalXP || 0}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Spent</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '28px', color: 'var(--text-muted)', lineHeight: 1 }}>{char.spentXP || 0}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '3px' }}>Remaining</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '28px', color: 'var(--accent-gold)', lineHeight: 1 }}>{(char.totalXP || 0) - (char.spentXP || 0)}</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

Object.assign(window, { ChronicleTab });
