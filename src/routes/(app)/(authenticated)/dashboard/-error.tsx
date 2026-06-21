import { useRouter } from "@tanstack/react-router";

export function RouteError() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">
          An unexpected error occurred
        </p>
        <button
          onClick={() => router.invalidate()}
          className="mt-4 text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
