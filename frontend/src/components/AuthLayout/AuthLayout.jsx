import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

const AuthLayout = ({ children, authentication = true }) => {
  const { token, setToken, setShowLogin } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      // Try to get token from localStorage if not in context
      if (!token) {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
        }
      }

      // Wait a short time to ensure state updates
      setTimeout(() => setLoader(false), 1000);
    };

    loadToken();
  }, [token, setToken]);

  useEffect(() => {
    // Check auth only after loading is complete
    const authStatus = !!token;

    if (!loader) {
      if (authentication && !authStatus) {
        setShowLogin(true);
        navigate("/", { replace: true });
      }
    }
  }, [loader, token, authentication, navigate, setShowLogin]);

  if (loader) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
