import React from "react";
import Header from "../components/Header";
import demo from "../images/slider1.jpg";
import "../style/About.css";
import { Link } from "react-router-dom";
const About = () => {
  const user = localStorage.getItem("username");

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{ padding: "100px" }}>
            <p>Welcome, {user}</p>
            <h2>ABOUT OUR RESTAURANT</h2>
            <p>
              Welcome to GroceryHub, your ultimate destination for an exceptional
              dining experience. At GroceryHub, we are dedicated to providing a
              seamless and enjoyable way to order delicious food from our
              diverse menu. Our easy-to-use platform allows customers to browse
              our offerings, place orders, and track their meals in real-time.
              For our dedicated team, we offer robust tools to manage menu
              items, orders, and customer interactions efficiently. Whether you
              are looking to enjoy a meal at home or manage a bustling kitchen,
              GroceryHub is here to serve you with excellence and innovation.
              Join us and discover a new way to dine with convenience and
              satisfaction.
            </p>
            <Link to={"/menu"}>
              <button className="btn btn-primary">Explore!</button>
            </Link>
          </div>
          <div className="col-md-6">
            <img src={demo} alt="Coffee" className="img-fluid" />
          </div>
        </div>
        <div
          className="row mt-5"
          style={{ backgroundColor: "black", color: "white", height: "300px" }}
        >
          <div className="col-md-12" style={{ padding: "50px" }}>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="contact-info">
              <p>
                <i className="fas fa-phone-alt"></i> +91 1234567890
              </p>
              <p>
                <i className="fas fa-envelope"></i> GroceryHub@gmail.com
              </p>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
              />
              <button className="btn btn-primary">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
