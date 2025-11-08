import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 scroll-mt-24">
      <SEO
        title="Privacy Policy — Transcontinental Trek"
        description="Generic privacy policy for Transcontinental Trek. Learn how we handle data and user information."
      />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
        <h2 className="text-4xl font-handwritten text-stone-900 mb-6">Privacy Policy</h2>
        <p className="font-serif text-stone-700 mb-4">
          This Privacy Policy explains how we collect, use, and protect your information when you
          use our website. By accessing our site, you consent to this policy.
        </p>

        <h3 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">
          Information We Collect
        </h3>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• Contact information (e.g., email) when you reach out via forms or mail.</li>
          <li>• Analytics data (traffic, pages visited) via cookies or similar tools.</li>
          <li>• Any content you voluntarily submit (comments, messages).</li>
        </ul>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">
          How We Use Information
        </h2>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• To respond to your messages and provide updates.</li>
          <li>• To improve content, performance, and user experience.</li>
          <li>• To manage sponsorships, support, and media requests.</li>
        </ul>

        <h3 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Cookies & Analytics</h3>
        <p className="font-serif text-stone-700">
          We use a consent banner to control analytics scripts. Analytics (e.g., Plausible, Umami, Google Analytics) are only loaded if you explicitly consent. You can withdraw consent at any time by clearing your browser storage (localStorage key <code>wg_consent_analytics</code>) or via the banner when presented again.
        </p>
        <p className="font-serif text-stone-700 mt-2">
          Providers and data: Plausible and Umami focus on privacy-preserving analytics. Google Analytics may collect additional usage data. We do not sell personal information. You can disable cookies in your browser settings.
        </p>

        <h3 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Data Sharing</h3>
        <p className="font-serif text-stone-700">
          We do not sell your personal information. We may share aggregated analytics with partners
          and service providers (e.g., hosting, email).
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Security</h2>
        <p className="font-serif text-stone-700">
          We take reasonable measures to protect your data. However, no method of transmission or
          storage is 100% secure.
        </p>

        <h3 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Your Rights</h3>
        <p className="font-serif text-stone-700">
          You may request access, correction, or deletion of your personal data by contacting us.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Contact</h2>
        <p className="font-serif text-stone-700">
          For privacy inquiries, email us at{' '}
          <a
            href="mailto:privacy@transcontinentaltrek.com"
            className="text-amber-700 hover:underline"
          >
            privacy@transcontinentaltrek.com
          </a>
          .
        </p>

        <p className="font-serif text-stone-500 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
