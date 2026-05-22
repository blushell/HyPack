import { clerkMiddleware, clerkClient, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { blacklistedUsernameRejectedPath } from "@/lib/auth/enforce-allowed-username";
import { rejectBlacklistedUser } from "@/lib/auth/reject-blacklisted-user";

const isProtectedRoute = createRouteMatcher([
  "/modpacks",
  "/modpacks/new",
  "/modpacks/likes",
  "/modpacks/(.*)/settings",
  "/modpacks/(.*)/edit",
]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();

  if (authObject.userId && isProtectedRoute(req)) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(authObject.userId);
      const wasRejected = await rejectBlacklistedUser(
        authObject.userId,
        user.username,
        authObject.sessionId,
      );

      if (wasRejected) {
        return NextResponse.redirect(
          new URL(blacklistedUsernameRejectedPath, req.url),
        );
      }
    } catch (error) {
      console.error("Blacklisted username check failed:", error);
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
