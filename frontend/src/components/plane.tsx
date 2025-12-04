interface PlaneProps {
  x: number;
  y: number;
  planeNumber?: string;
  isUpsideDown?: boolean;
  color?: string;
  isDeparting?: boolean;
  isArriving?: boolean;
  isTopRow?: boolean;
}

export default function Plane({ x, y, planeNumber, isUpsideDown = false, color = '#dc2626', isDeparting = false, isArriving = false, isTopRow = false }: PlaneProps) {
  // Determine animation class
  let animationClass = '';
  if (isDeparting) {
    animationClass = isTopRow ? 'plane-departing-up' : 'plane-departing-down';
  } else if (isArriving) {
    animationClass = isTopRow ? 'plane-arriving-down' : 'plane-arriving-up';
  }

  return (
    <div 
      className={`absolute pointer-events-none flex flex-col items-center ${animationClass}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <svg 
        width="300" 
        height="300" 
        viewBox="0 0 400 400" 
        className="drop-shadow-lg"
        style={{
          transform: isUpsideDown ? 'rotate(180deg)' : 'none'
        }}
      >
        {/* Plane body */}
        <ellipse 
          cx="200" 
          cy="220" 
          rx="30" 
          ry="115" 
          fill={color}
        />
        
        {/* Main wings */}
        <path 
          d="M 80 220 L 80 200 Q 200 160 320 200 L 320 220 Q 200 210 80 220 Z"
          fill={color}
        />
        
        {/* Tail wings */}
        <rect 
          x="150" 
          y="280" 
          width="100" 
          height="25" 
          rx="6"
          fill={color}
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
      {planeNumber && (
        <div className={`text-white text-sm font-bold text-center bg-black bg-opacity-50 px-2 py-1 rounded w-[120px] ${isTopRow ? '-mt-12' : '-mt-5'}`}>
          {planeNumber}
        </div>
      )}
    </div>
  );
}

