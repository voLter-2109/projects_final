import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Paths } from "../../path";
import Layout from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import CustomButton from "../../components/custom-button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/errroMessage";
import { isErrorWithMessages } from "../../utils/isErrorWithMessage";

const Employee: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const params = useParams<{ id: string }>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const handelDeleteUser = async () => {
    hideModal();

    try {
      if (data) await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch (error) {
      const maybeError = isErrorWithMessages(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Oppps....");
      }
    }
  };

  useEffect(() => {
    if (!user) navigate(Paths.login);
  }, [user, navigate]);

  if (isLoading) return null;

  //   !
  if (!data) {
    return <Navigate to={Paths.home} />;
  }

  return (
    <Layout>
      <Descriptions title="Info" bordered>
        <Descriptions.Item
          label="Name"
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>

        <Descriptions.Item label="age" span={3}>
          {`${data.age}`}
        </Descriptions.Item>

        <Descriptions.Item label="Address" span={3}>
          {`${data.adress}`}
        </Descriptions.Item>
      </Descriptions>

      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Button</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                type="default"
                shape="round"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              type="default"
              danger
              shape="round"
              icon={<DeleteOutlined />}
              onClick={showModal}
            >
              Remove
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Ok?"
        open={isModalOpen}
        onOk={handelDeleteUser}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Not"
      >
        Действительно удалить?
      </Modal>
    </Layout>
  );
};

export default Employee;
