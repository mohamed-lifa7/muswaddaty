"use client";
import { useOthers, useSelf } from "@/liveblocks.config";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex -space-x-3 py-2">
      {users.map(({ connectionId, info }) => (
        <UserAvatar
          key={connectionId}
          picture={info.picture}
          name={info.name}
          color={info.color}
        />
      ))}
      {currentUser && (
        <UserAvatar
          picture={currentUser.info.picture}
          name={currentUser.info.name}
          color={currentUser.info.color}
        />
      )}
    </div>
  );
}

export function UserAvatar({
  picture,
  name,
  color,
}: {
  picture: string;
  name: string;
  color: string;
}) {
  const isLightColor = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 186;
  };
  const textColor = isLightColor(color) ? "black" : "white";
  return (
    <div className="">
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="overflow-hidden rounded-full border-4 border-border">
            <AvatarImage src={picture} alt={name.charAt(0).toUpperCase()} />
            <AvatarFallback
              style={{ backgroundColor: color, color: textColor }}
            >
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
