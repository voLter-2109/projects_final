import React from "react";
import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

const PasswordInput: React.FC<Props> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
        { min: 6, message: "Username must be minimum 5 characters." },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("пароли не совпадают"));
          },
        }),
      ]}
    >
      <Input type="password" placeholder={placeholder}></Input>
    </Form.Item>
  );
};

export default PasswordInput;
