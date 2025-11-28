import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import FoodCategory from "./pages/FoodCategory";
import Menu from "./pages/Menu";
import Staff from "./pages/Staff";
import Showmenu from "./components/Showmenu";
import User from "./pages/User";
import Order from "./pages/Order";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./auth/ProtectedRoute";
import LeftMain from "./components/LeftMain";

const App = () => {
  let user = localStorage.getItem("admintoken");

  return (
    <>
      <Router>
        <Header />
        <Toaster />

        <div className="main">
          <LeftMain />
          <div className="right">
            <Routes>
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/foodcategory" element={<FoodCategory />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/allmenu" element={<Showmenu />} />
                <Route path="/user" element={<User />} />
                <Route path="/order" element={<Order />} />
              </Route>

              <Route
                path="/login"
                element={
                  <ProtectedRoute user={!user} redirect="/">
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
