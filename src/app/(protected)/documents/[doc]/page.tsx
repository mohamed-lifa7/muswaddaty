import DocNotFoundPage from "@/components/notfound";
import { Room } from "@/components/room";
import { getDocById } from "@/data/doc";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
const Document = async ({ params }: { params: { doc: string } }) => {
  const doc = await getDocById(params.doc);
  if (!doc) {
    return <DocNotFoundPage />;
  }
  return (
    <Room docId={params.doc}>
      <div
        className="mt-8 min-h-screen w-full rounded-lg border border-border p-4 shadow-md"
        id="document"
      >
        <Editor docId={params.doc} docName={doc.title} />
      </div>
    </Room>
  );
};

export default Document;
