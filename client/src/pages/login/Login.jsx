import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../../components/navbar/NavBar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data.details });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="lConrainer">
          <div>
            <div>
              <h1 className="loginTitle">Sign in or create an account</h1>
            </div>
            <div className="inputContainer">
              <label htmlFor="username" className="labelText">
                Username
              </label>
              <input
                type="text"
                className="lInput"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password" className="labelText">
                Password
              </label>
              <input
                type="password"
                className="lInput"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              onClick={handleLogin}
              className="lButton"
            >
              Login
            </button>
          </div>
          {error && <span>{error}</span>}
        </div>
      </div>
    </>
  );
}

export default Login;
