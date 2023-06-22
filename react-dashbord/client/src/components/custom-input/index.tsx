import React from "react";
import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

const CustomInput: React.FC<Props> = ({ name, placeholder, type = "text" }) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input placeholder={placeholder} type={type} size="large"></Input>
    </Form.Item>
  );
};

export default CustomInput;
