import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {  ConfigProvider, Row, theme } from "antd";
import { store } from "./app/store";
import { Paths } from "./path";
import "./index.css";

import Auth from "./features/auth/auth";
import Status from "./pages/status";
import ErrorPage from "./pages/errorPage";

const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));
const EmployeesComponent = React.lazy(() => import("./pages/employees"));
const AddEmployee = React.lazy(() => import("./pages/addEmployee/inde"));
const Employee = React.lazy(() => import("./pages/employee"));
const EditEmployee = React.lazy(() => import("./pages/edit-employee"));

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <EmployeesComponent />,
  },
  { path: Paths.login, element: <Login /> },
  { path: Paths.register, element: <Register /> },
  { path: Paths.emloyeeAdd, element: <AddEmployee /> },
  { path: `${Paths.status}/:status`, element: <Status /> },
  { path: `${Paths.employee}/:id`, element: <Employee /> },
  { path: `${Paths.employeeEdit}/:id`, element: <EditEmployee /> },
  { path: "*", element: <ErrorPage /> },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);

// !add errorBoundary

root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Auth>
        <Suspense
          fallback={
            <>
              <Row style={{ height: "100vh" }} align="middle" justify="center">
                <h1>Loading...</h1>
              </Row>
            </>
          }
        >
          <RouterProvider router={router}  />
        </Suspense>
      </Auth>
    </ConfigProvider>
  </Provider>
);
