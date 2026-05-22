type AuthErrorMessageProps = {
  error?: string;
};

const messages: Record<string, string> = {
  blacklisted_username:
    "That username is not available. Choose a different one to continue.",
};

export function AuthErrorMessage({ error }: AuthErrorMessageProps) {
  const message = error ? messages[error] : null;

  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
    >
      {message}
    </p>
  );
}
