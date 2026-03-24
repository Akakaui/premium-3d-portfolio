'use client'

import { create } from 'zustand'

interface BlueprintState {
  isBlueprint: boolean
  toggleBlueprint: () => void
}

export const useBlueprint = create<BlueprintState>((set) => ({
  isBlueprint: false,
  toggleBlueprint: () => set((state) => ({ isBlueprint: !state.isBlueprint })),
}))
