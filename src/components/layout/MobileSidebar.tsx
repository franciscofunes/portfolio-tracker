'use client'

import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from 'react'

export default function MobileSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 bg-white dark:bg-slate-800 h-full w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        
        <nav className="flex flex-col p-4 space-y-4">          
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md"
            >
              <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              onClick={() => setSidebarOpen(false)}
               href="/"
              className="flex items-center gap-2 text-gray-800 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-md w-full text-left mt-2"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span>Exit</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}