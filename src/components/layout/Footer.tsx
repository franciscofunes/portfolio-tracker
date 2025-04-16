import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-6 dark:bg-gray-950">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs">TF</span>
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
            TradeForge
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Master your investments with precision
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {currentYear} TradeForge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};