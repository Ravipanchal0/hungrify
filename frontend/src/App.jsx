import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, LoginModal } from "./components/index.js";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin && <LoginModal setShowLogin={setShowLogin} />}

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
