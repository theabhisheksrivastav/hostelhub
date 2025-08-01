// app/layout.tsx
import "@/app/globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Providers from "./providers";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen text-gray-900 bg-white">
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-6 py-10">
            {children}
          </main>
          {/* Optional: Add Footer here */}
        </Providers>
      </body>
    </html>
  );
}
