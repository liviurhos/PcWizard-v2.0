import { create } from "zustand";
import { Component, Build, Country } from "@/types";

interface State {
  country: Country;
  setCountry: (c: Country) => void;
  currentBuild: Partial<Build>;
  setComponent: (cat: keyof Build, comp: Component | null) => void;
  clearBuild: () => void;
  user: any;
  setUser: (u: any) => void;
  savedBuilds: Build[];
  setSavedBuilds: (b: Build[]) => void;
}

export const useStore = create<State>((set) => ({
  country: "RO",
  setCountry: (country) => set({ country }),
  currentBuild: { country: "RO" },
  setComponent: (category, component) =>
    set((s) => ({
      currentBuild: { ...s.currentBuild, [category]: component },
    })),
  clearBuild: () => set({ currentBuild: { country: "RO" } }),
  user: null,
  setUser: (user) => set({ user }),
  savedBuilds: [],
  setSavedBuilds: (savedBuilds) => set({ savedBuilds }),
}));