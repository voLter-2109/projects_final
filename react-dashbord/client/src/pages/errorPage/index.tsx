import React from "react";
import { Result, Row } from "antd";
import CustomButton from "../../components/custom-button";
import { Link } from "react-router-dom";
import { Paths } from "../../path";
import { HomeFilled } from "@ant-design/icons";

const ErrorPage: React.FC = () => {
  return (
    <Row align="middle" justify="center" style={{ height: "100vh" }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <CustomButton type="primary" icon={<HomeFilled />}>
            <Link to={Paths.home}>Go home</Link>
          </CustomButton>
        }
      />
    </Row>
  );
};

export default ErrorPage;
