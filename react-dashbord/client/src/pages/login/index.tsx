import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Card, Form, Space, Typography } from "antd";
import CustomInput from "../../components/custom-input";
import PasswordInput from "../../components/passord-input";
import CustomButton from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessages } from "../../utils/isErrorWithMessage";
import ErrorMessage from "../../components/errroMessage";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const styleContent = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate(Paths.home);
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate(`${Paths.home}`);
    } catch (error) {
      const maybeError = isErrorWithMessages(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("неизвестная ошибка");
      }
    }
  };

  return (
    <Layout styleContent={styleContent}>
      <Card title="Войдите" style={{ width: "30rem" }}>
        <Form onFinish={login}>
          <CustomInput name="email" placeholder="Email" type="email" />
          <PasswordInput name="password" placeholder="Password" />
          <CustomButton type="primary" htmlType="submit">
            Войти
          </CustomButton>
        </Form>
        <Space direction="vertical" size="large">
          <Typography.Text>
            Нет Аккаунта? <Link to={Paths.register}>зарегистрируйтесь</Link>
          </Typography.Text>
          <ErrorMessage message={error} />
        </Space>
      </Card>
    </Layout>
  );
};

export default Login;
