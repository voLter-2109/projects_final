import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import Layout from "../../components/layout";
import { Row } from "antd";
import { Employees } from "@prisma/client";
import CustomForm from "../../components/custom-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { Paths } from "../../path";
import { isErrorWithMessages } from "../../utils/isErrorWithMessage";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const EditEmployee: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState<string>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) navigate(Paths.login);
  }, [user, navigate]);

  const handleEdit = async (employee: Employees) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessages(error);

      if (maybeError) {
        setError(error.data.message);
      } else setError("Something went wrong");
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <CustomForm
          title="edit"
          btnText="save"
          error={error}
          employee={data}
          onFinish={handleEdit}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;
