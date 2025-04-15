"use client";

import { QueryProvider } from "@/lib/react-query";
import "./globals.css";
import { UserProvider } from "@/Contexts/UserContext";
import { PortfolioProvider } from "@/Contexts/PortfolioContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen">
        <QueryProvider>
          <UserProvider>
            <PortfolioProvider>
              <main className="flex-1 p-4 overflow-y-auto">{children}</main>
            </PortfolioProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
