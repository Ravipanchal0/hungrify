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

import {
  Home,
  Profile,
  Cart,
  PlaceOrder,
  PaymentSuccess,
  PaymentFailed,
  Order,
} from "./pages/index.js";
import StoreContextProvider from "./context/StoreContext.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index path="" element={<Home />} />

      {/* Protected Routes */}
      <Route
        path="cart"
        element={
          <AuthLayout>
            <Cart />
          </AuthLayout>
        }
      />
      <Route
        path="checkout"
        element={
          <AuthLayout>
            <PlaceOrder />
          </AuthLayout>
        }
      />
      <Route
        path="profile"
        element={
          <AuthLayout>
            <Profile />
          </AuthLayout>
        }
      />
      <Route
        path="paymentSuccess"
        element={
          <AuthLayout>
            <PaymentSuccess />
          </AuthLayout>
        }
      />
      <Route
        path="paymentFailed"
        element={
          <AuthLayout>
            <PaymentFailed />
          </AuthLayout>
        }
      />
      <Route
        path="myorders"
        element={
          <AuthLayout>
            <Order />
          </AuthLayout>
        }
      />
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
