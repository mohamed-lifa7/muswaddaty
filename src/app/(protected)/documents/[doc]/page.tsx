import DocNotFoundPage from "@/components/notfound";
import { Room } from "@/components/room";
import { getDocById } from "@/data/doc";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
type Props = {
  params: { doc: string };
};
const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.doc;

  // fetch data
  const doc = await getDocById(id);

  return {
    title: doc?.title,
  };
}
const Document = async ({ params }: Props) => {
  const doc = await getDocById(params.doc);
  if (!doc) {
    return <DocNotFoundPage />;
  }
  return (
    <Room docId={params.doc}>
      <Editor docId={params.doc} docName={doc.title} />
    </Room>
  );
};

export default Document;
