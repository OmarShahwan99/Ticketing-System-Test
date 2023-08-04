import React, { useContext, useEffect } from "react";
import { Layout, Menu, Dropdown, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "../hooks/useHttp";

const { Header, Content, Footer } = Layout;

const DefaultLayout = (props) => {
  const { isAuth, logout, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/login");
    logout();
  };

  const {
    mutate: logoutMutation,
    data,
    error,
    isLoading,
  } = useLogout(onSuccess);

  useEffect(() => {
    if (data) {
      notification.open({
        type: "success",
        message: data.data.message,
        duration: 3,
      });
    }
  }, [data]);

  if (error) {
    notification.open({
      type: "error",
      message: error.message,
      duration: 3,
    });
  }

  const items = [
    {
      label: "Tickets List",
      key: "1",
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];
  const handleMenuClick = (e) => {
    if (e.key === "1") {
      navigate("/");
    }
    if (e.key === "2") {
      logoutMutation();
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ color: "#1677ff" }} className="demo-logo">
          <Link>AI Gate</Link>
        </h1>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={window.location.pathname}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={[
            !isAuth && { label: "Register", key: "/register" },
            !isAuth && { label: "Login", key: "/login" },
          ]}
        />
        {isAuth && (
          <Dropdown.Button
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
            style={{ width: "fit-content" }}
            loading={isLoading}
          >
            {user.name}
          </Dropdown.Button>
        )}
      </Header>
      <Content style={{ padding: "0 50px", minHeight: "100vh" }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
