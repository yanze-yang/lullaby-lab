import React from "react";
import {
  SnippetsOutlined,
  FundOutlined,
  UserSwitchOutlined,
  ShopOutlined,
  LinkOutlined,
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
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();
  const path = router.pathname;

  const items: MenuItem[] = [
    getItem("Dashboard", "/dashboard", <FundOutlined />),
    getItem("Order", "/order", <SnippetsOutlined />),
    getItem("Product", "/product", <ShopOutlined />),
    getItem("Category", "/category", <LinkOutlined />),
    getItem("Contact", "/contact", <UserSwitchOutlined />),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Layout style={{ backgroundColor: "#111827" }}>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
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
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#111827" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "#111827",
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
