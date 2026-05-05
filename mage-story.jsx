
// Story Tab — Backstory & History

function StoryTab({ char, update }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Panel>
        <SectionTitle>Awakening & Origin</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <TextInput label="Birthplace" value={char.birthplace} onChange={v => update('birthplace', v)} />
            <TextInput label="Date of Birth" value={char.dob} onChange={v => update('dob', v)} />
            <TextInput label="Date of Awakening" value={char.awakeningDate} onChange={v => update('awakeningDate', v)} />
            <TextInput label="Awakening Location" value={char.awakeningLocation} onChange={v => update('awakeningLocation', v)} wide />
          </div>
          <TextArea label="The Awakening" value={char.awakening} onChange={v => update('awakening', v)}
            placeholder="Describe the moment your mage Awakened. What triggered it? What did they see or experience? How did it change them?" rows={5} />
        </div>
      </Panel>

      <Panel>
        <SectionTitle>Backstory</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <TextArea label="Early Life" value={char.earlyLife} onChange={v => update('earlyLife', v)}
            placeholder="Who was this person before magic? Family, upbringing, formative events…" rows={4} />
          <TextArea label="Life as a Mage" value={char.mageLife} onChange={v => update('mageLife', v)}
            placeholder="Training, mentors, initiations, major events since Awakening…" rows={4} />
          <TextArea label="Current Situation" value={char.currentSituation} onChange={v => update('currentSituation', v)}
            placeholder="Where are they now? What drives them? What do they fear? What do they want?" rows={4} />
        </div>
      </Panel>

      <Panel>
        <SectionTitle>Personality & Traits</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <TextArea label="Goals & Motivations" value={char.goals} onChange={v => update('goals', v)}
            placeholder="Short-term and long-term goals. What does this mage strive toward?" rows={4} />
          <TextArea label="Fears & Flaws" value={char.fears} onChange={v => update('fears', v)}
            placeholder="What does this mage fear? What personal failings do they struggle with?" rows={4} />
          <TextArea label="Personality & Quirks" value={char.personality} onChange={v => update('personality', v)}
            placeholder="How do they behave? Speech patterns, habits, attitudes…" rows={4} />
          <TextArea label="Relationships & Ties" value={char.ties} onChange={v => update('ties', v)}
            placeholder="Family still living? Sleeper friends? Lovers? Enemies from the past?" rows={4} />
        </div>
      </Panel>

      <Panel>
        <SectionTitle>Paradigm & Philosophy</SectionTitle>
        <TextArea label="Worldview" value={char.worldview} onChange={v => update('worldview', v)}
          placeholder="How does this mage view the world, reality, and their place in it? What do they believe about the Ascension War, the Technocracy, the Traditions?" rows={5} />
      </Panel>
    </div>
  );
}

Object.assign(window, { StoryTab });
