import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./auth/ProtectedRoute";
import PaymentRestaurant from "./components/PaymentRestaurant";
import Paymentsuccess from "./components/Paymentsuccess";
import MyOrders from "./components/MyOrders";
import Contact from "./pages/Contact";
import About from "./pages/About";

const App = () => {
  let user = localStorage.getItem("usertoken");
  // console.log(user);

  return (
    <>
      <Router>
        <Toaster />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={true} redirect="/">
                <Home />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/about"
            element={
              <ProtectedRoute user={true} redirect="/about">
                <About />
              </ProtectedRoute>
            }
          /> */}

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/payment/:id" element={<PaymentRestaurant />} />
            <Route path="/paymentsuccess" element={<Paymentsuccess />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/contact" element={<Contact />} />
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
      </Router>
    </>
  );
};

export default App;
