import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <main className="App relative">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
