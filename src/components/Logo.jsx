export default function Logo() {
  return (
    <svg
      className="logo-svg overflow-visible"
      style={{ width: 38, height: 38 }}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TuringCollective neural logo"
    >
      <defs>
        <filter id="bgf" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M20 5C28 5,35 9,35 17C35 25,30 29,26 31C24 32,22 33,20 33C18 33,16 32,14 31C10 29,5 25,5 17C5 9,12 5,20 5Z" fill="none" stroke="#00d4ff" strokeWidth="1.4" filter="url(#bgf)" />
      <path d="M20 6C19 13,21 22,20 33" fill="none" stroke="#00d4ff" strokeWidth="0.7" opacity="0.45" />
      <path d="M9 14C12 11,16 13,14 17"  fill="none" stroke="#00d4ff" strokeWidth="0.65" opacity="0.35" />
      <path d="M7 22C10 19,14 21,12 25"  fill="none" stroke="#00d4ff" strokeWidth="0.65" opacity="0.35" />
      <path d="M31 14C28 11,24 13,26 17" fill="none" stroke="#00d4ff" strokeWidth="0.65" opacity="0.35" />
      <path d="M33 22C30 19,26 21,28 25" fill="none" stroke="#00d4ff" strokeWidth="0.65" opacity="0.35" />
      <g stroke="#00d4ff" strokeWidth="0.55" opacity="0.55">
        <line className="brain-synapse"    x1="11" y1="13" x2="20" y2="11" />
        <line className="brain-synapse s2" x1="20" y1="11" x2="29" y2="13" />
        <line className="brain-synapse s3" x1="11" y1="13" x2="9"  y2="22" />
        <line className="brain-synapse s4" x1="29" y1="13" x2="31" y2="22" />
        <line className="brain-synapse s5" x1="9"  y1="22" x2="20" y2="22" />
        <line className="brain-synapse s6" x1="20" y1="22" x2="31" y2="22" />
        <line className="brain-synapse s3" x1="9"  y1="22" x2="14" y2="30" />
        <line className="brain-synapse s4" x1="31" y1="22" x2="26" y2="30" />
        <line className="brain-synapse s2" x1="11" y1="13" x2="20" y2="22" />
        <line className="brain-synapse"    x1="29" y1="13" x2="20" y2="22" />
        <line className="brain-synapse s5" x1="14" y1="30" x2="20" y2="22" />
        <line className="brain-synapse s6" x1="26" y1="30" x2="20" y2="22" />
      </g>
      <g fill="#00d4ff" filter="url(#bgf)">
        <circle className="brain-node"    cx="11" cy="13" r="2" />
        <circle className="brain-node n2" cx="20" cy="11" r="2" />
        <circle className="brain-node n3" cx="29" cy="13" r="2" />
        <circle className="brain-node n4" cx="9"  cy="22" r="2" />
        <circle className="brain-node n5" cx="20" cy="22" r="2.6" />
        <circle className="brain-node n6" cx="31" cy="22" r="2" />
        <circle className="brain-node n7" cx="14" cy="30" r="2" />
        <circle className="brain-node n8" cx="26" cy="30" r="2" />
      </g>
    </svg>
  )
}
