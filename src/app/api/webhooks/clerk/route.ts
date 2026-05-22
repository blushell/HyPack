import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { rejectBlacklistedUser } from "@/lib/auth/reject-blacklisted-user";

export async function POST(req: NextRequest) {
  let event;

  try {
    event = await verifyWebhook(req);
  } catch {
    return new Response("Webhook verification failed", { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    await rejectBlacklistedUser(event.data.id, event.data.username, null);
  }

  return new Response("OK", { status: 200 });
}
