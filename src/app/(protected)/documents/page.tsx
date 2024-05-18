import { getAllDocsForCollaborator, getAllDocsForUser } from "@/actions/doc";
import AddNewDoc from "./_components/newDoc";
import { currentUser } from "@/server/auth";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CopyIdComponent from "@/components/copy-id";
const DocumentsPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const docs = await getData(user.id!);
  return (
    <main className="my-4 h-screen w-full space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <AddNewDoc />
        <p>
          <span 
          className="font-bold"
          >Your ID is</span> : {user.id} <CopyIdComponent id={user.id!} />{" "}
        </p>
      </div>

      <div className="w-full">
        <div className="my-4">
          <h2 className="text-2xl font-bold">Your Documents ({docs.length})</h2>
          <p className="text-muted-foreground">
            Here are all the documents you have created.
          </p>
        </div>
        <DataTable columns={columns} data={docs} />
      </div>
    </main>
  );
};

export default DocumentsPage;

const getData = async (userId: string) => {
  const userDocs = await getAllDocsForUser(userId);
  const collabDocs = await getAllDocsForCollaborator(userId);
  return [...userDocs, ...collabDocs];
};
