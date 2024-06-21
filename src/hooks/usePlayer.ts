'use client'

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface usePlayerToggleStore {
  ids: number[];
  isOpen: boolean;
  setIsOpen: () => void;
  activeId?: number
  setId: (id: number) => void;
  setIds: (ids: number[]) => void;
  reset: () => void;
}

export const usePlayerToggle = create(
  persist<usePlayerToggleStore>(
    (set, get) => ({
      ids: [],
      activeId: undefined,
      isOpen: false,
      setId: (id: number) => set({ activeId: id }),
      setIds: (ids: number[]) => set({ ids }),
      setIsOpen: () => {
        set({ isOpen: !get().isOpen });
      },
      reset: () => set({ ids: [], activeId: undefined }),
    }),
    {
      name: 'playerOpen',
      storage: createJSONStorage(() => localStorage)
    }
  )
);