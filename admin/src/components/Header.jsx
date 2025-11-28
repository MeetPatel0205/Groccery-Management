import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <div className="logo">
        <i class="fa-solid fa-bag-shopping"></i>
          <h2>GroceryHub</h2>
        </div>

        <div className="detail">
          <p>
            <i className="fa-regular fa-circle-user"></i>
          </p>
        </div>

        <div
          className="detail"
          onClick={() => {
            localStorage.removeItem("adminemail");
            localStorage.removeItem("admintoken");
            localStorage.removeItem("adminid");

            navigate("/login");
            window.location.reload();
          }}
        >
          <p>
            <i className="fa-solid fa-right-from-bracket"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
