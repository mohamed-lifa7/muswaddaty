import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  description: string;
};

export const Header = ({
  label,
  description
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className,
      )}>
        {label}
      </h1>
      <p className="text-muted-foreground text-sm text-center">
        {description}
      </p>
    </div>
  );
};
