import { Button, Result, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../path";
import { message } from "antd";

const Statuses: Record<string, string> = {
  created: "Пользователь успешно создан",
  updated: "Пользователь успешно обновлен",
  deleted: "Пользователь успешно удален",
};

const Status: React.FC = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    messageApi.open({
      type: "success",
      content: `This is a prompt message for success, and it will disappear in 10 seconds`,
      duration: 5,
    });

    const timerId = setTimeout(() => {
      navigate(`${Paths.home}`);
    }, 5000);

    return () => clearTimeout(timerId);
  });

  return (
    <Row
      align="middle"
      justify="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Result
        status={status ? "success" : "404"}
        title={status ? Statuses[status] : "Не найдено"}
        extra={
          <Button key="dashboard">
            <Link to={Paths.home}> На главную</Link>
          </Button>
        }
      />
      {contextHolder}
    </Row>
  );
};

export default Status;
