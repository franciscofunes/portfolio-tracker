'use client'

import { Button } from "@/components/ui/button"
import { 
  Plus, 
  Briefcase, 
  LineChart, 
  X 
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="md:hidden fixed z-50">
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
        {isOpen && (
          <>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
              <div className="flex flex-col gap-3">
                <Link href="/add-portfolio" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="flex gap-2 w-40 justify-start border-dashed"
                  >
                    <Briefcase className="h-4 w-4 text-indigo-500" />
                    <span>New Portfolio</span>
                  </Button>
                </Link>
                
                <Link href="/add-trade" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="flex gap-2 w-40 justify-start border-dashed"
                  >
                    <LineChart className="h-4 w-4 text-indigo-500" />
                    <span>New Trade</span>
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}