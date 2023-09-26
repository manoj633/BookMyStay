import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/dark.scss";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoutes = ({ children }) => {
    const user = useContext(AuthContext);

    if (!user.user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
