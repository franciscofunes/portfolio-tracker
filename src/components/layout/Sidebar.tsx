"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ActivitySquare,
  BarChart3,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Trades",
    href: "/trades",
    icon: ActivitySquare,
  },
  {
    title: "Charts",
    href: "/charts",
    icon: BarChart3,
  },
  {
    title: "Exit",
    href: "/",
    icon: LogOut,
    variant: "destructive"
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <div className="flex flex-col h-full">
        <div className="py-6 px-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <div>
              <h2 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-xl tracking-tight">TradeForge</h2>
              <p className="text-xs text-gray-500 -mt-1">Master your investments</p>
            </div>
          </div>
        </div>
        
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href
            const isExit = item.title === "Exit"
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ 
                    variant: isExit 
                      ? "ghost" 
                      : isActive 
                        ? "secondary" 
                        : "ghost" 
                  }),
                  "justify-start text-base w-full",
                  isExit ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 mt-auto" : "",
                  isActive && !isExit ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:hover:bg-indigo-950/30" : ""
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}