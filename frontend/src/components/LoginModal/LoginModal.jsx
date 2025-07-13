import { useContext, useState } from "react";
import { IoClose } from "../../assets/icons.js";
import { NavLink } from "react-router-dom";
import { createAccount, loginUser } from "../../api/authApi.js";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext.jsx";

const LoginModal = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, setUser, setShowLogin } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await createAccount(data);
        if (res.success) {
          setToken(res.data.token);
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);

          setShowLogin(false);
        }
      } else {
        const res = await loginUser(data);
        if (res.success) {
          setToken(res.data.token);
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);

          setShowLogin(false);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-modal fixed top-0 left-0 w-full h-full bg-gray-800/60 bg-opacity-50 flex items-center justify-center z-999">
      <div className="modal-content w-full md:w-1/3 bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between items-center animate-zoomIn">
        <div className="modal-header relative w-full flex flex-col items-center mb-3">
          <h1 className="text-orange-500 font-quicksand text-4xl  font-bold cursor-default tracking-wide mb-2">
            hungrify
          </h1>
          <h2 className="text-xl text-center">{currentState}</h2>
          <button
            className="close-button text-2xl absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300 cursor-pointer"
            onClick={() => setShowLogin(false)}
          >
            <IoClose />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="login-form w-full flex flex-col items-center px-6"
        >
          {currentState === "Sign Up" && (
            <div className="name w-full flex flex-col mb-4">
              <label htmlFor="name" className="mb-0.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                placeholder="Name"
                required
                className="border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          )}

          <div className="email w-full flex flex-col mb-4">
            <label htmlFor="email" className="mb-0.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              placeholder="Email"
              required
              className="border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div className="password w-full flex flex-col mb-4">
            <label htmlFor="password" className="mb-0.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
              className="border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mb-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300 cursor-pointer tracking-wide"
          >
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>
        <div className="modal-footer">
          <p>
            {currentState === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <NavLink
              onClick={() =>
                setCurrentState(
                  currentState === "Sign Up" ? "Login" : "Sign Up"
                )
              }
              className="text-orange-500 hover:underline ml-1"
            >
              {currentState === "Sign Up" ? "Login" : "create an account"}
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
