import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  const [show, setshow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePassword = () => {
    setshow(!show);
  };

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

    setLoading(true);

    const loginRes = await fetch("http://localhost:5000/api/login", {
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

    if (jsonRes.id) {
      console.log(jsonRes);

      localStorage.setItem("useremail", jsonRes.email);
      localStorage.setItem("userid", jsonRes.id);
      localStorage.setItem("username", jsonRes.name);
      localStorage.setItem("userpic", jsonRes.pic);
      localStorage.setItem("usertoken", jsonRes.token);

      setLoading(false);
      window.location.reload();
      toast.success("Login Success");

      navigate("/");
    } else {
      setLoading(false);
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
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            className="form-control input-form"
            name="password"
            placeholder="Enter your password"
            onChange={handleLogin}
            value={logindata.password}
          />
          <div className="eyeBtn" onClick={handlePassword}>
            {show ? <IoEye /> : <IoEyeOff />}
          </div>
        </div>
        <button
          type="submit"
          className={`form-btn ${loading ? "disabled-btn" : ""}`}
        >
          {loading ? <div className="loading-circle"></div> : "Login"}
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="form-btn"
          style={{
            marginLeft: "10px"
          }}
        >
          Home
        </button>
      </form>
    </>
  );
};

export default Login;
