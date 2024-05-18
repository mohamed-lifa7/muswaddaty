import { env } from "@/env";
import { currentUser } from "@/server/auth";
import { Liveblocks } from "@liveblocks/node";
import type { NextRequest } from "next/server";
/**
 *  Authenticating your Liveblocks application
 *  https://liveblocks.io/docs/authentication
 */
const liveblocks = new Liveblocks({ secret: env.LIVEBLOCKS_SECRET_KEY });

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userId = user.id;
  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: {
      name: user.name!,
      color: user.color,
    },
  });
  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`liveblocks:muswaddaty:*`, session.FULL_ACCESS);
  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
