import React, { useEffect, useState } from "react";

import Layout from "../../components/layout";
import { Card, Col, Form, Row, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input";
import PasswordInput from "../../components/passord-input";
import CustomButton from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessages } from "../../utils/isErrorWithMessage";
import ErrorMessage from "../../components/errroMessage";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const styleContent = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) navigate(Paths.home);
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate(`${Paths.home}`);
    } catch (error) {
      const maybeError = isErrorWithMessages(error);

      if (maybeError) {
        setError(error.data.message);
      } else setError("Something went wrong");
    }
  };

  return (
    <Layout styleContent={styleContent}>
      <Card title="Регистрация" style={{ width: "30rem" }}>
        <Form onFinish={register}>
          <CustomInput name="name" placeholder="name" type="text" />
          <CustomInput name="email" placeholder="Email" type="email" />
          <PasswordInput name="password" placeholder="Password" />
          <PasswordInput name="confirmPassword" placeholder="repeat Password" />
          <CustomButton type="primary" htmlType="submit">
            Регистрация
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Есть Аккаунт? <Link to={Paths.login}>войти</Link>
          </Typography.Text>
          <ErrorMessage message={error} />
        </Space>
      </Card>
    </Layout>
  );
};

export default Register;
