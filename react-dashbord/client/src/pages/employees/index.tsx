import React, { useEffect } from "react";
import Layout from "../../components/layout";
import CustomButton from "../../components/custom-button";
import {
  CheckOutlined,
  CloseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Table} from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../path";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Employees } from "@prisma/client";

// !добавить пагинацию
// ! добавить поиск по имени

const EmployeesComponent: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const columns: ColumnsType<Employees> = [
    {
      title: "name",
      dataIndex: "firstName",
      key: "firstName",
      
    },
    {
      title: "style",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "price",
      dataIndex: "age",
      key: "age",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const _a = Number(a.age);
        const _b = Number(b.age);
        return _a - _b;
      },
    },
    {
      title: "availability",
      dataIndex: "adress",
      align: "center",
      key: "adress",
    },
    {
      title: "tag",
      key: "userId",
      dataIndex: "userId",
      align: "center",
      render(_, record) {
        if (record.userId === user?.id) {
          return {
            props: {
              style: { background: "#acc7ac5e" },
            },
            children: <CheckOutlined />,
          };
        }
        return {
          children: <CloseOutlined />,
        };
      },
    },
  ];

  const { data, isLoading } = useGetAllEmployeesQuery(undefined, {
    pollingInterval: 300000,
  });

  const navAddEmployee = () => {
    navigate(Paths.emloyeeAdd);
  };

  useEffect(() => {
    if (!user) navigate(Paths.login);
  }, [user, navigate]);

  return (
    <Layout>
      <CustomButton
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={navAddEmployee}
      >
        Add employess
      </CustomButton>

      <Table
        loading={isLoading}
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{
          position: ["bottomCenter"],
          pageSize: 10,
          showTotal(total, range) {
            return `${range[0]}-${range[1]}/ ${total}`;
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};

export default EmployeesComponent;
