import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

const Signup = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });
  const [show, setshow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({
      ...data,
      [name]: value,
    });
  };

  const handlePassword = () => {
    setshow(!show);
  };

  const postImage = async (pics) => {
    console.log(pics);
    setLoading(true);

    if (pics.type == "image/jpeg" || pics.type == "image/png") {
      const formdata = new FormData();

      formdata.append("file", pics);
      formdata.append("upload_preset", "blinktalks");
      formdata.append("cloud_name", "dfi24moms");

      await fetch("https://api.cloudinary.com/v1_1/dfi24moms/image/upload", {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((picdata) => {
          setdata({
            ...data,
            pic: picdata.url.toString(),
          });
          // setimagePreview(picdata.url.toString());
          console.log(data);
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          pic: data.pic,
          registerDate: new Date().getMonth(),
        }),
      });

      const jsonRes = await response.json();

      console.log(jsonRes);

      if (jsonRes.id) {
        setLoading(false);

        localStorage.setItem("useremail", jsonRes.email);
        localStorage.setItem("userid", jsonRes.id);
        localStorage.setItem("username", jsonRes.name);
        localStorage.setItem("userpic", jsonRes.pic);
        localStorage.setItem("usertoken", jsonRes.token);

        navigate("/");
        window.location.reload();
        toast.success("Signup Success");

      } else {
        toast.error(`${jsonRes.errMessage}`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="name"
            className="form-control input-form"
            placeholder="Enter your username"
            onChange={handleData}
            value={data.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control input-form"
            name="email"
            placeholder="Enter your email"
            onChange={handleData}
            value={data.email}
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
            onChange={handleData}
            value={data.password}
          />
          <div className="eyeBtn" onClick={handlePassword}>
            {show ? <IoEye /> : <IoEyeOff />}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Choose Profile Picture
          </label>
          <input
            type="file"
            className="form-control input-form"
            accept="image/*"
            onChange={(e) => postImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className={`form-btn ${loading ? "disabled-btn" : ""}`}
        >
          {loading ? <div className="loading-circle"></div> : "Sign Up"}
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

export default Signup;
