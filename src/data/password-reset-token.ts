import { db } from "@/server/db";

/**
 * Retrieves a password reset token by its token value.
 * @param {string} token - The token value to search for.
 * @returns {Promise<object|null>} - A promise that resolves to the password reset token object if found, or null if not found.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the password reset token associated with the given email.
 * @param email - The email address to search for.
 * @returns The password reset token, or null if not found.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
