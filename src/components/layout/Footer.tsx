import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-8 dark:bg-gray-950">
      <div className="container flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
            Portfolio Tracker
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {currentYear} Portfolio Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};