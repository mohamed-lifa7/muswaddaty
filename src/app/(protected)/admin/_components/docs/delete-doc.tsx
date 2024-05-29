"use client";

import { deleteDocWithAdmin } from "@/actions/doc";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteDoc = ({ docId }: { docId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      await deleteDocWithAdmin(docId).then((data) => {
        if (data.success) {
          toast.success("Document has been deleted successfully");
          router.refresh();
        } else {
          toast.error(data.error ?? "An error occurred!");
        }
      });
    });
  };

  return (
    <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
      Confirm
    </Button>
  );
};
