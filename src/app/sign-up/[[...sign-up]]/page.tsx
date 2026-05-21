import { SignUp } from "@clerk/nextjs";
import { SignUpBannedMessage } from "@/components/auth/sign-up-banned-message";
import { Logo } from "@/components/layout/logo";
import { clerkAppearance } from "@/lib/clerk-appearance";

type SignUpPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-full flex-col bg-[#080808]">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <Logo height={56} />
      </div>

      <div className="hypack-clerk flex flex-1 flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <SignUpBannedMessage error={error} />
        </div>
        <SignUp
          appearance={clerkAppearance}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/sign-up/complete"
          fallbackRedirectUrl="/sign-up/complete"
        />
      </div>
    </div>
  );
}
