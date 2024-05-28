import { create } from "zustand";
/**
 * Represents the features store.
 */
type FeaturesStore = {
  inViewFeature: number | null;
  setInViewFeature: (feature: number | null) => void;
};

/**
 * Custom hook for managing the feature store.
 *
 * @returns An object containing the feature store state and setter functions.
 */
export const useFeatureStore = create<FeaturesStore>((set) => ({
  inViewFeature: null,
  setInViewFeature: (feature: number | null) => set({ inViewFeature: feature }),
}));
