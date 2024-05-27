import { insertOrUpdateBlock } from "@blocknote/core";
import type { schema } from "../editor";
import { TriangleAlert } from "lucide-react";

export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Alert",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "alert",
    });
  },
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",
  icon: <TriangleAlert />,
});
