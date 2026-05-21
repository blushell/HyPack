# Banned usernames

Edit `banned-usernames.txt` to block usernames at sign-up. Matching is **case-insensitive** and exact (e.g. `Admin` blocks `admin`).

## How it works (no webhooks)

1. After sign-up, users are sent to `/sign-up/complete`, which checks their username and removes the account if it is banned.
2. Protected modpack routes also check the username on each visit (covers OAuth sign-up and username changes).

Banned users are redirected to `/sign-up?error=banned_username` with an error message.

## Optional API

`POST /api/auth/check-username` with `{ "username": "example" }` returns `{ "allowed": true }` or `403` if banned. Use this if you add a custom sign-up form later.
