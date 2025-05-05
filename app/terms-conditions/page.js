import Link from "next/link"

export default function TermsConditions() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container-responsive mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gold hover:text-gold/80 transition-colors">
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif mb-8">Terms & Conditions</h1>

        <div className="prose max-w-none">
          <p className="text-gray-700">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-serif mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using the Marbella Apartments website (&quot;Site&quot;), you accept and agree to be bound by these
            Terms and Conditions. If you do not agree to these Terms and Conditions, you should not use the Site.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">2. Use of the Site</h2>
          <p className="text-gray-700">
            You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of,
            restrict, or inhibit anyone else&apos;s use and enjoyment of the Site. Prohibited behavior includes harassing or
            causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting
            the normal flow of dialogue within the Site.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">3. Intellectual Property</h2>
          <p className="text-gray-700">
            All content on this Site, including text, graphics, logos, images, audio clips, digital downloads, and data
            compilations, is the property of Marbella Apartments or its content suppliers and is protected by
            international copyright laws. The compilation of all content on this Site is the exclusive property of
            Marbella Apartments and is protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">4. Accuracy of Information</h2>
          <p className="text-gray-700">
            While we strive to provide accurate and up-to-date information about our properties, we make no
            representations or warranties about the completeness, reliability, or accuracy of this information. Any
            reliance on such information is strictly at your own risk. We reserve the right to modify the contents of
            the Site at any time, but we have no obligation to update any information on the Site.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">5. Links to Third-Party Websites</h2>
          <p className="text-gray-700">
            Our Site may contain links to third-party websites that are not owned or controlled by Marbella Apartments.
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of
            any third-party websites. We strongly advise you to read the terms and conditions and privacy policy of any
            third-party website that you visit.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700">
            In no event shall Marbella Apartments, its officers, directors, employees, or agents be liable for any
            direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any (i)
            errors, mistakes, or inaccuracies of content; (ii) personal injury or property damage of any nature
            whatsoever resulting from your access to and use of our Site; (iii) any unauthorized access to or use of our
            secure servers and/or any personal information stored therein.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">7. Indemnification</h2>
          <p className="text-gray-700">
            You agree to defend, indemnify, and hold harmless Marbella Apartments, its officers, directors, employees,
            and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt,
            and expenses (including but not limited to attorney&apos;s fees) arising from: (i) your use of and access to the
            Site; (ii) your violation of any term of these Terms and Conditions; (iii) your violation of any third party
            right, including without limitation any copyright, property, or privacy right.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">8. Governing Law</h2>
          <p className="text-gray-700">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of Jamaica,
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">9. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms and Conditions at any time. The updated version will be indicated
            by an updated &quot;Last Updated&quot; date and will be effective as soon as it is accessible. Your continued use of
            the Site after any such changes constitutes your acceptance of the new Terms and Conditions.
          </p>

          <h2 className="text-2xl font-serif mt-8 mb-4">10. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="text-gray-700 mt-4">
            Marbella Apartments
            <br />
            Long Lane, Kingston, Jamaica
            <br />
            Email: legal@marbellakingston.com
            <br />
            Phone: +1 (876) 123-4567
          </p>
        </div>
      </div>
    </div>
  )
}
