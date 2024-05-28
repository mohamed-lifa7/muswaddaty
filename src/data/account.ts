import { db } from "@/server/db";

/**
 * Retrieves an account by user ID.
 * @param userId - The ID of the user.
 * @returns The account associated with the user ID, or null if not found.
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
