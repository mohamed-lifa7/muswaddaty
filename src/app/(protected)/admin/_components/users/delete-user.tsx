"use client";

import { deleteUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const DeleteUser = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      await deleteUser(userId).then((data) => {
        if (data.success) {
          toast.success("User has been deleted successfully");
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
