export default function Plane() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <svg 
        width="400" 
        height="400" 
        viewBox="0 0 400 400" 
        className="drop-shadow-lg"
      >
        {/* Plane body */}
        <ellipse 
          cx="200" 
          cy="220" 
          rx="30" 
          ry="115" 
          fill="#dc2626"
        />
        
        {/* Main wings */}
        <path 
          d="M 80 220 L 80 200 Q 200 160 320 200 L 320 220 Q 200 210 80 220 Z"
          fill="#dc2626"
        />
        
        {/* Tail wings */}
        <rect 
          x="150" 
          y="280" 
          width="100" 
          height="25" 
          rx="6"
          fill="#dc2626"
        />
        
        {/* Cockpit window */}
        <ellipse 
          cx="200" 
          cy="150" 
          rx="12" 
          ry="15" 
          fill="#1e293b"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

