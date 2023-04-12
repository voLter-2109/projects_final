import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Spinner from "../spiner/Spiner";
import { gsapLoader } from "../../services/gsapLoader";

const SingleCharacterLayout = lazy(() => {
  return import("../pages/SingleCharacterLayout");
});

const Page404 = lazy(() => {
  return import("../pages/404");
});
const MainPage = lazy(() => {
  return import("../pages/MainPage");
});
const SingleComicPage = lazy(() => {
  return import("../pages/SingleComicPage");
});
const AppBanner = lazy(() => {
  return import("../appBanner/AppBanner");
});
const ComicsList = lazy(() => {
  return import("../comicsList/ComicsList");
});

const App = () => {
  const location = useLocation();
  return (
    <div className="app">
      <Suspense fallback={<Spinner />}>
        <Routes location={location}>
          <Route path="/" loader={gsapLoader} element={<AppHeader />}>
            <Route index element={<MainPage />} />
            <Route path="/characters/:charName" element={<SingleCharacterLayout />} />
            <Route path="/comics" loader={gsapLoader} element={<AppBanner />}>
              <Route index element={<ComicsList />} />
              <Route path=":comicId" element={<SingleComicPage />} />
              <Route path="*" element={<Page404 />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

// const app = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppHeader />,
//     children: [
//       {
//         loader: gsapLoader,
//         path: "/",
//         element: <MainPage />,
//       },
//       {
//         path: "comics",
//         loader: gsapLoader,
//         element: <AppBanner />,
//         children: [
//           { index: true, element: <ComicsList /> },
//           { path: ":comicId", element: <SingleComicPage /> },
//           { path: "*", element: <Page404 /> },
//         ],
//       },
//     ],
//   },
//   { path: "*", element: <Page404 /> },
// ]);

// export default app;
