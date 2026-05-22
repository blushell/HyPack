# Blacklisted usernames

Edit `blacklisted-usernames.txt` to block usernames at sign-up. Matching is **case-insensitive** and **exact** (e.g. `admin` blocks `admin`, not `myadmin`).

## Clerk webhook (required)

Enforcement runs server-side via `POST /api/webhooks/clerk` when Clerk sends events.

1. [Clerk Dashboard → Webhooks](https://dashboard.clerk.com/) → add endpoint:
   - Local dev: use [ngrok](https://ngrok.com/) or similar → `https://<tunnel>/api/webhooks/clerk`
   - Production: `https://www.hypack.ca/api/webhooks/clerk`
2. Subscribe to **user.created** and **user.updated**
3. Copy the **Signing secret** into `.env` as `CLERK_WEBHOOK_SIGNING_SECRET`
4. Redeploy / restart dev server after adding the secret

When a blacklisted username is detected, HyPack revokes sessions and deletes the Clerk user.

## Sign-up flow

After Clerk sign-up, users hit `/sign-up/complete`, which verifies the account still exists and the username is allowed before sending them to `/modpacks`. If the webhook already removed the account, they see an error on `/sign-up`.

## Optional API

`POST /api/auth/check-username` with `{ "username": "example" }` returns `{ "allowed": true }` or `403` if blacklisted.
