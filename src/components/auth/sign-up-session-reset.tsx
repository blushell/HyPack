"use client";

import { useAuth, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type SignUpSessionResetProps = {
  error?: string;
  children: React.ReactNode;
};

export function SignUpSessionReset({ error, children }: SignUpSessionResetProps) {
  const { isSignedIn } = useAuth();
  const { signOut, loaded } = useClerk();
  const [sessionCleared, setSessionCleared] = useState(
    error !== "blacklisted_username",
  );

  useEffect(() => {
    if (!loaded || error !== "blacklisted_username") {
      return;
    }

    if (!isSignedIn) {
      setSessionCleared(true);
      return;
    }

    void signOut({ redirectUrl: "/sign-up?error=blacklisted_username" }).finally(
      () => {
        setSessionCleared(true);
      },
    );
  }, [error, isSignedIn, loaded, signOut]);

  if (!sessionCleared) {
    return (
      <p className="text-center text-sm text-zinc-400">Preparing sign-up…</p>
    );
  }

  return <>{children}</>;
}
