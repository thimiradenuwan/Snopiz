import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
            <div className="max-w-2xl text-center">
                <p className="text-blue-500 font-semibold uppercase tracking-widest mb-4">
                    Error 404
                </p>

                <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
                    Page Not Found
                </h1>

                <p className="text-gray-400 text-lg mb-10">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Go Home
                    </Link>

                    <Link
                        href="/shop"
                        className="px-6 py-3 rounded-xl border border-gray-700 hover:border-blue-500 transition"
                    >
                        Browse Products
                    </Link>
                </div>

                <div className="mt-16 text-gray-600 text-sm">
                    © {new Date().getFullYear()} Snopiz. All rights reserved.
                </div>
            </div>
        </main>
    );
}