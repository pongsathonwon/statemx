import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserEdit from "./page/UserEdit.tsx";
import Layout from "./component/Layout.tsx";
import UserProfile from "./page/UserProfile.tsx";
import FormDataContextProvider from "./context/FormDataContextProvider.tsx";

const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <UserProfile />,
      },
      {
        path: "/edit",
        element: <UserEdit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormDataContextProvider>
      <RouterProvider router={ROUTES} />
    </FormDataContextProvider>
  </StrictMode>
);
