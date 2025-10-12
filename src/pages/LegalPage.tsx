import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';

export default function LegalPage() {
  return (
    <div className="space-y-12">
      <PrivacyPolicy />
      <Terms />
    </div>
  );
}
