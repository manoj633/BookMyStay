import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BookMyStay</span>
        </Link>

        {!user && (
          <div className="navItems">
            <button className="navButton">
              Register {JSON.stringify(user)}
            </button>
            <button className="navButton" onClick={loginHandler}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
