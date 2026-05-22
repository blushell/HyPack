# Blacklisted usernames

Edit `blacklisted-usernames.txt` to block usernames at sign-up. Matching is **case-insensitive** and exact (e.g. `Admin` blocks `admin`).

## How it works

1. After sign-up, users visit `/sign-up/complete`, which checks their username and removes the account if it is blacklisted.
2. Protected modpack routes also check the username (covers OAuth sign-up and username changes).

Blocked users are signed out and sent to `/sign-up?error=blacklisted_username` (via `/sign-up/rejected` so the session is cleared first).

## Optional API

`POST /api/auth/check-username` with `{ "username": "example" }` returns `{ "allowed": true }` or `403` if blacklisted.
