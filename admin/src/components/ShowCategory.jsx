import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowCategory = () => {
  const [CategoryData, setCategoryData] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryData, setEditingCategoryData] = useState({
    CategoryName: '',
    image: null
  });

  const ToastError = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const ToastSuccess = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showcategory");
      const data = response.data;
      if (data.success) {
        setCategoryData(data.data);
       
      } else {
        console.error("Error fetching category data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [CategoryData]);

  const deleteItem = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/api/deletecategory/${id}`);
      if (result.data.success) {
        setCategoryData(CategoryData.filter(item => item._id !== id));
        toast.success(result.data.deleteSuccmessage, ToastSuccess);
        console.log("Category deleted successfully");
      } else {
        toast.error(result.data.deleteErrmessage, ToastError);
        console.error("Error deleting category:", result.data.error);
      }
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  const updateCategory = async (id) => {
    const formData = new FormData();
    formData.append('CategoryName', editingCategoryData.CategoryName);
    if (editingCategoryData.image) {
      formData.append('image', editingCategoryData.image);
    }

    try {
      const result = await axios.put(`http://localhost:5000/api/updatecategory/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (result.data.success) {
        setCategoryData(CategoryData.map(item => (item._id === id ? result.data.data : item)));
        setEditingCategoryId(null);
        toast.success(result.data.updateSuccmessage, ToastSuccess);
        console.log("Category updated successfully");
      } else {
        toast.error(result.data.updateErrmessage, ToastError);
        console.error("Error updating category:", result.data.error);
      }
    } catch (error) {
      console.error("Update category error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCategoryData({ ...editingCategoryData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditingCategoryData({ ...editingCategoryData, image: e.target.files[0] });
  };

  const handleUpdateClick = (category) => {
    setEditingCategoryId(category._id);
    setEditingCategoryData({
      CategoryName: category.CategoryName,
      image: null
    });
  };

  const handleCancelClick = () => {
    setEditingCategoryId(null);
    setEditingCategoryData({
      CategoryName: '',
      image: null
    });
  };

  return (
    <div className="container" style={{width: "140%", marginLeft: "5px"}}>
      <h1 style={{ color: 'green', marginRight: "-60%" }}>Category List</h1>
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'scroll',width: "180vh" }}>
        <table className="table table-striped" style={{maxWidth: "90%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Image</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CategoryData.map((category, index) => (
              <tr key={category._id}>
                {editingCategoryId === category._id ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="CategoryName"
                        value={editingCategoryData.CategoryName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'green', borderRadius: '10px' }}
                        onClick={() => updateCategory(category._id)}
                      >
                        Save
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'gray', borderRadius: '10px' }}
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{category.CategoryName}</td>
                    <td>
                      <img
                        src={category.image}
                        alt={category.CategoryName}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}
                        onClick={() => deleteItem(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ backgroundColor: 'green', color: 'white', borderRadius: '10px' }}
                        onClick={() => handleUpdateClick(category)}
                      >
                        Update
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default ShowCategory;
