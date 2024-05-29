"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Files,
  LifeBuoy,
  LogOut,
  Settings,
  UserCog,
} from "lucide-react";
import { logout } from "@/actions/logout";
import { type ExtendedUser } from "@/next-auth";
import { FaUser } from "react-icons/fa";
import { UserRole } from "@prisma/client";

const UserMenu = ({ user }: { user: ExtendedUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar className="flex h-full w-full items-center justify-center">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className="bg-primary">
              <FaUser className="text-primary-foreground" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings" className="flex">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>
                <kbd>⌘S</kbd>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {user.role === UserRole.ADMIN && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin" className="flex">
                <UserCog className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
                <DropdownMenuShortcut>
                  <kbd>⌘A</kbd>
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/documents" className="flex">
              <Files className="mr-2 h-4 w-4" />
              <span>Your Documents</span>
              <DropdownMenuShortcut>
                <kbd>⌘D</kbd>
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/contact">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>contact</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            void logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>
            <kbd>⌘Q</kbd>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
