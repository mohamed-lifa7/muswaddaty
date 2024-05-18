"use client";

import type { Document } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: "Doc Name",
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt")).toUTCString();
      return (
        <time dateTime={date} className="whitespace-nowrap">
          {date}
        </time>
      );
    },
  },
  {
    accessorKey: "ownerId",
    header: "Owner ID",
    cell: async ({ row }) => {
      const owner = row.getValue("ownerId");
      return <span>{owner as string}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doc = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(doc.id)}
            >
              Copy Document ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/documents/${doc.id}`}>
            <DropdownMenuItem className="cursor-pointer">Go to Document</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
