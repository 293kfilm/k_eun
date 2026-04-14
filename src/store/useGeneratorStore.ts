'use client';
import { create } from 'zustand';
import type { GeneratedResult } from '@/types';

interface CutItem {
  id: string;
  text: string;
  params?: Record<string, string | number>;
}

interface GeneratorState {
  toolId: string;
  styleId: string;
  cuts: CutItem[];
  results: GeneratedResult[];
  isGenerating: boolean;
  globalParams: Record<string, string | number>;
  setToolId: (id: string) => void;
  setStyleId: (id: string) => void;
  setCuts: (cuts: CutItem[]) => void;
  addCut: () => void;
  removeCut: (id: string) => void;
  updateCutText: (id: string, text: string) => void;
  reorderCuts: (fromIndex: number, toIndex: number) => void;
  setResults: (results: GeneratedResult[]) => void;
  setIsGenerating: (v: boolean) => void;
  setGlobalParam: (key: string, value: string | number) => void;
  setGlobalParams: (params: Record<string, string | number>) => void;
  reset: () => void;
}

let nextId = 1;
const makeId = () => `cut-${nextId++}`;

export const useGeneratorStore = create<GeneratorState>((set) => ({
  toolId: 'kling',
  styleId: '',
  cuts: [{ id: makeId(), text: '' }],
  results: [],
  isGenerating: false,
  globalParams: {},
  setToolId: (toolId) => set({ toolId }),
  setStyleId: (styleId) => set({ styleId }),
  setCuts: (cuts) => set({ cuts }),
  addCut: () =>
    set((state) => ({
      cuts: state.cuts.length < 20 ? [...state.cuts, { id: makeId(), text: '' }] : state.cuts,
    })),
  removeCut: (id) =>
    set((state) => ({
      cuts: state.cuts.length > 1 ? state.cuts.filter((c) => c.id !== id) : state.cuts,
    })),
  updateCutText: (id, text) =>
    set((state) => ({
      cuts: state.cuts.map((c) => (c.id === id ? { ...c, text } : c)),
    })),
  reorderCuts: (fromIndex, toIndex) =>
    set((state) => {
      const newCuts = [...state.cuts];
      const [removed] = newCuts.splice(fromIndex, 1);
      newCuts.splice(toIndex, 0, removed);
      return { cuts: newCuts };
    }),
  setResults: (results) => set({ results }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGlobalParam: (key, value) =>
    set((state) => ({
      globalParams: { ...state.globalParams, [key]: value },
    })),
  setGlobalParams: (globalParams) => set({ globalParams }),
  reset: () =>
    set({
      cuts: [{ id: makeId(), text: '' }],
      results: [],
      isGenerating: false,
    }),
}));
