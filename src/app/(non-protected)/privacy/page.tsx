import React from "react";

const page = () => {
  return (
    <main className="mx-auto mt-6 max-w-4xl p-8">
      <h1 className="text-4xl font-bold text-center p-4">Muswaddaty Privacy Policy</h1>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
        <p className="mb-4">
          Welcome to Muswaddaty! Your privacy is of utmost importance to us.
          This privacy policy explains how we collect, use, and protect your
          information when you use our block-based online text editor.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
        <p className="mb-4">We collect the following types of information:</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <strong>Personal Information:</strong> Name, email address, and
            other contact details when you sign up.
          </li>
          <li>
            <strong>Usage Data:</strong> Information on how you use the editor,
            such as features used and time spent.
          </li>
          <li>
            <strong>Content:</strong> The text, images, and other content you
            create within Muswaddaty.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          How We Use Your Information
        </h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="mb-4 list-inside list-disc">
          <li>Provide and improve our services.</li>
          <li>Personalize your experience.</li>
          <li>Communicate with you about updates and features.</li>
          <li>Ensure the security and integrity of our platform.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not share your personal information with third parties except in
          the following cases:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>With your consent.</li>
          <li>
            For legal reasons, such as complying with a subpoena or similar
            legal process.
          </li>
          <li>To protect our rights and property.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of
          your personal information. However, no method of transmission over the
          Internet or method of electronic storage is 100% secure.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal
          information. To exercise these rights, please contact us at
          support@muswaddaty.com.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on our website. We
          encourage you to review this policy periodically for any changes.
        </p>
      </section>
    </main>
  );
};

export default page;
