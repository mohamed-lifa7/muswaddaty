"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Copy, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addCollaborator } from "@/actions/doc";
import { toast } from "sonner";

const formSchema = z.object({
  userId: z.string().min(2).max(50),
});

export function AddContributor({ docId }: { docId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
    },
  });
  if (!user) return null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      startTransition(() => {
        void addCollaborator({ docId, userId: values.userId })
          .then((data) => {
            if (data.success) {
              toast.success("Contributor added successfully!");
              router.refresh();
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
          .catch(() => {
            toast.error("There is an error, please try again!");
          });
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2" size="lg">
          <span>Add Contributor</span> <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <DialogHeader>
                        <DialogTitle>Add new contributor</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="contributor-name"
                            className="text-right"
                          >
                            Contributor ID
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter contributor ID"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                  <DialogClose className="w-full">
                    <Button type="submit" className="w-full">
                      Add
                    </Button>
                  </DialogClose>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
