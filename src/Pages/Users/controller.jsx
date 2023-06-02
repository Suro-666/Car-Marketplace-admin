import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useUsersStore } from "../../Store-Zustand/Users/Users";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";

export const controller = () => {
  const { usersData, setUsers } = useUsersStore();
  const [loading, setLoading] = useState(false);
  const [bool,setBool] = useState(false)
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    setLoading(true);
    try {
      const usersQuery = query(collection(db, "users"));
      const usersDb = await getDocs(usersQuery).then((data) => data.docs);
      // firebase-n indz data uxakuma mihat zangvac DOC anunov vori mech gtnnvumen dataner voronc
      // data()-methody kancheluc heto nor stanumes datan dra hamar petqa cikl fral bolori vrayov
      // kanchel hertakanutyamb bolori data()-methodnery u stacvac ardyunqy pushel STATE-in
      let tmp = [];
      usersDb.forEach((data) => tmp.push(data.data()));
      setUsers(tmp);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteCarAddedByTheUser(carId) {
    try {
      await deleteDoc(doc(db, "cars", carId));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteUserFromDb(_userData) {
    try {
      setBool(true)
      if (_userData.role !== "ADMIN") {
        const currentUser = await signInWithEmailAndPassword(
          auth,
          _userData.email,
          _userData.password
        ).then(({ user }) => user);
        const carsQuery = query(collection(db, "cars"), where("addedByUser", "==", _userData.uid));
        const carsAddedByTheUser = await getDocs(carsQuery).then(({ docs }) => docs);
        for (let car of carsAddedByTheUser) {
          await deleteCarAddedByTheUser(car.id);
        }
        await deleteUser(currentUser);
        await deleteDoc(doc(db, "users", _userData.uid));
        setBool(false)
        getUsers();
      } else {
        alert("You do not have permission to remove the administrator");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const refreshPage = async () => {
    await getUsers()
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, data) => {
        return <div>{data.name.toUpperCase()}</div>;
      },
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      render: (_, data) => {
        return <div>{data.surname.toUpperCase()}</div>;
      },
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (_, data) => {
        return <span className="text-cyan-600 ">{data.email}</span>;
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, data) => {
        if (data.role === "ADMIN") {
          return (
            <span className="bg-[green] text-[12px] py-[2px] flex justify-center items-center rounded  ">
              {data.role}
            </span>
          );
        }

        return (
          <div className="bg-[orange] text-[12px] py-[2px] flex justify-center items-center rounded  ">
            {data.role}
          </div>
        );
      },
    },
    {
      align: "center",
      title: "U-ID",
      dataIndex: "uid",
      key: "uid",
    },
    {
      align: "center",
      title: "",
      dataIndex: "uid",
      key: "delete",
      render: (_, data) => {
        return (
          <DeleteOutlined
            className="text-[24px] hover:text-[red] duration-200 hover:scale-[1.1]"
            onClick={() => deleteUserFromDb(data)}
          />
        );
      },
    },
  ];

  return { columns, usersData, loading, bool, refreshPage };
};
