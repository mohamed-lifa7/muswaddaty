import { db } from "@/server/db";

/**
 * Retrieves a verification token by its token value.
 * @param {string} token - The token value to search for.
 * @returns {Promise<object|null>} - A promise that resolves to the found verification token, or null if not found.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the verification token associated with the given email.
 * @param email - The email address to search for.
 * @returns The verification token if found, or null if not found.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
