import { useEffect, useState } from "react";
import { useCarsStore } from "../../Store-Zustand/Cars/Cars";
import { DeleteOutlined } from "@ant-design/icons";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase";

export const controller = () => {
  const { carsData, setCarsData } = useCarsStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    setLoading(true);
    try {
      const carsQuery = query(collection(db, "cars"));
      const carsDb = await getDocs(carsQuery).then((data) => data.docs);
      let tmp = [];
      carsDb.forEach((data) => tmp.push(data.data().carData));
      setCarsData(tmp);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteCarFromDb(_carData) {
    try {
      await deleteDoc(doc(db, "cars", _carData.carId));
      alert(
        `Model :${_carData.model.toUpperCase()}\nBrand :${_carData.brand.toUpperCase()}\nCar-id :${
          _carData.carId
        } --> deleted`
      );
      getCars();
    } catch (error) {
      console.error(error.message);
    }
  }

  const refreshPage = async () => {
    await getCars();
  };

  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (_, data) => {
        return <div>{data.model.toUpperCase()}</div>;
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      align: "center",
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      align: "center",
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, data) => {
        return (
          <div>
            {data.price}.{data.priceType.toUpperCase()}
          </div>
        );
      },
    },
    {
      align: "center",
      title: "Mileage",
      dataIndex: "mileage",
      key: "mileage",
      render: (_, data) => {
        return (
          <div>
            {data.mileage} {data.kmml}
          </div>
        );
      },
    },
    {
      align: "center",
      title: "Body Type",
      dataIndex: "bodyType",
      key: "bodyType",
    },
    {
      align: "center",
      title: "",
      dataIndex: "carId",
      key: "delete",
      render: (_, data) => {
        return (
          <DeleteOutlined
            className="text-[24px] hover:text-[red] duration-200 hover:scale-[1.1]"
            onClick={() => deleteCarFromDb(data)}
          />
        );
      },
    },
  ];

  return { columns, carsData, loading, refreshPage };
};
