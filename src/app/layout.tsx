import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers"; // ✅ import SessionProvider wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HostelHub - Management System",
  description: "Modern hostel management dashboard",
  icons: {
    icon: "/new-logo.png",
    shortcut: "/new-logo.png",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
