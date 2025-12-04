import { useState, useEffect, useRef } from 'react';
import { ParkingMachine } from './components/parkingmachine';
import { PlaneList } from './components/plane-list';
import Lines from './components/lines';
import Plane from './components/plane';

const API_URL = 'http://localhost:5000';

interface PlanePosition {
  planeNumber: string;
  spotIndex: number;
  x: number;
  y: number;
  color: string;
}

const PLANE_COLORS = ['#0e37cc', '#dc2626', '#cc990e', '#18cc0e']; // blue, red, yellow, green

const TOTAL_SPOTS = 8; // 2 rows × 4 columns
const CONTAINER_WIDTH = 1200;
const CONTAINER_HEIGHT = 700;
const SPOT_WIDTH = CONTAINER_WIDTH / 4; // 300px per column
const SPOT_HEIGHT = CONTAINER_HEIGHT / 2; // 350px per row
const LINE_WIDTH = 3; // Width of the lines

function App() {
  const [parkedPlanes, setParkedPlanes] = useState<PlanePosition[]>([]);
  const previousPlanesRef = useRef<string[]>([]);

  // Calculate position at the center of a specific spot (0-7)
  // Spots layout:
  // Top row: 0, 1, 2, 3 (left to right)
  // Bottom row: 4, 5, 6, 7 (left to right)
  const getSpotPosition = (spotIndex: number): { x: number; y: number } => {
    // Determine row (0 = top, 1 = bottom)
    const row = Math.floor(spotIndex / 4);
    // Determine column (0-3)
    const col = spotIndex % 4;
    
    // Calculate spot boundaries (avoiding lines)
    // Left edge: column * spotWidth + lineWidth
    // Right edge: (column + 1) * spotWidth - lineWidth
    const spotLeft = col * SPOT_WIDTH + LINE_WIDTH;
    const spotRight = (col + 1) * SPOT_WIDTH - LINE_WIDTH;
    const spotCenterX = (spotLeft + spotRight) / 2;
    
    // Top edge: row * spotHeight + lineWidth
    // Bottom edge: (row + 1) * spotHeight - lineWidth
    const spotTop = row * SPOT_HEIGHT + LINE_WIDTH;
    const spotBottom = (row + 1) * SPOT_HEIGHT - LINE_WIDTH;
    const spotCenterY = (spotTop + spotBottom) / 2;
    
    // Return the exact center of the spot
    return { x: spotCenterX, y: spotCenterY };
  };

  // Get available spots (spots not currently occupied)
  const getAvailableSpots = (occupiedSpots: number[]): number[] => {
    const allSpots = Array.from({ length: TOTAL_SPOTS }, (_, i) => i);
    return allSpots.filter(spot => !occupiedSpots.includes(spot));
  };

  // Get a random color for a plane
  const getRandomColor = (): string => {
    return PLANE_COLORS[Math.floor(Math.random() * PLANE_COLORS.length)];
  };

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(`${API_URL}/planes`);
        const data = await response.json();
        const currentPlanes: string[] = data.planes || [];
        
        // Check for new planes
        const newPlanes = currentPlanes.filter(
          plane => !previousPlanesRef.current.includes(plane)
        );
        
        // Check for removed planes
        const removedPlanes = previousPlanesRef.current.filter(
          plane => !currentPlanes.includes(plane)
        );
        
        // Update parked planes: remove departed ones and add new ones
        setParkedPlanes(prev => {
          // Remove planes that are no longer parking
          let updated = prev.filter(p => !removedPlanes.includes(p.planeNumber));
          
          // Get currently occupied spot indices
          const occupiedSpots = updated.map(p => p.spotIndex);
          
          // Add new planes with random available spots
          newPlanes.forEach(planeNumber => {
            const availableSpots = getAvailableSpots(occupiedSpots);
            if (availableSpots.length > 0) {
              // Randomly select an available spot
              const randomSpotIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
              const position = getSpotPosition(randomSpotIndex);
              const randomColor = getRandomColor();
              updated.push({
                planeNumber,
                spotIndex: randomSpotIndex,
                x: position.x,
                y: position.y,
                color: randomColor
              });
              occupiedSpots.push(randomSpotIndex);
            }
          });
          
          return updated;
        });
        
        previousPlanesRef.current = currentPlanes;
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };

    // Fetch immediately
    fetchPlanes();

    // Poll every 500ms to keep the list updated
    const interval = setInterval(fetchPlanes, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8 pb-8">
      <div className="flex gap-8">
        <ParkingMachine />
        <PlaneList />
      </div>
      <div className="mt-108 mb-108 flex items-center justify-center">
        <div className="relative w-[1200px] h-[700px]">
          <Lines />
          {/* Render planes at their positions */}
          {parkedPlanes.map((plane) => (
            <Plane
              key={plane.planeNumber}
              x={plane.x}
              y={plane.y}
              planeNumber={plane.planeNumber}
              isUpsideDown={plane.spotIndex < 4} // Top row (0-3) should be upside down
              color={plane.color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

