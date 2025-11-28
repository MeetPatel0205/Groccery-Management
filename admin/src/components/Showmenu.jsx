import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

const Showmenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemData, setEditingItemData] = useState({
    FoodName: "",
    FoodPrice: "",
    FoodCategory: "",
    FoodStatus: "",
    image: "",
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
      const response = await axios.get("http://localhost:5000/api/showmenu");
      const data = response.data;
      if (data.success) {
        setMenuData(data.data);
        console.log("Fetched menu data:", data.data);
      } else {
        console.error("Error fetching menu data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/deletemenu/${id}`
      );
      if (result.data.success) {
        setMenuData(menuData.filter((item) => item._id !== id));
        toast.success(result.data.deleteSuccmessage, ToastSuccess);
        console.log("Menu item deleted successfully");
      } else {
        toast.error(result.data.deleteErrmessage, ToastError);
        console.error("Error deleting menu item:", result.data.error);
      }
    } catch (error) {
      console.error("Delete menu item error:", error);
    }
  };

  const updateItem = async () => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/updatemenu/${editingItemId}`,
        editingItemData
      );
      if (result.data.success) {
        setMenuData(
          menuData.map((item) =>
            item._id === editingItemId ? result.data.data : item
          )
        );
        setEditingItemId(null);
        toast.success(result.data.updateSuccmessage, ToastSuccess);
        console.log("Menu item updated successfully");
      } else {
        toast.error(result.data.updateErrmessage, ToastError);
        console.error("Error updating menu item:", result.data.error);
      }
    } catch (error) {
      console.error("Update menu item error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItemData({ ...editingItemData, [name]: value });
  };

  const handleUpdateClick = (menu) => {
    setEditingItemId(menu._id);
    setEditingItemData({
      FoodName: menu.FoodName,
      FoodPrice: menu.FoodPrice,
      FoodCategory: menu.FoodCategory,
      FoodStatus: menu.FoodStatus,
      image: menu.image,
    });
  };

  const handleCancelClick = () => {
    setEditingItemId(null);
    setEditingItemData({
      FoodName: "",
      FoodPrice: "",
      FoodCategory: "",
      FoodStatus: "",
      image: "",
    });
  };

  return (
    <div className="container" style={{ width: "180%" }}>
      <h1 style={{ color: "green" }}>Menu List</h1>
      <div
        className="table-responsive"
        style={{
          height: "100vh",
          overflowY: "scroll",
          marginLeft: "-151px",
          width: "180vh",
        }}
      >
        <table className="table table-striped" style={{maxWidth: "90%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Status</th>
              <th colSpan="2" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((menu, index) => (
              <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>
                  {editingItemId === menu._id ? (
                    <input
                      type="text"
                      name="FoodName"
                      value={editingItemData.FoodName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    menu.FoodName
                  )}
                </td>
                <td>
                  {editingItemId === menu._id ? (
                    <input
                      type="text"
                      name="FoodPrice"
                      value={editingItemData.FoodPrice}
                      onChange={handleInputChange}
                    />
                  ) : (
                    menu.FoodPrice
                  )}
                </td>
                <td>
                  {editingItemId === menu._id ? (
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleInputChange}
                    />
                  ) : (
                    <img
                      src={menu.image}
                      alt={menu.FoodName}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </td>
                <td>
                  {editingItemId === menu._id ? (
                    <input
                      type="text"
                      name="FoodCategory"
                      value={editingItemData.FoodCategory}
                      onChange={handleInputChange}
                    />
                  ) : (
                    menu.FoodCategory
                  )}
                </td>
                <td>
                  {editingItemId === menu._id ? (
                    <select
                      name="FoodStatus"
                      value={editingItemData.FoodStatus}
                      onChange={handleInputChange}
                    >
                      <option value="Available">Available</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  ) : (
                    menu.FoodStatus
                  )}
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    onClick={() => {
                      if (editingItemId === menu._id) {
                        updateItem();
                      } else {
                        handleUpdateClick(menu);
                      }
                    }}
                  >
                    {editingItemId === menu._id ? "Save" : "Update"}
                  </button>
                </td>
                <td>
                  {editingItemId !== menu._id && (
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "10px",
                      }}
                      onClick={() => deleteItem(menu._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Showmenu;
