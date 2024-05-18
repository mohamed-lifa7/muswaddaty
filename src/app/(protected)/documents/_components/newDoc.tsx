"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { addNewDoc } from "@/actions/doc";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
const formSchema = z.object({
  title: z.string({
    required_error: "The document name is required",
  }),
});
const AddNewDoc = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  if (!user) return null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      void addNewDoc({ ownerId: user.id!, title: values.title }).then(
        (data) => {
          if (data.success) {
            toast.success("Document has been created successfully");
            router.push(`/documents/${data.id}`);
          } else {
            toast.error(data.error ?? "An error occurred!");
          }
        },
      );
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-2" size="lg">
          <span>New</span> <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <DialogHeader>
                        <DialogTitle>Add new Document</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="docName" className="text-right">
                            Name
                          </Label>
                          <Input
                            {...field}
                            type="text"
                            placeholder="untitled"
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
};

export default AddNewDoc;
