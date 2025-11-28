import React, { useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";

const ContactComponent = () => {
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    comment: "",
  });

  const handleContactData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: contactData.username,
          email: contactData.email,
          comment: contactData.comment,
        }),
      });

      const jsonRes = await response.json();

      if (jsonRes.id) {
        // console.log(jsonRes);

        toast.success("Thanks for reaching out! We'll contact you soon.");
        setContactData({
          username: "",
          email: "",
          comment: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contact">
        <section className="get-in-touch" style={{ borderRadius: "5px" }}>
          <div className="firsttouch">
            <p
              style={{
                borderBottom: "2px solid white",
                display: "inline-block",
                paddingBottom: "2px",
                marginBottom: "20px",
                marginTop: "10px",
                fontSize: "50px",
                color: "white"
              }}
            >
              GET IN TOUCH
            </p>
          </div>
          <div className="secondtouch">
            <div className="column">
              <FaAddressBook
                style={{
                  fontSize: "42px",
                  marginLeft: "188px",
                  marginBottom: "20px",
                }}
              />
              <h2 style={{ textAlign: "center", color: "white" }}>Address</h2>
              <p style={{ textAlign: "center" }}>
              GroceryHub Restaurant,
                <br />
                Atlanta bussiness hub
              </p>
              <p style={{ textAlign: "center", color: "white"  }}>
                Bhimrad
                <br />
                Surat
                <br />
                Gujarat
              </p>
            </div>
            <div className="column">
              <FaPhone
                style={{
                  fontSize: "42px",
                  marginLeft: "188px",
                  marginBottom: "20px",
                }}
              />
              <h2 style={{ textAlign: "center", color: "white"  }}>PHONE</h2>
              <p style={{ textAlign: "center" }}>
                Website Group Consulting
                <br />
                303-555-1234
              </p>
              <p style={{ textAlign: "center" }}>
                Website 24/7 Service Department
                <br />
                800-555-5678 (Emergency Calls)
              </p>
            </div>

            <div className="column">
              <MdEmail
                style={{
                  fontSize: "42px",
                  marginLeft: "188px",
                  marginBottom: "20px",
                }}
              />
              <h2 style={{ textAlign: "center", color: "white"  }}>EMAIL</h2>
              <p style={{ textAlign: "center" }}>
                Request for Proposal
                <br />
                <a href="mailto:info@nishitpatel1227@gmail.com">
                  nishitpatel1227@gmail.com
                </a>
              </p>
              <p style={{ textAlign: "center" }}>
                Technical Service Calls
                <br />
                <a href="mailto:kwishp@gmail.com">kwishp@gmail.com</a>
              </p>
              <p style={{ textAlign: "center" }}>
                Employment Opportunities
                <br />
                <a href="mailto:harshp@gmail.com">harshp@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
        <section className="contact-form" style={{ borderRadius: "5px" }}>
          <h2 style={{color: "white" }}>Message Us</h2>
          <form onSubmit={handleContact}>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Name"
              value={contactData.username}
              onChange={handleContactData}
              style={{width: "100%"}}
              required
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={contactData.email}
              onChange={handleContactData}
              style={{width: "100%"}}
              required
            />
            <textarea
              name="comment"
              placeholder="Comments"
              className="form-control"
              cols={"20"}
              value={contactData.comment}
              onChange={handleContactData}
              style={{width: "100%"}}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </section>
        <div>
          <p
            style={{
              fontSize: "30px",
              color: "#0e6f3a",
              marginTop: "25px",
              borderBottom: "2px solid #0e6f3a",
              display: "inline-block",
            }}
          >
            We're Here!
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.228906362022!2d72.80231657471751!3d21.14328678383616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be051003da59acb%3A0x29ec1eb46f90ff5b!2sAtlanta%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1717503624292!5m2!1sen!2sin"
            width="1480"
            height="450"
            style={{ border: "0", borderRadius: "5px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
