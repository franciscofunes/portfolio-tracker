'use client'

import { Button } from "@/components/ui/button"
import { MobileNavigationProps } from "@/types/ui/MobileNavigationProps"
import { LayoutDashboard, LogOut, BarChart4, Activity, Plus, X, Briefcase, LineChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"


export default function MobileNavigation({ setTradeDialogOpen, setPortfolioDialogOpen }: MobileNavigationProps) {
  const pathname = usePathname()
  const [fabOpen, setFabOpen] = useState(false)
  
  const handleTradeClick = () => {
    setFabOpen(false)
    setTradeDialogOpen(true)
  }
  
  const handlePortfolioClick = () => {
    setFabOpen(false)
    setPortfolioDialogOpen(true)
  }
  
  return (
    <>
      {fabOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setFabOpen(false)}
        />
      )}
      
      <div className="md:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        {fabOpen && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-3 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex flex-col gap-3">
              <Button 
                variant="outline" 
                className="flex gap-2 w-40 justify-start border-dashed"
                onClick={handlePortfolioClick}
              >
                <Briefcase className="h-4 w-4 text-indigo-500" />
                <span>New Portfolio</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex gap-2 w-40 justify-start border-dashed"
                onClick={handleTradeClick}
              >
                <LineChart className="h-4 w-4 text-indigo-500" />
                <span>New Trade</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex items-center justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center px-3 py-2">
            <div className={`rounded-full p-1 ${
              pathname === '/dashboard' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${
              pathname === '/dashboard' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Home
            </span>
          </Link>
          
          <Link href="/trades" className="flex flex-col items-center px-3 py-2">
            <div className={`rounded-full p-1 ${
              pathname === '/trades' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              <Activity className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${
              pathname === '/trades' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Trades
            </span>
          </Link>
          
          <div className="flex flex-col items-center -mt-5">
            <Button 
              size="icon" 
              className={`h-12 w-12 rounded-full shadow-lg transition-colors ${
                fabOpen 
                  ? 'bg-gray-200 dark:bg-gray-700' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              onClick={() => setFabOpen(!fabOpen)}
            >
              {fabOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Plus className="h-6 w-6 text-white" />
              )}
            </Button>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {fabOpen ? 'Close' : 'Add'}
            </span>
          </div>
          
          <Link href="/charts" className="flex flex-col items-center px-3 py-2">
            <div className={`rounded-full p-1 ${
              pathname === '/charts' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              <BarChart4 className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${
              pathname === '/charts' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Charts
            </span>
          </Link>
          
          <Link href="/" className="flex flex-col items-center px-3 py-2">
            <div className={`rounded-full p-1 ${
              pathname === '/' 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              <LogOut className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 ${
              pathname === '/' 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              Exit
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}