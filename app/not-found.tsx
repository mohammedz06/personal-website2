import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-start justify-center px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">404</p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 border border-foreground px-5 py-2.5 text-sm tracking-wide text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
      >
        Back to Home
      </Link>
    </div>
  );
}
