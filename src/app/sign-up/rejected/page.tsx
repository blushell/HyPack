"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";

export default function SignUpRejectedPage() {
  const { signOut, loaded } = useClerk();
  const [message, setMessage] = useState("Signing you out…");

  useEffect(() => {
    if (!loaded) {
      return;
    }

    void signOut({ redirectUrl: "/sign-up?error=blacklisted_username" }).catch(
      () => {
        setMessage("Redirecting…");
        window.location.href = "/sign-up?error=blacklisted_username";
      },
    );
  }, [loaded, signOut]);

  return (
    <div className="flex min-h-full flex-col bg-[#080808]">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Logo height={56} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <p className="text-sm text-zinc-400">{message}</p>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          That username is not available. You can choose a different one on the
          sign-up page.
        </p>
      </div>
    </div>
  );
}
