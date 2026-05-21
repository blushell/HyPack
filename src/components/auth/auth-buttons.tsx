"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Heart, Package, User } from "lucide-react";
import { clerkAppearance } from "@/lib/clerk-appearance";

export function AuthButtons() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="redirect">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-500/15"
          >
            <User className="h-4 w-4" />
            Sign in
          </button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton
          appearance={{
            ...clerkAppearance,
            elements: {
              ...clerkAppearance.elements,
              avatarBox: "h-9 w-9",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Link
              label="My modpacks"
              labelIcon={<Package className="h-4 w-4" />}
              href="/modpacks"
            />
            <UserButton.Link
              label="My likes"
              labelIcon={<Heart className="h-4 w-4" />}
              href="/modpacks/likes"
            />
            <UserButton.Action label="manageAccount" />
            <UserButton.Action label="signOut" />
          </UserButton.MenuItems>
        </UserButton>
      </Show>
    </>
  );
}
