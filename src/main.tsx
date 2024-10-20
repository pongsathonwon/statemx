import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataContextProvider from "./context/DataContextProvider.tsx";

const ROUTES = createBrowserRouter([{ path: "/", element: <App /> }]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContextProvider>
      <RouterProvider router={ROUTES} />
    </DataContextProvider>
  </StrictMode>
);
