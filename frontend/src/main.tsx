import React from "react";
import ReactDOM from "react-dom/client";
import RootPage from "./pages/RootPage/RootPage.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
