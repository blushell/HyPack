import { ensureSignupAllowed } from "@/lib/auth/enforce-allowed-username";
import { redirect } from "next/navigation";

export default async function SignUpCompletePage() {
  await ensureSignupAllowed();
  redirect("/modpacks");
}
