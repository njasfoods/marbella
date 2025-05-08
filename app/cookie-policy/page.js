import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container-responsive mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-gold hover:text-gold/80 transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif mb-8">Cookie Policy</h1>

        <div className="prose max-w-none">
          <p className="text-gray-700">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">1. What Are Cookies</h2>
          <p className="text-gray-700">
            Cookies are small text files that are stored on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and provide information to the
            website owners. Cookies enhance user experience by remembering your
            preferences and enabling certain site functions.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">
            2. How We Use Cookies
          </h2>
          <p className="text-gray-700">
            Marbella Apartments uses cookies for various purposes, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function properly and cannot be switched off in
              our systems.
            </li>
            <li>
              <strong>Performance Cookies:</strong> These cookies allow us to
              count visits and traffic sources so we can measure and improve the
              performance of our site.
            </li>
            <li>
              <strong>Functional Cookies:</strong> These cookies enable the
              website to provide enhanced functionality and personalization.
            </li>
            <li>
              <strong>Targeting Cookies:</strong> These cookies may be set
              through our site by our advertising partners to build a profile of
              your interests and show you relevant advertisements on other
              sites.
            </li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">
            3. Types of Cookies We Use
          </h2>
          <p className="text-gray-700">
            We use the following types of cookies on our website:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>
              <strong>Session Cookies:</strong> These are temporary cookies that
              expire when you close your browser.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> These remain on your device
              until they expire or you delete them.
            </li>
            <li>
              <strong>First-Party Cookies:</strong> These are cookies set by our
              website.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> These are cookies set by
              third parties, such as Google Analytics.
            </li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Managing Cookies</h2>
          <p className="text-gray-700">
            Most web browsers allow you to manage your cookie preferences. You
            can set your browser to refuse cookies or delete certain cookies.
            Generally, you can also manage similar technologies in the same way
            that you manage cookies – using your browser&apos;s preferences.
          </p>
          <p className="text-gray-700 mt-4">
            The following links show how to adjust your cookie settings in
            common browsers:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold/80"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">
            5. Changes to Our Cookie Policy
          </h2>
          <p className="text-gray-700">
            We may update our Cookie Policy from time to time. Any changes will
            be posted on this page with an updated &quot;Last Updated&quot;
            date. We encourage you to review this Cookie Policy periodically for
            any changes.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our Cookie Policy, please contact us
            at:
          </p>
          <p className="text-gray-700 mt-4">
            Marbella Apartments
            <br />
            Long Lane, Kingston, Jamaica
            <br />
            Email: privacy@marbellaja.com
            <br />
            Phone: +1 (876) 589-7448
          </p>
        </div>
      </div>
    </div>
  );
}
