"use client";
import {
  type PartialBlock,
  type BlockNoteEditor,
  filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  useCreateBlockNote,
  SuggestionMenuItem,
  SuggestionMenuProps,
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf } from "@/liveblocks.config";
import { useEffect, useState } from "react";
import { Avatars } from "@/components/users/Avatars";
import { useTheme } from "next-themes";
import { AddContributor } from "./add-contributor";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "./ui/button";
import { downloadFile } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const insertMagicAi = (editor: BlockNoteEditor) => ({
  title: "Continue with AI",
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const magicAiBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: "Hello World", styles: { bold: true } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([magicAiBlock], currentBlock, "after");
  },
  aliases: ["ai", "magic"],
  group: "Other",
  icon: <Sparkles size={18} />,
  subtext: 'Continue your idea with some extra inspiration!',
});

const getCustomSlashMenuItems = (
  editor: BlockNoteEditor,
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertMagicAi(editor),
];

export default function Editor({
  docId,
  docName,
}: {
  docId: string;
  docName: string;
}) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<unknown>();
  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);
  if (!doc || !provider) {
    return null;
  }
  return (
    <BlockNote doc={doc} provider={provider} docId={docId} docName={docName} />
  );
}

type EditorProps = {
  doc: Y.Doc;
  provider: unknown;
  docId: string;
  docName: string;
};
function BlockNote({ doc, provider, docId, docName }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const [markdown, setMarkdown] = useState<string>("");
  const [content, setContent] = useState<PartialBlock[]>();
  const [html, setHTML] = useState<string>("");
  const { edgestore } = useEdgeStore();

  const handleDownloadMarkdown = () => {
    downloadFile(markdown, `${docName}.md`, "text/markdown");
  };

  const handleDownloadHTML = () => {
    downloadFile(html, `${docName}.html`, "text/html");
  };

  const handleDownloadJSON = () => {
    downloadFile(
      JSON.stringify(editor.document),
      `${docName}.json`,
      "application/json",
    );
  };

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonContent = e.target?.result as string;
        const parsedContent = JSON.parse(jsonContent) as PartialBlock[];
        console.log(parsedContent);
        setContent(parsedContent);
        editor.insertBlocks(
          content!,
          { id: editor.document[editor.document.length - 1]?.id ?? "" },
          "after",
        );
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information for this user:
      user: { name: userInfo.name, color: userInfo.color },
    },
    uploadFile: handleUpload,
  });

  const onChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    const html = await editor.blocksToHTMLLossy(editor.document);
    setMarkdown(markdown);
    setHTML(html);
  };
  const { theme } = useTheme();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Avatars />
        <AddContributor docId={docId} />
        <div className="flex space-x-2">
          <Button onClick={handleDownloadMarkdown} variant="outline">
            Download Markdown
          </Button>
          <Button onClick={handleDownloadHTML} variant="outline">
            Download HTML
          </Button>
          <Button onClick={handleDownloadJSON} variant="outline">
            Get JSON
          </Button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="upload-json"
          />
          <Button variant="outline" asChild>
            <label htmlFor="upload-json">Import JSON</label>
          </Button>
        </div>
      </div>
      <div>
        <BlockNoteView
          editor={editor}
          theme={theme === "dark" ? "dark" : "light"}
          onChange={onChange}
          slashMenu={false}
        >
          <SuggestionMenuController
            triggerCharacter={"/"}
            // Replaces the default Slash Menu items with our custom ones.
            getItems={async (query) =>
              filterSuggestionItems(getCustomSlashMenuItems(editor), query)
            }
          />
        </BlockNoteView>
      </div>
    </div>
  );
}
