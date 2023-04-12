import React, { Suspense } from "react";
//lib
import { Route, Routes } from "react-router-dom";
//component
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
//style
import "./scss/app.scss";

const CartPage = React.lazy(() => import(/* webpackChunkName: "CartPage" */ "./Pages/Cart"));
const FullProduct = React.lazy(() => import(/* webpackChunkName: "FullProduct" */ "./Pages/FullProduct"));
const NotFoundBlock = React.lazy(() => import(/* webpackChunkName: "NotFoundBlock" */ "./components/NotFoundBlock"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullProduct />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundBlock />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
