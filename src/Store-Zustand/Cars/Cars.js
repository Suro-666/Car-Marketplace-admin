import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useCarsStore = create(
  immer((set) => ({
    carsData: null,
    setCarsData: (carsDb) =>
      set((state) => {
        state.carsData = carsDb;
      }),
  }))
);
