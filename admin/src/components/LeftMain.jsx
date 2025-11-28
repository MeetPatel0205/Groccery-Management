import React, { useState } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";

const LeftMain = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  return (
    <>

        <div className="left">
          <div className="home">
            <h3>HOME</h3>
            <div className="dashboard">
              <p>
                <i className="fa-solid fa-gauge"></i>
              </p>
              <NavLink to="/" className="link">
                <p>Dashboard</p>
              </NavLink>
            </div>
          </div>
          <div className="log">
            <h3>LOG</h3>
            <NavLink to="/user" className="link">
              <p>User</p>
            </NavLink>
            <NavLink to="/staff" className="link">
              <p>Staff</p>
            </NavLink>
            <NavLink to="/foodcategory" className="link">
              <p>Foodcategory</p>
            </NavLink>
            <div className="menu" onClick={toggleSubMenu}>
              <p>Menu</p>
              {showSubMenu && (
                <ul className="submenu">
                  <NavLink to="/allmenu" className="link">
                    <li>All Menu</li>
                  </NavLink>
                  <NavLink to="/menu" className="link">
                    <li>Add Menu</li>
                  </NavLink>
                </ul>
              )}
            </div>
            <NavLink to="/order" className="link">
              <p>Order</p>
            </NavLink>
          </div>
        </div>
    </>
  );
};

export default LeftMain;
