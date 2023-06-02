import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useAdminStore } from "../../Store-Zustand/Admin/Admin";

const controller = () => {
  const { adminData, setAdminData } = useAdminStore();
  async function onLogin(_value) {
    try {
      const adminDoc = await signInWithEmailAndPassword(auth, _value.email, _value.password).then(
        ({ user }) => user
      );
      const admin = await getDoc(doc(db, "users", adminDoc.uid)).then((data) => data.data());
      if (admin.role === "ADMIN") {
        await setAdminData({
          accessToken: admin.accessToken,
          role: admin.role,
          email: admin.email,
        });
        window.location.href = "/dashboard/users";
      } else {
        alert("You are not admin");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return { adminData, onLogin };
};

export default controller;
