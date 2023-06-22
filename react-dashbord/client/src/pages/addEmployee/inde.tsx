import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Row } from "antd";
import CustomForm from "../../components/custom-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Paths } from "../../path";
import { Employees } from "@prisma/client";
import { isErrorWithMessages } from "../../utils/isErrorWithMessage";

const AddEmployee: React.FC = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) navigate(Paths.login);
  }, [user, navigate]);

  const handleAddEmployerr = async (data: Employees) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
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
    <Layout>
      <Row align="middle" justify="center">
        <CustomForm
          title="Add employee"
          btnText="add"
          onFinish={handleAddEmployerr}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddEmployee;
