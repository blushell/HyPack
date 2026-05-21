import { isUsernameBanned } from "@/lib/auth/banned-usernames";

type CheckUsernameBody = {
  username?: string;
};

export async function POST(req: Request) {
  let body: CheckUsernameBody;

  try {
    body = (await req.json()) as CheckUsernameBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = body.username?.trim();
  if (!username) {
    return Response.json({ error: "Username is required." }, { status: 400 });
  }

  if (isUsernameBanned(username)) {
    return Response.json(
      {
        allowed: false,
        error: "This username is not available.",
      },
      { status: 403 },
    );
  }

  return Response.json({ allowed: true });
}
