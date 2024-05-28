"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificiation-token";

/**
 * Verifies the email address associated with a given token.
 * @param token - The verification token.
 * @returns An object indicating the result of the verification process.
 *          If successful, it returns { success: "Email verified!" }.
 *          If the token does not exist, it returns { error: "Token does not exist!" }.
 *          If the token has expired, it returns { error: "Token has expired!" }.
 *          If the email associated with the token does not exist, it returns { error: "Email does not exist!" }.
 */
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Email verified!" };
};
