import { db } from "@/server/db";

export const getDocById = async (id: string) => {
  try {
    const doc = await db.document.findUnique({ where: { id } });

    return doc;
  } catch {
    return null;
  }
};