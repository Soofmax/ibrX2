import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 scroll-mt-24">
      <SEO title="Privacy Policy — Transcontinental Trek" description="Generic privacy policy for Transcontinental Trek. Learn how we handle data and user information." />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
        <h1 className="text-4xl font-handwritten text-stone-900 mb-6">Privacy Policy</h1>
        <p className="font-serif text-stone-700 mb-4">
          This Privacy Policy explains how we collect, use, and protect your information when you use our website. By accessing our site, you consent to this policy.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Information We Collect</h2>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• Contact information (e.g., email) when you reach out via forms or mail.</li>
          <li>• Analytics data (traffic, pages visited) via cookies or similar tools.</li>
          <li>• Any content you voluntarily submit (comments, messages).</li>
        </ul>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">How We Use Information</h2>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• To respond to your messages and provide updates.</li>
          <li>• To improve content, performance, and user experience.</li>
          <li>• To manage sponsorships, support, and media requests.</li>
        </ul>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Cookies</h2>
        <p className="font-serif text-stone-700">
          We may use cookies or similar technologies to analyze traffic and enhance the site. You can disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Data Sharing</h2>
        <p className="font-serif text-stone-700">
          We do not sell your personal information. We may share aggregated analytics with partners and service providers (e.g., hosting, email).
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Security</h2>
        <p className="font-serif text-stone-700">
          We take reasonable measures to protect your data. However, no method of transmission or storage is 100% secure.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Your Rights</h2>
        <p className="font-serif text-stone-700">
          You may request access, correction, or deletion of your personal data by contacting us.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Contact</h2>
        <p className="font-serif text-stone-700">
          For privacy inquiries, email us at <a href="mailto:privacy@transcontinentaltrek.com" className="text-amber-700 hover:underline">privacy@transcontinentaltrek.com</a>.
        </p>

        <p className="font-serif text-stone-500 text-sm mt-8">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </section>
  );
}