import React from "react";
import PrivateRoute from "../../Routes/PrivateRoute";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { controller } from "./controller";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { onLogOut } = controller();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          className="mt-[64px] text-[22px] "
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: "/dashboard/users",
              icon: <UserOutlined />,
              label: <Link to="/dashboard/users">Users</Link>,
            },
            {
              key: "/dashboard/cars",
              icon: <CarOutlined />,
              label: <Link to="/dashboard/cars">Cars</Link>,
            },
            {
              type: "divider",
            },
            {
              key: "/",
              icon: <LogoutOutlined />,
              label: (
                <Link to="/" onClick={onLogOut}>
                  Log out
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="p-0 bg-[#001529]">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 30,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default PrivateRoute(Dashboard);
