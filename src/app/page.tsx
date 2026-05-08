'use client'

import { useState } from 'react'
import Scene from '@/components/Scene'
import BlueprintToggle from '@/components/BlueprintToggle'
import ProjectDetails from '@/components/ProjectDetails'
import projects from '@/data/projects.json'
import { ArrowRight, Github, Mail, Linkedin } from 'lucide-react'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <main className="relative min-h-screen bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#007AFF] selection:text-white transition-colors duration-500">
      {/* 3D Scene Layer */}
      <Scene />

      {/* UI Content Layer */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F7] text-[#007AFF] text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]"></span>
          </span>
          Open for Product Engineering Roles
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          Designing the <span className="text-[#007AFF]">Engineering</span> <br className="hidden md:block" /> Experience.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-xl md:text-2xl text-[#86868B] mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both">
          I build high-performance, interactive product ecosystems. Focus on UX, architecture, and premium 3D interfaces.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 fill-mode-both">
          <button 
            onClick={() => setSelectedProject(projects[0])}
            className="group px-8 py-4 bg-[#007AFF] text-white rounded-full font-semibold flex items-center gap-2 hover:bg-[#0071E3] transition-all hover:scale-105"
          >
            Explore My Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-[#F5F5F7] text-[#1D1D1F] rounded-full font-semibold hover:bg-[#E8E8ED] transition-all">
            Get in Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="fixed bottom-12 left-6 right-6 md:left-auto flex gap-6 animate-in fade-in duration-1000">
          <a href="#" className="p-2 text-[#86868B] hover:text-[#007AFF] transition-colors"><Github className="w-6 h-6" /></a>
          <a href="#" className="p-2 text-[#86868B] hover:text-[#007AFF] transition-colors"><Linkedin className="w-6 h-6" /></a>
          <a href="#" className="p-2 text-[#86868B] hover:text-[#007AFF] transition-colors"><Mail className="w-6 h-6" /></a>
        </div>
      </div>

      <BlueprintToggle />

      <ProjectDetails 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  )
}
