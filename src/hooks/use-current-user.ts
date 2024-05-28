import { useSession } from "next-auth/react";

/**
 * Custom hook to get the current user from the session.
 * @returns The current user object if available, otherwise undefined.
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
