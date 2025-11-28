import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Showcategory from "../components/ShowCategory";
import "../index.css";

const FoodCategory = () => {
  const [foodCategory, setFoodCategory] = useState({
    CategoryName: "",
    image: "",
  });
 // const [newCategory, setNewCategory] = useState(null);

  const handleFoodCategory = (e) => {
    if (e.target.name === "image") {
      setFoodCategory({ ...foodCategory, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setFoodCategory({ ...foodCategory, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", foodCategory.image);
      formData.append("CategoryName", foodCategory.CategoryName);

      const response = await axios.post(
        "http://localhost:5000/api/AddCategory",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        // setNewCategory(response.data.category);
        setFoodCategory({ CategoryName: "", image: "" });
      } else {
        toast.error(response.data.error || "An error occurred");
      }
    } catch (error) {
      toast.error("Failed to submit data");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container" style={{marginLeft: '5px'}}>
        <div>
          <h2 className="header" style={{ color: 'green' }}>Add Menu to Category</h2>
          <form id="myForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                className="form-control"
                id="categoryName"
                placeholder="Category Name"
                name="CategoryName"
                value={foodCategory.CategoryName}
                onChange={handleFoodCategory}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                name="image"
                onChange={handleFoodCategory}
              />
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: 'green', color: 'white' }}>
              Add
            </button>
          </form>
        </div>
      
        <ToastContainer />
      </div>

      <div style={{ width: '100%', marginTop: '50px', color: 'green' }}>
      <Showcategory />
    </div>
    </>
  );
};

export default FoodCategory;
