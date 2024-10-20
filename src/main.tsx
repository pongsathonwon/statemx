import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataContextProvider from "./context/DataContextProvider.tsx";
import FirstnameEdit from "./pages/FirstnameEdit.tsx";
import LastnameEdit from "./pages/LastnameEdit.tsx";
import Home from "./pages/Home.tsx";

const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <App /> },
      { path: "/users/firstname", element: <FirstnameEdit /> },
      { path: "/users/lastname", element: <LastnameEdit /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContextProvider>
      <RouterProvider router={ROUTES} />
    </DataContextProvider>
  </StrictMode>
);
