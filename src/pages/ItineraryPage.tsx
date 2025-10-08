import CurrentLocation from '../components/CurrentLocation';
import Itinerary from '../components/Itinerary';

export default function ItineraryPage() {
  return (
    <div className="space-y-12">
      <CurrentLocation />
      <Itinerary />
    </div>
  );
}