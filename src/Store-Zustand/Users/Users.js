import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useUsersStore = create(
  immer((set) => ({
    usersData: [],
    setUsers: (usersDb) =>
      set((state) => {
        state.usersData = usersDb;
      }),
  }))
);
