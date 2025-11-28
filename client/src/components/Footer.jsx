import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <>
      <p
        style={{
          fontSize: "30px",
          color: "#0e6f3a",
          marginTop: "25px",
          borderBottom: "2px solid #0e6f3a",
          display: "inline-block",
          margin: "10px 10px"
        }}
      >
        We're Here!
      </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.228906362022!2d72.80231657471751!3d21.14328678383616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051003da59acb%3A0x29ec1eb46f90ff5b!2sAtlanta%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1717503624292!5m2!1sen!2sin"
        width="1480"
        height="450"
        style={{ border: "0", borderRadius: "5px", margin: "0px 10px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="footer" style={{ fontSize: "16px" }}>
        <div className="ffirst">
          <div className="logo1">
            <i class="fa-solid fa-bag-shopping"></i>

            <h2>GroceryHub</h2>
          </div>
          <p className="tagline">
            Just like a perfectly baked pastry, we created Cuisine with special
            love and it shows.
          </p>
        </div>
        <div className="fsecond">
          <h2>Open Hours</h2>
          <p>Mon-Fri: 9 AM - 6 PM</p>
          <p>Saturday: 9 AM - 4 PM</p>
          <p>Sunday: Closed</p>
        </div>
        <div className="fthird">
          <h2>Contact Us</h2>
          <div class="fthd">
            <p>Atlanta bussiness hub, bhimrad, surat</p>
            <p>Email: GroceryHub@gmail.com</p>
            <p>Telephone: +919812345663</p>
          </div>
        </div>
        <div className="ffour">
          <h2>Subscribe Newsletter</h2>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <i className="fas fa-paper-plane fa-2x"></i>
        </div>
      </div>
    </>
  );
};

export default Footer;
