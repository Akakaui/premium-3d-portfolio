'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Zap, Shield, Cpu } from 'lucide-react'

interface ProjectDetailsProps {
  project: any | null
  onClose: () => void
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-white/40 backdrop-blur-md pointer-events-auto"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row h-full max-h-[80vh] border border-[#D2D2D7]"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-[#F5F5F7] rounded-full hover:bg-[#E8E8ED] transition-colors z-20"
          >
            <X className="w-6 h-6 text-[#1D1D1F]" />
          </button>

          {/* Left Side: Visual/Media */}
          <div className="w-full md:w-1/2 bg-[#F5F5F7] flex items-center justify-center p-8">
            <div className="w-full aspect-video bg-white rounded-2xl shadow-sm border border-[#D2D2D7] overflow-hidden flex items-center justify-center text-[#86868B]">
              {/* Image would go here */}
              <img 
                src={project.image || "https://placehold.co/600x400/F5F5F7/86868B?text=Project+Visual"} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Information */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-[#E8E8FF] text-[#007AFF] text-xs font-bold mb-4 uppercase tracking-wider">
              Product Case Study
            </div>
            <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
            <p className="text-lg text-[#86868B] mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Technical Chips */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 py-1 rounded-md bg-[#F5F5F7] text-[#1D1D1F] text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>

            {/* Metrics/Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {Object.entries(project.metrics).map(([key, value]: [string, any]) => (
                <div key={key} className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#D2D2D7]/50 flex flex-col gap-1">
                  <div className="text-[10px] text-[#86868B] uppercase font-bold tracking-widest">{key}</div>
                  <div className="text-xl font-bold text-[#1D1D1F]">{value}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {project.links.live && (
                <a 
                  href={project.links.live}
                  target="_blank"
                  className="flex-1 py-4 bg-[#007AFF] text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#0071E3] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
              <a 
                href={project.links.github}
                target="_blank"
                className="flex-1 py-4 bg-[#F5F5F7] text-[#1D1D1F] rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#E8E8ED] transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
