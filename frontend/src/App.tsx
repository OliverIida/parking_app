import { ParkingMachine } from './components/parkingmachine';
import { PlaneList } from './components/plane-list';
import Lines from './components/lines';

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8 pb-8">
      <div className="flex gap-8">
        <ParkingMachine />
        <PlaneList />
      </div>
      <div className="mt-28">
        <Lines />
      </div>
    </div>
  )
}

export default App

