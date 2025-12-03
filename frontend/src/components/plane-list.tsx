import { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export function PlaneList() {
  const [planes, setPlanes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlanes = async () => {
      const response = await fetch(`${API_URL}/planes`);
      const data = await response.json();
      setPlanes(data.planes || []);
    };

    // Fetch immediately
    fetchPlanes();

    // Poll every 500ms to keep the list updated
    const interval = setInterval(fetchPlanes, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 rounded-2xl overflow-hidden">
      {/* Screen - Top Part */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 border-b-4 border-gray-600 rounded-b-2xl">
        <div className="bg-green-950 rounded-lg p-6 min-h-[200px] border-2 border-gray-600">
          <div className="text-green-400 space-y-4 font-mono">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              <span>PLANES CURRENTLY PARKING:</span>
            </div>
            
            <div className="border-t border-green-800 pt-4">
              <div className="mt-4">
                {planes.length === 0 ? (
                  <div className="text-green-600">No planes currently parking</div>
                ) : (
                  <div className="space-y-2">
                    {planes.map((plane) => (
                      <div key={plane} className="text-green-400">
                        {plane}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

