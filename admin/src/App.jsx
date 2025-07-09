import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="App flex flex-1">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
