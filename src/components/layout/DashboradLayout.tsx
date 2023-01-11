import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,

  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const path = router.pathname;

  const items: MenuItem[] = [
    getItem("Order", "/order", <UserOutlined />),
    getItem("Product", "/product", <BarcodeOutlined />),
    getItem("Category", "/category", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <UserOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <UserOutlined />),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    router.push(e.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar />
      {/* <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header> */}
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            selectedKeys={[path]}
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px", background: "#111827" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#111827",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
