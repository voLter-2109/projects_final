import React, { useEffect } from "react";
import style from "./index.module.scss";
import Header from "../header";
import { Content, Footer } from "antd/es/layout/layout";
import CustomErrorBoundary from "../errorBoundary";

type Props = {
  children: React.ReactNode;
  styleContent?: {
    [key: string]: string;
  };
};

const Layout: React.FC<Props> = ({ children, styleContent }) => {
  return (
    <CustomErrorBoundary>
      <div className={style.main}>
        <Header />

        <Content style={styleContent}>{children}</Content>

        <Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Клепали как могли
        </Footer>
      </div>
    </CustomErrorBoundary>
  );
};

export default Layout;
