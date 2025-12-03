import { ParkingMachine } from './components/parkingmachine';
import Lines from './components/lines';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8 pb-8">
      <ParkingMachine />
      <div className="mt-12">
        <Lines />
      </div>
    </div>
  )
}

export default App

