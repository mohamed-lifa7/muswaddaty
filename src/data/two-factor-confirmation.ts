import { db } from "@/server/db";

/**
 * Retrieves the two-factor confirmation record for a given user ID.
 * @param userId - The ID of the user.
 * @returns The two-factor confirmation record if found, or null if not found.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
