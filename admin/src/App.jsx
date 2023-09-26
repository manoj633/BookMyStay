import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./style/dark.scss";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource.jsx";

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
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
