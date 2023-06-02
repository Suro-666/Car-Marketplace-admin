import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAdminStore = create(
  persist(
    (set) => ({
      adminData: null,
      setAdminData: (dataObject) => set({ adminData: dataObject }),
      logOut: () => set({ adminData: null }),
    }),
    {
      name: "adminData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
