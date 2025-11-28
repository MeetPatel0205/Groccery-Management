import React, { useState } from "react";
import Cart from "../pages/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [cartView, setCartView] = useState(false);

  const data = useCart();
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const userpic = localStorage.getItem("userpic");

  return (
    <>
      {localStorage.getItem("usertoken") ? (
        <div className="navbar">
          <div className="logo">
          <i class="fa-solid fa-bag-shopping"></i>
            <h2><Link to={"/"}>GroceryHub</Link></h2>
          </div>

          <div className="detail">
            <p><Link to={"/"}>Home</Link></p>
            <p><Link to={"/menu"}>Menu</Link></p>
            <p><Link to={"/myorders"}>My Orders</Link></p>
            {/* <p><Link to={"/about"}>About Us</Link></p> */}
            <p><Link to={"/contact"}>Contact Us</Link></p>

            <div style={{ position: "relative" }}>
              <p
                onClick={() => {
                  setCartView(true);
                }}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Cart"

                style={{
                  fontSize: "20px",
                  paddingTop: "8px",
                  marginRight: "15px",
                  cursor: "pointer"
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </p>

              {data.length > 0 ? (
                <div
                  style={{
                    position: "absolute",
                    height: "1px",
                    width: "1px",
                    border: "12px solid #ffac4a",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    transform: "translate(16px, -56px)",
                  }}
                >
                  {data.length}
                </div>
              ) : (
                ""
              )}
            </div>

            {cartView ? (
              <Modal onClose={() => setCartView(false)}>
                <Cart />
              </Modal>
            ) : (
              ""
            )}
            <div
              data-toggle="tooltip"
              data-placement="bottom"
              title={username}
              style={{
                position: "relative",
                marginRight: "7px",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginBottom: "27px",
                cursor: "pointer"
              }}
            >
              <img
                src={userpic}
                alt="User Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "-43px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                }}
              >
                {username}
              </p>
            </div>
            <p
              data-toggle="tooltip"
              data-placement="bottom"
              title="Logout"
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload();

              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </p>
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="logo">
            <i className="fa-solid fa-utensils"></i>
            <h2><Link to={"/"}>GroceryHub</Link></h2>
          </div>

          <div className="detail">
            <p><Link to={"/"}>Home</Link></p>
            <p><Link to={"/menu"}>Menu</Link></p>
            {/* <p><Link to={"/about"}>About Us</Link></p> */}
            <p><Link to={"/contact"}>Contact Us</Link></p>
            <p><Link to={"/login"}>Login / SignUp</Link></p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
