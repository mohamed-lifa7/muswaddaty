import { ContactUsForm } from "../_components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.",
};

const ContactUsPage = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight">
          Contact Us
        </h2>
        <p className="mb-8 text-center font-light text-muted-foreground sm:text-xl lg:mb-16">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactUsPage;
