'use client'

import { useBlueprint } from '@/hooks/useBlueprint'
import { Layout, Codepen } from 'lucide-react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function BlueprintToggle() {
  const { isBlueprint, toggleBlueprint } = useBlueprint()

  return (
    <div className="fixed top-6 right-6 z-50">
      <button 
        onClick={toggleBlueprint}
        className={cn(
          "relative flex items-center gap-3 p-1 rounded-full transition-all duration-500",
          isBlueprint ? "bg-[#1D1D1F]" : "bg-[#F5F5F7] shadow-sm border border-[#D2D2D7]"
        )}
      >
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-500",
          !isBlueprint ? "bg-white text-[#1D1D1F] shadow-sm" : "text-[#86868B]"
        )}>
          <Layout className="w-4 h-4" />
          Premium
        </div>
        
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-500",
          isBlueprint ? "bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/20" : "text-[#86868B]"
        )}>
          <Codepen className="w-4 h-4" />
          Blueprint
        </div>

        {/* Indicator */}
        <motion.div 
          className="absolute inset-y-1 w-[calc(50%-4px)] bg-transparent pointer-events-none rounded-full"
          animate={{ x: isBlueprint ? '100%' : '0%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </button>
    </div>
  )
}
