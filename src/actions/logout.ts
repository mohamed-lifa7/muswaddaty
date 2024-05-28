"use server";

import { signOut } from "@/server/auth";

/**
 * Logs out the user.
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 */
export const logout = async () => {
  await signOut();
};
