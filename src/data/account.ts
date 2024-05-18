import { db } from "@/server/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    });

    return account;
  } catch {
    return null;
  }
};
