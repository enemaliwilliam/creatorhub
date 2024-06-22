import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Encore + Next.js",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/meta", label: "Meta Demo" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = cookies().has("auth-token");

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <nav className={styles.nav}>
            <div className={styles.navLinks}>
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <SessionProvider>
          <main className={styles.main}>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
