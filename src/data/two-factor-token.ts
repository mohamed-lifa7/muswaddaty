import { db } from "@/server/db";

/**
 * Retrieves a two-factor token by its token value.
 * @param token - The token value to search for.
 * @returns The two-factor token object if found, or null if not found.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves the two-factor authentication token associated with the given email.
 * @param email - The email address to search for.
 * @returns The two-factor authentication token if found, or null if not found.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
