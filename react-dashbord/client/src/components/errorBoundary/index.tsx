import { Alert, Row, Space } from "antd";
import React from "react";
//@ts-ignore
import { ErrorBoundary } from "react-error-boundary";
import CustomButton from "../custom-button";

type Props = {
  children: React.ReactNode;
};

const CustomErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    //@ts-ignore
    <ErrorBoundary
      fallback={
        <Row style={{ height: "100vh" }} align="middle" justify="center">
          <Space direction="vertical" align="center" size="large">
            <Alert
              message="Error"
              description="This is an error message about copywriting."
              type="error"
              showIcon
            />

            <CustomButton
              type="dashed"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </CustomButton>
          </Space>
        </Row>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
