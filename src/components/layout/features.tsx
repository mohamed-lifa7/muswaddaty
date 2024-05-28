"use client";
import { useFeatureStore } from "@/hooks/use-feature-store";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useRef } from "react";

const features = [
  {
    title: "Tools you need to start editing",
    imageUrl: "/gifs/works_out_of_the_box_light.gif",
    darkImageUrl: "/gifs/works_out_of_the_box_dark.gif",
    description:
      "The best block-based editor for you to create stunning documents.",
  },
  {
    title: "Drag, drop, and nest blocks easily",
    imageUrl: "/gifs/block_based_design_light.gif",
    darkImageUrl: "/gifs/block_based_design_dark.gif",
    description:
      "Create beautiful documents with simple, intuitive blocks for everyone.",
  },
  {
    title: "Collaborate in real-time with team",
    imageUrl: "/gifs/collaboration_light.gif",
    darkImageUrl: "/gifs/collaboration_dark.gif",
    description: "With real-time updates, teamwork is efficient and seamless.",
  },
];

function Features() {
  return (
    <div className="">
      <div className="mx-auto max-w-6xl px-4 md:block 2xl:max-w-[80%]">
        <div>
          <div className="flex w-full items-start gap-20">
            <div className="w-full md:py-[50vh]">
              <ul>
                {features.map((feature, index) => (
                  <li key={index}>
                    <FeatureData
                      id={index}
                      title={feature.title}
                      description={feature.description}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="sticky top-0 hidden h-screen w-full items-center md:flex">
              <FeatureImage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureImage = () => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const { theme } = useTheme();

  const invalidFeature =
    typeof inViewFeature !== "number" ||
    !features[inViewFeature]?.imageUrl ||
    typeof features[inViewFeature]?.imageUrl !== "string";

  return (
    <div className="relative aspect-video h-[25%] w-full rounded-2xl bg-accent lg:h-[40%] [&:has(>_.active-card)]:bg-transparent">
      {!invalidFeature && (
        <Image
          alt="feature"
          src={
            theme == "dark"
              ? features[inViewFeature]?.darkImageUrl ?? ""
              : features[inViewFeature]?.imageUrl ?? ""
          }
          width={434}
          height={317}
          className="h-full w-full rounded-md border border-border shadow-md"
          unoptimized={true}
        />
      )}
    </div>
  );
};

export default Features;

type FeatureDataProps = {
  id: number;
  title: string;
  description?: string;
};

export const FeatureData = ({ id, title, description }: FeatureDataProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const documentRef = useRef(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
    root: documentRef,
  });

  const setInViewFeature = useFeatureStore((state) => state.setInViewFeature);
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);

  useEffect(() => {
    if (isInView) setInViewFeature(id);
    if (!isInView && inViewFeature === id) setInViewFeature(null);
  }, [isInView, id, setInViewFeature, inViewFeature]);

  return (
    <p
      ref={ref}
      className={cn(
        "feature-title font-heading py-16 text-4xl font-semibold tracking-tight transition-colors xl:text-5xl 2xl:text-6xl",
        isInView ? "text-primary" : "text-muted",
      )}
    >
      {title}
      {description && (
        <span
          className={cn(
            "mt-3 block text-lg font-normal tracking-tight text-muted 2xl:text-3xl",
            isInView ? "text-muted-foreground" : "text-muted",
          )}
        >
          {description}
        </span>
      )}
    </p>
  );
};
