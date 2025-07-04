import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Home, Cart, PlaceOrder } from "./pages/index.js";
import StoreContextProvider from "./context/StoreContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<PlaceOrder />} />
    </Route>,
  ])
);

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </StoreContextProvider>
);
