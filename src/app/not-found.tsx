import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="text-primary font-semibold uppercase tracking-widest mb-4 text-sm">
          Error 404
        </div>
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
          Page Not Found
        </h1>
        <p className="text-secondary-foreground text-lg mb-10 max-w-md mx-auto">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors shadow-[0_4px_20px_rgba(0,122,255,0.3)]"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full border border-border/70 text-foreground hover:bg-secondary/60 transition-colors font-medium"
          >
            Browse Products
          </Link>
        </div>
        <div className="mt-16 text-muted-foreground text-sm">
          © {new Date().getFullYear()} Snopiz. All rights reserved.
        </div>
      </div>
    </main>
  )
}