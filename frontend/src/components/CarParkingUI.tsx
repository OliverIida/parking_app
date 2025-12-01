import React from 'react';

interface CarParkingUIProps {
  className?: string;
}

const CarParkingUI: React.FC<CarParkingUIProps> = ({ className = '' }) => {
  const parkingSpots = 5;
  const spotWidth = 80;
  const lineLength = spotWidth * (parkingSpots - 1);
  const lineThickness = 4;
  const verticalLineHeight = 120;

  return (
    <div className={`relative w-full h-full min-h-[400px] flex items-center justify-center bg-[#2a2a2a] ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${lineLength + 100} ${verticalLineHeight + 100}`}
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full max-h-full"
      >
        {/* Horizontal line in the middle */}
        <line
          x1="50"
          y1={verticalLineHeight / 2 + 50}
          x2={lineLength + 50}
          y2={verticalLineHeight / 2 + 50}
          stroke="white"
          strokeWidth={lineThickness}
          strokeLinecap="round"
        />

        {/* Vertical lines */}
        {Array.from({ length: parkingSpots }).map((_, index) => {
          const x = 50 + index * spotWidth;
          const y1 = 50;
          const y2 = verticalLineHeight + 50;

          return (
            <line
              key={index}
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke="white"
              strokeWidth={lineThickness}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CarParkingUI;

