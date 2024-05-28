import { useSession } from "next-auth/react";

/**
 * Custom hook to get the current role of the user.
 * @returns The current role of the user, or undefined if the user is not logged in.
 */
export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};
