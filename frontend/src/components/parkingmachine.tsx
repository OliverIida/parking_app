import { useState } from 'react';

import { Clock, Car } from 'lucide-react';

export function ParkingMachine() {
  const [currentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="w-96 bg-gray-500 rounded-2xl shadow-2xl overflow-hidden">
      {/* Screen - Top Part */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 border-b-4 border-gray-600">
        <div className="bg-green-950 rounded-lg p-6 min-h-[200px] border-2 border-gray-600">
          <div className="text-green-400 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{currentTime}</span>
              </div>
            </div>
            
            <div className="border-t border-green-800 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-5 h-5" />
                <span>PARKING METER</span>
              </div>
              <div className="mt-4">
                <div>RATE: $2.00/HR</div>
                <div className="mt-2">INSERT PAYMENT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Part - Dark Gray Area */}
      <div className="bg-gray-500 p-6 h-96"></div>
    </div>
  );
}

