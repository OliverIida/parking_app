import { useState, useEffect, useRef } from 'react';
import { Clock, Plane } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export function ParkingMachine() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [planeNumber, setPlaneNumber] = useState('');
  const [message, setMessage] = useState("Enter your plane number:");
  const [currentPlane, setCurrentPlane] = useState<string>('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Don't auto-reset if it's the "Type 'Time'..." message - it should stay until user enters time/end
    if (message.includes("Type 'Time' to see how long the plane has been parked for")) {
      return;
    }
    
    if (message.includes("NB! The plane number must be in the following format: 123ABC") || 
        (message.startsWith("Plane ") && message.includes(" parked!")) ||
        message.includes("has been parked for") ||
        message.includes("parked for a total of") ||
        message.includes("Parking lot is full")) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setMessage("Enter your plane number:");
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message]);

  const handlePlaneNumberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = planeNumber.toLowerCase().trim();
    
    // If we're waiting for time/end action
    if (currentPlane) {
      if (input === 'time' || input === 'end') {
        const response = await fetch(`${API_URL}/action`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: input, plane_number: currentPlane }),
        });
        
        const data = await response.json();
        setMessage(data.message);
        setPlaneNumber('');
        if (data.ended || input === 'time') {
          setCurrentPlane('');
        }
      } else {
        // Wrong input, just show the same message again
        setMessage("Type 'Time' to see how long the plane has been parked for\nType 'End' to stop parking");
        setPlaneNumber('');
      }
      return;
    }
    
    // If user types "time" or "end" when not in action state, show format error
    if (input === 'time' || input === 'end') {
      setMessage("NB! The plane number must be in the following format: 123ABC\n");
      setPlaneNumber('');
      return;
    }
    
    // Otherwise, treat as plane number
    const response = await fetch(`${API_URL}/park`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plane_number: planeNumber.toUpperCase() }),
    });
    
    const data = await response.json();
    setMessage(data.message);
    if (data.status === 'exists') {
      setCurrentPlane(data.plane_number);
    } else {
      setCurrentPlane('');
    }
    setPlaneNumber('');
  };

  return (
    <div className="w-96 rounded-2xl overflow-hidden">
      {/* Screen - Top Part */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 border-b-4 border-gray-600 rounded-b-2xl">
        <div className="bg-green-950 rounded-lg p-6 min-h-[200px] border-2 border-gray-600">
          <div className="text-green-400 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>PARKING METER</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{currentTime}</span>
              </div>
            </div>
            
            <div className="border-t border-green-800 pt-4">
              <div className="mt-4">
                <div className="whitespace-pre-line min-h-[60px]">{message}</div>
                <form onSubmit={handlePlaneNumberSubmit} className="mt-2">
                  <input
                    type="text"
                    value={planeNumber}
                    onChange={(e) => setPlaneNumber(e.target.value)}
                    className="w-full bg-green-900 text-green-400 border border-green-700 rounded px-2 py-1 focus:outline-none focus:border-green-500"
                    maxLength={6}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

