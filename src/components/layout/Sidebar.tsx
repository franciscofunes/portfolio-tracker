"use client"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  LogOutIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Exit",
    href: "/",
    icon: LogOutIcon,
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <nav className="flex flex-col gap-2 p-4">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: isActive ? "default" : "ghost" }),
                "justify-start w-full"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
