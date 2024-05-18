import { posts } from ".velite";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { siteConfig } from "@/config/site-config";
import { Tag } from "@/components/tag";
import { MDXContent } from "@/components/mdx-component";
import "@/styles/mdx.css";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { ...siteConfig.authors },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert container mx-auto max-w-3xl py-6">
      <h1 className="mb-2">{post.title}</h1>
      <div className="mb-2 flex gap-2">
        {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
      </div>
      {post.description ? (
        <p className="mt-0 text-xl text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
