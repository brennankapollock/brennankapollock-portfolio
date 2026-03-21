const BIO_PARAGRAPHS = [
  `i grew up in the dirt of knockemstiff, ohio. a place where the woods take care of their own, whether they should or not. i learned fast that authenticity isn't a buzzword. it's survival. people there still feel like they walked out of steinbeck novels, carrying stories no professor could stomach without choking on his own theories.`,

  `i spent my twenties preaching, chasing priesthood, thinking philosophy and theology would crack open the marrow of the sacred. they did, but not how i expected. the man from galilee wrecked me into being both an anarchist and a communist, which made sunday mornings a circus. i got accused of being "possessed" just for quoting him straight, but i never lost the scent of divinity. i had to watch god die in my body to realize i didn't need to go anywhere. it was already here. vulgar, small, ordinary. alive.`,

  `faith and politics carried me into communes, asylum work, translating desperation into legalese that maybe, if luck was drunk, turned into freedom.`,

  `then six years ago i pivoted. not out of betrayal, but exhaustion. i traded scripture for sprint planning, solidarity for systems. and i crushed it. tech came easy. the ladder looked built for me. but the higher i climbed the more dead i felt. every part of me that could stir bodies and spirits, make a room feel alive, got shoved in a corner so i could play the role of responsible adult.`,

  `until last year. one dance on the beach cracked me wide open. i hadn't moved like that since nashville nights, sweating whiskey under cheap lights. that one dance set off a chain reaction. heartbreak, ecstasy, recognition. reminded me what it feels like to be human instead of productive. flesh instead of machine.`,

  `so now i'm on sabbatical. resurrection, not rest. sleeping in my car. pissing at sunrise and waving to farmers. swimming naked with strangers. ayahuasca circles. journals full of encounters that smell more like life than any quarterly review.`,
];

const CLOSING_LINES = [
  `the work isn't systems. the work is aliveness.`,
  `not perfecting the act. surrendering to the pulse.`,
  `the road is long, full of strange characters, but the destination isn't the point. the aliveness is.`,
];

const FACTS = [
  { label: "Location", value: "Venice Beach, CA" },
  { label: "From", value: "Knockemstiff, OH" },
  { label: "Focus", value: "Engineering / Art / Embodiment" },
  { label: "Status", value: "Sabbatical" },
];

const TIMELINE = [
  {
    year: "2018\u20132024",
    title: "Legal Asylum Translation",
    desc: "Translating desperation into legalese",
  },
  {
    year: "2020\u20132023",
    title: "Commune & Community Work",
    desc: "Building alternative systems",
  },
  {
    year: "2019\u20132025",
    title: "Software Engineering",
    desc: "Full-stack development, systems design",
  },
  {
    year: "2025\u2013",
    title: "Sabbatical / Resurrection",
    desc: "Art, writing, embodiment",
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <h1 className="about-name">Brennan K.A. Pollock</h1>
        <p className="about-role">Engineer / Artist / Maker</p>
      </div>

      {/* Two column layout */}
      <div className="about-layout">
        {/* Sidebar */}
        <aside className="about-sidebar">
          {FACTS.map((fact) => (
            <div key={fact.label} className="about-fact">
              <span className="about-fact-label">{fact.label}</span>
              <span className="about-fact-value">{fact.value}</span>
            </div>
          ))}

          <div className="about-timeline">
            {TIMELINE.map((entry) => (
              <div key={entry.year} className="about-timeline-entry">
                <div className="about-timeline-year">{entry.year}</div>
                <div>
                  <h3 className="about-timeline-title">{entry.title}</h3>
                  <p className="about-timeline-desc">{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Bio */}
        <div className="about-bio">
          {BIO_PARAGRAPHS.map((para, i) =>
            i === 2
              ? <blockquote key={i}>{para}</blockquote>
              : <p key={i}>{para}</p>,
          )}
        </div>
      </div>

      {/* Closing */}
      <div className="about-closing">
        {CLOSING_LINES.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
