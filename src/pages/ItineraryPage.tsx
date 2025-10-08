import AnimatedMap from '../components/AnimatedMap';
import Itinerary from '../components/Itinerary';

export default function ItineraryPage() {
  return (
    <div className="space-y-12">
      <AnimatedMap />
      <Itinerary />
    </div>
  );
}