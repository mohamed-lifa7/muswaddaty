import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Learn about the terms of service that govern your use of Muswaddaty.",
};

const TermsPage = () => {
  return (
    <main className="mx-auto mt-6 max-w-4xl p-8">
      <h1 className="p-4 text-center text-4xl font-bold">
        Muswaddaty Terms of Service
      </h1>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
        <p className="mb-4">
          Welcome to Muswaddaty! These terms of service (&quot;Terms&quot;)
          govern your use of our block-based online text editor. By accessing or
          using Muswaddaty, you agree to be bound by these Terms.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">User Accounts</h2>
        <p className="mb-4">
          To use certain features of Muswaddaty, you must create an account. You
          are responsible for maintaining the confidentiality of your account
          information and for all activities that occur under your account.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Acceptable Use</h2>
        <p className="mb-4">
          You agree not to use Muswaddaty for any unlawful purpose or in any way
          that could harm the platform or its users. This includes, but is not
          limited to:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>Posting or transmitting harmful or offensive content.</li>
          <li>
            Engaging in any activity that interferes with or disrupts the
            platform.
          </li>
          <li>
            Attempting to gain unauthorized access to other user accounts.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Content Ownership</h2>
        <p className="mb-4">
          You retain ownership of the content you create and upload to
          Muswaddaty. By using the platform, you grant us a non-exclusive,
          worldwide, royalty-free license to use, store, and display your
          content solely for the purpose of operating and improving Muswaddaty.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account if you
          violate these Terms or engage in any conduct that we determine to be
          inappropriate or harmful.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Disclaimer of Warranties
        </h2>
        <p className="mb-4">
          Muswaddaty is provided &quot;as is&quot; without warranties of any
          kind, either express or implied. We do not warrant that the platform
          will be uninterrupted or error-free.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, Muswaddaty shall not be liable
          for any indirect, incidental, special, or consequential damages
          arising out of or in connection with your use of the platform.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Changes to These Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. We will notify you of any
          changes by posting the new Terms on our website. Your continued use of
          Muswaddaty after any changes constitute your acceptance of the new
          Terms.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws
          of our goverment. Any disputes arising from these Terms or your use of
          Muswaddaty shall be resolved in the courts of our goverment.
        </p>
      </section>
    </main>
  );
};

export default TermsPage;
