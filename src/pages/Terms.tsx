import SEO from '../components/SEO';

export default function Terms() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-100 to-amber-50 scroll-mt-24">
      <SEO
        title="Terms of Use — Transcontinental Trek"
        description="Generic terms of use for Transcontinental Trek. Understand rules for accessing and using the website."
      />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
        <h1 className="text-4xl font-handwritten text-stone-900 mb-6">Terms of Use</h1>
        <p className="font-serif text-stone-700 mb-4">
          By accessing or using this website, you agree to these Terms. If you do not agree, please
          do not use the site.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Use of Content</h2>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• Content is provided for information and inspiration purposes.</li>
          <li>• You may not copy, distribute, or modify content without written permission.</li>
          <li>
            • External links are provided for convenience; we are not responsible for their content.
          </li>
        </ul>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">User Conduct</h2>
        <ul className="font-serif text-stone-700 space-y-2">
          <li>• Do not use the site for illegal activities or to harm others.</li>
          <li>• Do not attempt to disrupt site operations or security.</li>
        </ul>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Liability</h2>
        <p className="font-serif text-stone-700">
          We make no warranties regarding the accuracy or availability of the site. We are not
          liable for damages resulting from use.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Changes</h2>
        <p className="font-serif text-stone-700">
          We may update these Terms at any time. Continued use of the site indicates acceptance of
          changes.
        </p>

        <h2 className="text-2xl font-handwritten text-stone-900 mt-6 mb-3">Contact</h2>
        <p className="font-serif text-stone-700">
          For questions about these Terms, contact{' '}
          <a
            href="mailto:legal@transcontinentaltrek.com"
            className="text-amber-700 hover:underline"
          >
            legal@transcontinentaltrek.com
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
