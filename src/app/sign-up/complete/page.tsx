import { enforceAllowedUsername } from "@/lib/auth/enforce-allowed-username";
import { redirect } from "next/navigation";

export default async function SignUpCompletePage() {
  await enforceAllowedUsername();
  redirect("/modpacks");
}
