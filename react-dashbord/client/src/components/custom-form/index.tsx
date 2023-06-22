import { Employees } from "@prisma/client";
import { Card, Form, Space } from "antd";
import React from "react";
import CustomInput from "../custom-input";
import ErrorMessage from "../errroMessage";
import CustomButton from "../custom-button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

const CustomForm: React.FC<Props<Employees>> = ({
  onFinish,
  btnText,
  title,
  error,
  employee, 
}) => {
  return (
    <Card
      title={title}
      style={{
        width: "30rem",
      }}
    >
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="firstName" />
        <CustomInput type="text" name="lastName" placeholder="lastName" />
        <CustomInput type="text" name="age" placeholder="age" />
        <CustomInput type="text" name="adress" placeholder="adress" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton type="primary" htmlType="submit">
            {btnText}
          </CustomButton>
        </Space>
      </Form>
    </Card>
  );
};

export default CustomForm;
