import React, { FC, ReactElement, memo } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { CodepenOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Header, HomeLink, Image } from "./styled";
import logo from "~/assets/images/logo.png";
import Avatar from "./Avatar";
import { ASYNC_STATUS, useAppSelector } from "~/redux";
import { LoadingLarge } from "~/components/common";

const PAGES = {
  ORDERS: "ORDERS",
};

const items: MenuProps["items"] = [
  {
    key: PAGES.ORDERS,
    icon: <CodepenOutlined />,
    label: <Link to="/">Orders Management</Link>,
  },
];

const MainLayout: FC<{
  children: ReactElement;
}> = ({ children }) => {
  const { status, data } = useAppSelector((state) => state.login);

  if (status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING) {
    return (
      <>
        {children}
        <LoadingLarge />
      </>
    );
  }

  return (
    <Layout>
      <Layout.Sider width={250} theme="light">
        <HomeLink to="/">
          <Image src={logo} alt="logo" height={50} />
        </HomeLink>
        <Menu
          mode="inline"
          style={{
            height: "calc(100vh - 64px)",
          }}
          items={items}
        />
      </Layout.Sider>
      <Layout>
        <Header>
          <div
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {data.branch}
          </div>
          <Avatar />
        </Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default memo(MainLayout);
