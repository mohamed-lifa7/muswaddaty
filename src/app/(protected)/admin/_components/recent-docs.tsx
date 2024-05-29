import type { Document } from "@prisma/client";

export function RecentDocuments({ documents }: { documents: Document[] }) {
  return (
    <div className="space-y-8">
      {documents.map((doc) => (
        <div className="flex items-center" key={doc.id}>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{doc.title}</p>
            <p className="text-sm text-muted-foreground">
              {doc.createdAt.toLocaleString()}
            </p>
          </div>
          <div className="ml-auto text-sm font-thin">{doc.ownerId}</div>
        </div>
      ))}
    </div>
  );
}
