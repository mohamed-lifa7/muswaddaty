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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteDoc } from "./delete-doc";
export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "title",
    header: "Doc Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt")).toUTCString();
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
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`/documents/${doc.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Go to Document
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(doc.id)}
              >
                Copy Document ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Delete Document
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this document from our servers?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DeleteDoc docId={doc.id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
