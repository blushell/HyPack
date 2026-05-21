type SignUpBannedMessageProps = {
  error?: string;
};

export function SignUpBannedMessage({ error }: SignUpBannedMessageProps) {
  if (error !== "banned_username") {
    return null;
  }

  return (
    <p
      role="alert"
      className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
    >
      That username is not available. Choose a different one to continue.
    </p>
  );
}
