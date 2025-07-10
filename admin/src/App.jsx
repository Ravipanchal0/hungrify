import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="max-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <main className="App flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto px-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
