import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setlogindata({
      ...logindata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginRes = await fetch("http://localhost:5000/api/adminlogin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: logindata.email,
        password: logindata.password,
      }),
    });

    const jsonRes = await loginRes.json();

    console.log(jsonRes);

    if (jsonRes.id) {
    //   console.log(jsonRes);

      localStorage.setItem("adminemail", jsonRes.email);
      localStorage.setItem("adminid", jsonRes.id);
      localStorage.setItem("admintoken", jsonRes.token);

      window.location.reload();
      toast.success("Login Success");

      navigate("/");
    } else {
      toast.error(`${jsonRes.errMessage}`);
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control input-form"
            name="email"
            placeholder="Enter your email"
            onChange={handleLogin}
            value={logindata.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Secret Key
          </label>
          <input
            type={"password"}
            className="form-control input-form"
            name="password"
            placeholder="Enter your secret key"
            onChange={handleLogin}
            value={logindata.password}
          />
        </div>
        <button type="submit" className="form-btn">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginComponent;
