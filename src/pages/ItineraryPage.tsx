import SimpleCurrentLocation from '../components/SimpleCurrentLocation';
import Itinerary from '../components/Itinerary';

export default function ItineraryPage() {
  return (
    <div className="space-y-12">
      <SimpleCurrentLocation />
      <Itinerary />
    </div>
  );
}