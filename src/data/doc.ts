import { db } from "@/server/db";

/**
 * Retrieves a document by its ID.
 * @param id - The ID of the document to retrieve.
 * @returns The document object if found, or null if not found.
 */
export const getDocById = async (id: string) => {
  try {
    const doc = await db.document.findUnique({ where: { id } });

    return doc;
  } catch {
    return null;
  }
};

/**
 * Retrieves all documents for a given user.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of documents.
 */
export const getAllDocsForUser = async (userId: string) => {
  const docs = await db.document.findMany({
    where: { ownerId: userId },
  });
  return docs;
};

/**
 * Retrieves all documents for a collaborator.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of documents.
 */
export const getAllDocsForCollaborator = async (userId: string) => {
  const docs = await db.document.findMany({
    where: { collaborators: { has: userId } },
  });
  return docs;
};

// get all contributors for a document by its ID 

/**
 * Retrieves all contributors for a given document.
 * @param docId - The ID of the document.
 * @returns A promise that resolves to an array of contributors names 
 */
export const getAllContributorsForDoc = async (docId: string) => {
  const doc = await db.document.findUnique({
    where: { id: docId },
    select: { collaborators: true, ownerId: true },
  });

  if (!doc) {
    return { error: "Document does not exist!" };
  }

  const contributors = await db.user.findMany({
    where: { id: { in: doc.collaborators } },
    select: { name: true },
  });

  return contributors;
}