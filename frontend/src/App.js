import "./App.css";
import "./assets/scss/header.scss";
import "./assets/scss/home.scss";
import "./assets/scss/pastries.scss";
import "./assets/scss/register.scss";
import "./assets/scss/admin.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pastries from "./pages/Pastries";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivatesRoutes";
import AdminPastries from "./pages/admin/AdminPastries";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRoutes from "./components/AdminRoutes";
import AddPastryPage from "./pages/admin/AddPastryPage";
import ClientLayout from "./components/ClientLayout";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import UserPastries from "./pages/UserPastries";
import { useState } from "react";
import { useEffect } from "react";
import { getGameStatus } from "./api";

function App() {
  const [gameStatus, setGameStatus] = useState("");
  useEffect(() => {
    getGameStatus()
      .then(({ data }) => {
        setGameStatus(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {gameStatus === "inactive" ? (
        <div className="game-inactive">
          <h1>Cet évenement est terminé</h1>
        </div>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<ClientLayout />}>
              <Route element={<PrivateRoutes />}>
                <Route index element={<Home />} />
                <Route path="pastries" element={<Pastries />} />
                <Route path="mypastries" element={<UserPastries />} />
              </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* ADMIN ROUTES*/}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/" element={<AdminLayout />}>
              <Route element={<AdminRoutes />}>
                <Route path="pastries" element={<AdminPastries />} />
                <Route path="addPastry" element={<AddPastryPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
