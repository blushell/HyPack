import fs from "fs";
import path from "path";

const bannedUsernamesPath = path.join(
  process.cwd(),
  "config/banned-usernames.txt",
);

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function loadBannedUsernames(): Set<string> {
  if (!fs.existsSync(bannedUsernamesPath)) {
    return new Set();
  }

  const lines = fs
    .readFileSync(bannedUsernamesPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map(normalizeUsername);

  return new Set(lines);
}

export function isUsernameBanned(username: string | null | undefined) {
  if (!username?.trim()) {
    return false;
  }

  return loadBannedUsernames().has(normalizeUsername(username));
}

export function getBannedUsernames() {
  return [...loadBannedUsernames()].sort();
}
