# Banned usernames

Edit `banned-usernames.txt` to block usernames at sign-up. Matching is **case-insensitive** and exact (e.g. `Admin` blocks `admin`).

## Clerk webhook (required)

Enforcement runs in `POST /api/webhooks/clerk` when Clerk sends `user.created` or `user.updated` events.

1. In [Clerk Dashboard → Webhooks](https://dashboard.clerk.com/), add an endpoint: `https://your-domain.com/api/webhooks/clerk`
2. Subscribe to **user.created** and **user.updated**
3. Copy the **Signing secret** into `.env` as `CLERK_WEBHOOK_SIGNING_SECRET`

New sign-ups with a banned username are deleted. Existing users who change to a banned username are banned.
