import React, { useCallback, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, LoginModal } from "./components/index.js";
import { ToastContainer } from "react-toastify";
import { StoreContext } from "./context/StoreContext.jsx";

function App() {
  const { showLogin, setShowLogin } = useContext(StoreContext);
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginModal />}

      <div className="min-h-screen flex flex-col">
        <Navbar setShowLogin={setShowLogin} />

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
