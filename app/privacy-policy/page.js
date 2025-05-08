import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container-responsive mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gold hover:text-gold/80 transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif mb-8">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p className="text-gray-700">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-serif mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to Marbella Apartments (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website, communicate with us, or engage with our services.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. Information We Collect</h2>
          <p className="text-gray-700">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>Fill out forms on our website</li>
            <li>Subscribe to our newsletter</li>
            <li>Request information about our properties</li>
            <li>Contact us via email, phone, or chat</li>
            <li>Schedule a property viewing</li>
          </ul>
          <p className="text-gray-700 mt-4">
            This information may include your name, email address, phone number, and any other information you choose to
            provide.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-700">We may use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>Providing and maintaining our services</li>
            <li>Responding to your inquiries and requests</li>
            <li>Sending you marketing communications</li>
            <li>Improving our website and services</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            We may use cookies, web beacons, and similar tracking technologies to collect information about your
            browsing activities on our website. These technologies help us analyze website traffic, customize content,
            and improve your experience.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Information Sharing</h2>
          <p className="text-gray-700">We may share your information with:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>Service providers who perform services on our behalf</li>
            <li>Professional advisors such as lawyers and accountants</li>
            <li>Regulatory authorities, government agencies, and law enforcement</li>
            <li>Business partners with your consent</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">6. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">7. Your Rights</h2>
          <p className="text-gray-700">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
          </ul>

          <h2 className="text-2xl font-serif mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
            &quot;Last Updated&quot; date and will be effective as soon as it is accessible.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions or concerns about this Privacy Policy, please contact us at:
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
  )
}
