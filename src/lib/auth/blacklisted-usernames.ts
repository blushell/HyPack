import fs from "fs";
import path from "path";

const blacklistedUsernamesPath = path.join(
  process.cwd(),
  "config/blacklisted-usernames.txt",
);

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function loadBlacklistedUsernames(): Set<string> {
  if (!fs.existsSync(blacklistedUsernamesPath)) {
    return new Set();
  }

  const lines = fs
    .readFileSync(blacklistedUsernamesPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map(normalizeUsername);

  return new Set(lines);
}

export function isUsernameBlacklisted(username: string | null | undefined) {
  if (!username?.trim()) {
    return false;
  }

  return loadBlacklistedUsernames().has(normalizeUsername(username));
}

export function getBlacklistedUsernames() {
  return [...loadBlacklistedUsernames()].sort();
}
