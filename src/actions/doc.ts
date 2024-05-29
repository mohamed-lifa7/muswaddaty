"use server";

import type * as z from "zod";

import { db } from "@/server/db";
import { NewDocument } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/server/auth";
import { UserRole } from "@prisma/client";

/**
 * Adds a new document to the database.
 *
 * @param values - The values for the new document.
 * @returns An object with either an error message if the fields are invalid or the user has exceeded the document limit, or a success message and the ID of the created document.
 */
export const addNewDoc = async (values: z.infer<typeof NewDocument>) => {
  const validatedFields = NewDocument.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, ownerId } = validatedFields.data;

  // Check the number of documents already owned by the user
  const docCount = await db.document.count({
    where: { ownerId },
  });

  if (docCount >= 3) {
    return { error: "User cannot create more than three documents!" };
  }

  const doc = await db.document.create({
    data: {
      title,
      ownerId,
      body: "",
    },
  });

  return { success: "Document has been created successfully!", id: doc.id };
};

/**
 * Add a new collaborator to a document.
 * @param docId - The ID of the document.
 * @param userId - The ID of the user to add.
 * @returns A promise that resolves to the updated document or an error message.
 */
export const addCollaborator = async ({
  docId,
  userId,
}: {
  docId: string;
  userId: string;
}) => {
  const existingUser = await getUserById(userId);
  const user = await currentUser();
  if (!existingUser) {
    return { error: "User does not exist!" };
  }

  if (!user) {
    return { error: "You must be logged in!" };
  }

  const doc = await db.document.findUnique({
    where: { id: docId },
    select: { collaborators: true, ownerId: true },
  });

  if (!doc) {
    return { error: "Document does not exist!" };
  }

  if (doc.ownerId === userId) {
    return { error: "You can't add yourself as a collaborator!" };
  }

  if (doc.ownerId !== user.id) {
    return { error: "You are not the owner of this document!" };
  }

  if (doc.collaborators.includes(userId)) {
    return { error: "User is already a collaborator!" };
  }

  if (doc.collaborators.length >= 3) {
    return { error: "Document can have at most 3 collaborators!" };
  }

  const updatedDoc = await db.document.update({
    where: { id: docId },
    data: {
      collaborators: {
        push: userId,
      },
    },
  });

  return { success: "User added as a collaborator!", doc: updatedDoc };
};

/**
 * Deletes a document with the specified ID.
 *
 * @param docId - The ID of the document to delete.
 * @returns An object indicating the result of the deletion operation.
 *          - If the document does not exist, the object will have an `error` property with the value "Document does not exist!".
 *          - If the current user is not the owner of the document, the object will have an `error` property with the value "You are not the owner of this document!".
 *          - If the document is successfully deleted, the object will have a `success` property with the value "Document has been deleted!".
 */
export const deleteDoc = async (docId: string) => {
  const doc = await db.document.findUnique({
    where: { id: docId },
  });

  if (!doc) {
    return { error: "Document does not exist!" };
  }

  const user = await currentUser();

  if (doc.ownerId !== user?.id) {
    return { error: "You are not the owner of this document!" };
  }

  await db.document.delete({
    where: { id: docId },
  });

  return { success: "Document has been deleted!" };
};

/**
 * Deletes a document with the specified ID.
 *
 * @param docId - The ID of the document to delete.
 * @returns An object indicating the result of the deletion operation.
 */
export const deleteDocWithAdmin = async (docId: string) => {
  try {
    const doc = await db.document.findUnique({
      where: { id: docId },
    });

    if (!doc) {
      return { error: "Document does not exist!" };
    }

    const user = await currentUser();

    if (!user) {
      return { error: "No current user found." };
    }

    if (user.role !== UserRole.ADMIN) {
      return { error: "You do not have permission to delete this document!" };
    }

    await db.document.delete({
      where: { id: docId },
    });

    return { success: "Document has been deleted!" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { error: "An error occurred while deleting the document." };
  }
};
