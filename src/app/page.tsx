"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center gap-6 px-4">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Welcome to <span className="text-blue-600">Portfolio Tracker</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Easily manage your portfolios, log trades, and track your PnL with
          powerful visuals.
        </p>
      </div>

      <Button
        className="mt-6 px-6 py-3 text-base font-medium cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Get Started
      </Button>
    </main>
  );
}
