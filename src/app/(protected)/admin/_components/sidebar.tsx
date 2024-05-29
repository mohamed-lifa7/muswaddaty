"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { icons } from "lucide-react";
import { navItems } from "@/constants/admin";

export default function Sidebar() {
  const path = usePathname();

  return (
    <nav
      className={cn(`sticky hidden h-screen w-60 lg:block`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <nav className="grid items-start gap-2">
            {navItems.map((item, index) => {
              return (
                item.href && (
                  <Button
                    className={cn(
                      "item-center flex space-x-2 justify-start",
                      path === item.href ? "bg-muted" : "bg-transparent",
                      item.disabled && "cursor-not-allowed opacity-80",
                    )}
                    variant="ghost"
                    key={index}
                    asChild
                  >
                    <Link href={item.disabled ? "/" : item.href}>
                      <PostIcon
                        className="mr-2 h-4 w-4"
                        iconName={item.icon!}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </Button>
                )
              );
            })}
          </nav>
        </div>
      </div>
    </nav>
  );
}

const PostIcon = ({
  iconName,
  className,
}: {
  iconName: string;
  className: string;
}) => {
  const Icon = icons[iconName as keyof typeof icons];
  return <Icon className={cn(className)} />;
};
