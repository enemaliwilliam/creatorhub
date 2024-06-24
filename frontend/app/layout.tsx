import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreatorHub",
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
        <script defer data-domain="creatorhub.iamwille.com" src="https://plausible.io/js/script.js"></script>
      </body>
    </html>
  );
}
