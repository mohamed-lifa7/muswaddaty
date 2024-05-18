import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Muswaddaty - an open-source modern block-based online text editor.",
};

export default async function AboutPage() {
  return (
    <article className="container prose mx-auto max-w-3xl py-6 dark:prose-invert">
      <div>
        <h1 className="mb-2">About Muswaddaty</h1>
        <p className="mt-0 text-muted-foreground">
          Welcome to Muswaddaty - your go-to modern block-based online text
          editor! Whether you&apos;re a writer, coder, or creative thinker,
          Muswaddaty provides you with the tools to bring your ideas to life.
        </p>
      </div>
      <div>
        <h2 className="mb-2">Sponsorships</h2>
        <Separator />
        <p className="mt-0 text-muted-foreground">
          Muswaddaty is proudly supported by generous sponsors like [Your
          Sponsor]. Their contributions help us maintain and improve this
          platform, ensuring that you have the best editing experience possible.
          Interested in sponsoring Muswaddaty? Get in touch today!
        </p>
      </div>
      <div>
        <h2 className="mb-2">Contribute</h2>
        <Separator />
        <p className="mt-0 text-muted-foreground">
          Join our community of contributors and help shape the future of
          Muswaddaty! Whether you&apos;re a developer, designer, or
          documentation enthusiast, there&apos;s a place for you here. Check out
          our GitHub repository to get started on your contribution journey.
        </p>
      </div>
    </article>
  );
}
