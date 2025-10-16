import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold">Welcome to KraftersLink</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create and manage your short links.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="rounded-full border border-solid transition-colors px-5 py-2 bg-foreground text-background font-medium"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full border border-solid transition-colors px-5 py-2 hover:bg-gray-100 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
