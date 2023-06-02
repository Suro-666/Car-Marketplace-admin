import React, { useState } from "react";
import { Typography, Table, Modal } from "antd";
import { controller } from "./controller";
import Spinner from "../../Components/Spinner/Spinner";

const { Title } = Typography;

const Users = () => {
  const { columns, usersData, loading, bool, refreshPage } = controller();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <>
      <Title level={2} className="mb-[15px] mx-[10px] flex justify-between items-center">
        <span className="flex justify-center items-center">Users</span>
        <button onClick={refreshPage} className="mr-[2%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 hover:scale-[1.1] duration-300 hover:text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </Title>
      <Table
        bordered
        columns={columns}
        rowKey="uid"
        dataSource={usersData}
        loading={loading}
        rowClassName="cursor-pointer"
        onRow={(data) => {
          return {
            onDoubleClick: () => {
              setUserInfo({
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: data.password,
                role: data.role,
                uid: data.uid,
              });
              setOpen(true);
            },
          };
        }}
      />
      <Modal
        open={open}
        title={`${userInfo.name} ${userInfo.surname}`}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
      </Modal>
      <Modal open={bool} onCancel={bool} footer={null} closable={false}>
        <pre className="min-h-[100px] flex justify-center items-center">
          <Spinner />
        </pre>
      </Modal>
    </>
  );
};

export default Users;
