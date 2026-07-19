import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ThemeProvider } from "@/components/theme-provider";
import { CartSync } from "@/components/cart/CartSync";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CartItem } from "@/store/cartStore";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snopiz | Premium E-Commerce",
  description: "Luxury digital products and small fantastic items.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let dbCartItems: CartItem[] = [];

  if (session?.user?.id) {
    const dbItems = await prisma.cartItem.findMany({
      where: {
        cart: {
          userId: session.user.id,
        },
      },
      include: {
        product: {
          include: {
            images: {
              take: 1,
            },
          },
        },
      },
    });

    dbCartItems = dbItems.map((item) => ({
      id: item.productId,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0]?.image ?? "",
    }));
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {session?.user && <CartSync dbItems={dbCartItems} />}

          <Navbar session={session} />

          <main className="flex-1 mt-24">
            <Breadcrumb />
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}