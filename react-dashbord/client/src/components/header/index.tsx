import React from "react";
import { Avatar, Layout, Space, Typography } from "antd";
import {
  LoginOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import style from "./index.module.scss";
import CustomButton from "../custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
import logo from "../../assets/logo.svg";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(Paths.login);
  };

  return (
    <Layout.Header className={style.header}>
      <Space>
        <Avatar
          src={<img src={logo} alt="logo" />}
          style={{ width: "40px", margin: "0 10px" }}
        />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Typography.Title level={5}>
        {user?.name ? (
          <>
            <UserOutlined /> {user?.name}
          </>
        ) : (
          "opps..."
        )}
      </Typography.Title>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Sing out
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Sing In
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Header;
