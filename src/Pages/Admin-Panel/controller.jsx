import { useAdminStore } from "../../Store-Zustand/Admin/Admin";

export const controller = () => {
  const { logOut } = useAdminStore();
  async function onLogOut() {
    try {
      await logOut();
    } catch (error) {
      console.error(error.message);
    }
  }
  return { onLogOut };
};
