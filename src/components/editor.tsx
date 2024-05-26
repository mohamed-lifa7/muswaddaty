"use client";
import { type PartialBlock, type BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf } from "@/liveblocks.config";
import { useEffect, useRef, useState } from "react";
import { Avatars } from "@/components/users/Avatars";
import { useTheme } from "next-themes";
import { AddContributor } from "./add-contributor";
import { useEdgeStore } from "@/lib/edgestore";
import { downloadFile } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  const [open, setOpen] = useState<boolean>();
  const [content, setContent] = useState<PartialBlock[]>();
  const [html, setHTML] = useState<string>("");
  const reportTemplateRef = useRef<HTMLElement | null>(null);
  const { edgestore } = useEdgeStore();

  const handleDownloadMarkdown = () => {
    downloadFile(markdown, `${docName}.md`, "text/markdown");
  };

  const handleDownloadHTML = () => {
    downloadFile(html, `${docName}.html`, "text/html");
  };

  const handleDownloadJSON = () => {
    console.log(editor.document);
    downloadFile(
      JSON.stringify(editor.document),
      `${docName}.json`,
      "application/json",
    );
  };

  const handleGeneratePdf = async () => {
    const element = reportTemplateRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      format: "a4",
      unit: "px",
      orientation: "portrait",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("document.pdf");
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
      <div className="mb-4 flex flex-col items-center justify-between space-x-2 md:flex-row">
        <Avatars />
        <AddContributor docId={docId} />
        <div className="flex space-x-2">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Export</span> <Download className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Export Document</DrawerTitle>
                <DrawerDescription>
                  Choose a format to export your document.
                </DrawerDescription>
              </DrawerHeader>
              <div className="my-4 flex items-center justify-center space-x-2 md:space-x-4">
                <Button onClick={handleDownloadMarkdown}>
                  Download Markdown
                </Button>
                <Button onClick={handleDownloadHTML}>Download HTML</Button>
                <Button onClick={handleGeneratePdf}>Download PDF</Button>
                <Button onClick={handleDownloadJSON}>Get JSON</Button>
              </div>
              <DrawerFooter className="flex items-center justify-center pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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
      <div className="rounded-md border border-border shadow-md">
        <BlockNoteView
          ref={reportTemplateRef as React.RefObject<HTMLDivElement>}
          editor={editor}
          theme={theme === "dark" ? "dark" : "light"}
          onChange={onChange}
          className="min-h-screen w-full"
        />
      </div>
    </div>
  );
}
