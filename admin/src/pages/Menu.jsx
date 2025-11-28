import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [Food, setFood] = useState({
    FoodName: "",
    FoodPrice: "",
    Quantities: "",
    FoodAbout: "",
    image: null,
    FoodCategory: "",
    FoodStatus: "Available",
  });
  const [CategoryData, setCategoryData] = useState([]);

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue ? `₹${formattedValue}` : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/showcategory"
        );
        const data = response.data;
        if (data.success) {
          setCategoryData(data.data);
          // console.log("Fetched category data:", data.data);
        } else {
          console.error("Error fetching category data:", data.error);
        }
      } catch (error) {
        console.error("Fetch data error:", error);
      }
    };

    fetchData();
  }, [CategoryData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "FoodPrice") {
      const formattedPrice = formatPrice(value);
      setFood({ ...Food, FoodPrice: formattedPrice });
    } else if (name === "image") {
      setFood({ ...Food, image: files[0] });
    } else {
      setFood({ ...Food, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("FoodName", Food.FoodName);
      formData.append("FoodPrice", Food.FoodPrice.replace(/[^\d]/g, ""));
      formData.append("Quantities", Food.Quantities);
      formData.append("FoodAbout", Food.FoodAbout);
      formData.append("image", Food.image);
      formData.append("FoodCategory", Food.FoodCategory);
      formData.append("FoodStatus", Food.FoodStatus);

      const response = await axios.post(
        "http://localhost:5000/api/Addmenu",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setFood({
          FoodName: "",
          FoodPrice: "",
          Quantities: "",
          FoodAbout: "",
          image: null,
          FoodCategory: "",
          FoodStatus: "Available",
        });
      } else {
        toast.error(response.data.error || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to submit data");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container" style={{ marginLeft: "0%" }}>
      <h2 className="header" style={{ color: "green" }}>
        Add Menu to Category
      </h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Dish Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Dish Name"
            name="FoodName"
            value={Food.FoodName}
            onChange={handleChange}
          />
        </div>
        <div className="input-group mt-4 col-md-6">
          <span className="input-group-text">₹</span>
          <input
            type="text"
            className="form-control"
            placeholder="price"
            name="FoodPrice"
            value={Food.FoodPrice}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">About</label>
          <input
            type="text"
            className="form-control"
            placeholder="Testing the feeling.."
            name="FoodAbout"
            value={Food.FoodAbout}
            onChange={handleChange}
          />
        </div>
        <div className="col-8">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            placeholder="Upload image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="col-8">
          <label className="form-label">Quantities</label>
          <input
            type="text"
            name="Quantities"
            className="form-control"
            placeholder="Add Quantities"
            value={Food.Quantities}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">
            Food Category
          </label>
          <select
            id="inputState"
            className="form-select"
            name="FoodCategory"
            value={Food.FoodCategory}
            onChange={handleChange}
          >
            <option>Choose...</option>
            {CategoryData.map((category, index) => (
              <option key={index} value={category.name}>
                {category.CategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="FoodStatus"
            value={Food.FoodStatus}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "green" }}
          >
            Add
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Menu;
