import './ArenaInterests.css'

const interests = [
  { id: 'design', title: 'Design & Innovation', color: '#e63946', description: 'The shape of a body, the detail of an interior, the ideas that change how a car looks and feels.' },
  { id: 'heritage', title: 'Vintage Cars & Heritage', color: '#1db954', description: 'The stories behind early models, the craft of another era, and the history carried in each car.' },
  { id: 'mechanics', title: 'Mechanical Innovation', color: '#1d55d7', description: 'The engineering beneath the surface: how parts work together and how new technology changes what is possible.' },
  { id: 'racing', title: 'Racing Heritage', color: '#f1c40f', description: 'The pursuit of speed, the decisions behind performance, and the moments that shaped motorsport.' },
]

// Stylized car studies, not representations of specific museum vehicles.
function InterestVisual({ type }) {
  return <svg viewBox="0 0 320 180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {type === 'design' && <g className="ai-motion ai-design-sweep"><path d="M80 44L110 146M89 44L119 146" strokeWidth="3" /><path d="M100 42L130 145" opacity=".4" /></g>}
    {type === 'heritage' && <g className="ai-motion ai-heritage-detail" transform="translate(243 37)">
      {/* Squeeze-bulb horn: rubber bulb, curved tube and flared trumpet. */}
      <path d="M-13 7C-19-3-33-2-35 7C-38 18-24 25-16 17L-12 13Z" />
      <path d="M-13 7H-5Q3 7 3-1V-7H9V0Q9 13-4 13H-12" />
      <path d="M3-7Q-1-12-12-17H24Q13-12 9-7Z" />
      <ellipse cx="6" cy="-17" rx="18" ry="4" />
      <path d="M-9-27L-13-32M6-28V-35M21-27L25-32" opacity=".6" />
    </g>}
    {type === 'mechanics' && <g className="ai-motion ai-tools">
      <g className="ai-tool ai-tool-one"><path d="M53 45L38 60Q33 64 30 60Q27 56 31 53L46 38Q42 27 53 24L50 32L56 37L64 33Q66 45 53 45Z" /></g>
      <g className="ai-tool ai-tool-two" transform="translate(241 44)"><path d="M-5-17H5L7-11L13-9L19-10L24-2L19 3V9L21 14L13 20L7 16H1L-4 20L-12 14L-10 8V2L-15-3L-10-11L-4-10Z" /><circle cx="4" cy="2" r="7" /></g>
    </g>}
    {type === 'racing' && <g className="ai-motion ai-smoke" stroke="none" fill="currentColor">
      {[0,1,2].map(i => <g key={i} className="ai-smoke-puff" style={{ '--puff-delay': `${i * -.45}s` }}><ellipse cx="61" cy="148" rx="11" ry="5" /><ellipse cx="213" cy="149" rx="10" ry="4" /></g>)}
    </g>}
    {type === 'design' && <>
      <path d="M30 119L36 102Q40 96 74 92L108 66Q119 58 151 59Q179 59 207 87L260 98Q279 103 287 120L285 131H258M210 131H105M57 131H32Z" />
      <path d="M86 92L117 69Q154 61 177 72L197 90ZM147 66L152 91M37 111L64 108M261 109L280 114M111 110Q166 102 205 108M115 120H196" />
      <circle cx="81" cy="130" r="23" /><circle cx="234" cy="130" r="23" />
      <circle cx="81" cy="130" r="12" /><circle cx="234" cy="130" r="12" />
    </>}
    {type === 'heritage' && <>
      {/* Early motoring silhouette with prominent round lamps, not a model replica. */}
      <path d="M62 122V91L92 83V69H133V88L178 94V70Q190 61 218 66L231 91V124M91 123H187M227 124H265" />
      <path d="M176 93V113H142V92M139 88L133 59H94L89 83M98 62H126M179 72L191 84M188 79L197 70M213 68V89H228M230 91L252 102V120" />
      <path d="M50 126Q55 105 77 105Q99 105 105 128M181 128Q187 105 208 105Q232 105 238 127M48 132H57M98 132H185M232 132H266" />
      <path d="M44 85Q54 79 68 83V112H44ZM49 87V107M55 85V108M61 86V109" />
      <circle cx="38" cy="87" r="12" /><circle cx="82" cy="83" r="13" />
      <circle cx="38" cy="87" r="8" /><circle cx="82" cy="83" r="9" />
      <path d="M38 99V114M82 96V103M111 95V113M119 96V113M127 97V113" />
      {[77,208].map(x => <g key={x}>
        <circle cx={x} cy="133" r="24" /><circle cx={x} cy="133" r="20" /><circle cx={x} cy="133" r="4" />
        {[0,30,60,90,120,150].map(angle => <path key={angle} d={`M${x-20} 133H${x+20}`} transform={`rotate(${angle} ${x} 133)`} strokeWidth="1" />)}
      </g>)}
    </>}
    {type === 'mechanics' && <>
      <path d="M29 128V108L74 95L105 65H171L207 95L266 102L287 118V131H258M210 131H106M58 131H29" />
      <path d="M88 94L112 73H140V94ZM149 73H168L193 94H149Z" />
      <path d="M107 116H207M112 109H152V123H112ZM164 108H197V123H164ZM204 106H226V113H204ZM84 119V139M233 119V139M84 129H233" strokeDasharray="3 4" />
      <circle cx="82" cy="131" r="23" /><circle cx="234" cy="131" r="23" />
      <circle cx="82" cy="131" r="13" /><circle cx="234" cy="131" r="13" />
      <path d="M73 122L91 140M73 140L91 122M225 122L243 140M225 140L243 122M42 108H65M269 113H280" />
    </>}
    {type === 'racing' && <>
      <path d="M29 128L38 104L91 92L123 70H167L199 91L256 103L287 124V134H257M209 134H105M57 134H29Z" />
      <path d="M103 92L129 77H165L184 94ZM46 102V81M31 80H79L75 86H32ZM109 123H198L183 112H130ZM256 112L277 121M271 139H293M35 139H51M208 102L222 105M204 107L218 110" />
      <circle cx="81" cy="132" r="23" /><circle cx="233" cy="132" r="23" />
      <circle cx="81" cy="132" r="12" /><circle cx="233" cy="132" r="12" />
      {[81,233].map(x => <g key={x} transform={`translate(${x} 132)`}><g className="ai-racing-wheel"><path d="M-17 0H17M0-17V17M-12-12L12 12M-12 12L12-12" strokeWidth="1.3" /></g></g>)}
      <path d="M29 61H75M16 70H59M21 91H32" opacity=".6" />
    </>}
  </svg>
}

export default function ArenaInterests() {
  return <section className="ar-container ar-section arena-interests" aria-labelledby="arena-curiosity">
    <header className="ar-heading">
      <h3 id="arena-curiosity">Every visitor enters the museum with a different curiosity.</h3>
    </header>
    <div className="ai-grid">
      {interests.map(interest => <div key={interest.id}
        className="ai-card" tabIndex={0} role="group"
        style={{ '--interest-color': interest.color }}
        aria-labelledby={`interest-title-${interest.id}`}
        aria-describedby={`interest-${interest.id}`}>
        <span className={`ai-object ai-object-${interest.id}`}><InterestVisual type={interest.id} /></span>
        <span className="ai-title" id={`interest-title-${interest.id}`}>{interest.title}</span>
        <span className="ai-detail" id={`interest-${interest.id}`}><span>{interest.description}</span></span>
      </div>)}
    </div>
  </section>
}
