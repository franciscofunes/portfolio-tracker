"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import React from "react";

export default function NotFound(): React.ReactNode {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        <div className="flex items-center gap-2 justify-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
          <div>
            <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-xl tracking-tight">TradeForge</h2>
          </div>
        </div>
        
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Page not found
        </h2>
        
        <div className="w-16 h-1 mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        
        <p className="text-gray-600 dark:text-gray-400">
          Looks like we couldn't find the investment opportunity you were looking for.
          The chart pattern suggests a return to the homepage.
        </p>
        
        {/* Chart line illustration */}
        <div className="my-8 relative h-16 mx-auto w-48">
          <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0,30 Q20,10 40,40 Q60,70 80,30 Q100,-10 120,20 Q140,50 160,20 Q180,-10 200,30" 
              stroke="url(#gradient)" 
              strokeWidth="2" 
              fill="none"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute right-0 top-[30px] h-3 w-3 rounded-full bg-purple-500 animate-ping" />
        </div>
        
        <Link href="/dashboard">
          <Button className="mt-4 px-6 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}