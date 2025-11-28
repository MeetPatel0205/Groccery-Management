import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';

const ShowStaff = () => {
  const [workersData, setWorkersData] = useState([]);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [editingStaffData, setEditingStaffData] = useState({
    StaffName: '',
    phone: '',
    age: '',
    work: ''
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
      const response = await axios.get("http://localhost:5000/api/showWorker");
      const data = response.data;
      if (data.success) {
        setWorkersData(data.data);
      } else {
        console.error("Error fetching worker data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workersData]);

  const deletestaff = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/api/deletestaff/${id}`);
      if (result.data.success) {
        setWorkersData(workersData.filter(item => item._id !== id));
        toast.success(result.data.deleteSuccmessage, ToastSuccess);
        console.log("staff deleted successfully");
      } else {
        toast.error(result.data.deleteErrmessage, ToastError);
        console.error("Error deleting staff:", result.data.error);
      }
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  const updateStaff = async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/api/updateStaff/${id}`, editingStaffData);
      if (result.data.success) {
        setWorkersData(workersData.map(item => (item._id === id ? result.data.data : item)));
        setEditingStaffId(null);
        toast.success(result.data.updateSuccmessage, ToastSuccess);
        console.log("staff updated successfully");
      } else {
        toast.error(result.data.updateErrmessage, ToastError);
        console.error("Error updating staff:", result.data.error);
      }
    } catch (error) {
      console.error("Update staff error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingStaffData({ ...editingStaffData, [name]: value });
  };

  const handleUpdateClick = (staff) => {
    setEditingStaffId(staff._id);
    setEditingStaffData({
      StaffName: staff.StaffName,
      phone: staff.phone,
      age: staff.age,
      work: staff.work
    });
  };

  const handleCancelClick = () => {
    setEditingStaffId(null);
    setEditingStaffData({
      StaffName: '',
      phone: '',
      age: '',
      work: ''
    });
  };

  return (
    <div className="container" style={{width: "140%", marginLeft: "5px"}}>
      <h1 style={{ color: 'green', marginRight: "-60%" }}>Staff List</h1>
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'scroll', width: "180vh" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Staff Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Work</th>
              <th colSpan="2" style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workersData.map((staff, index) => (
              <tr key={staff._id}>
                {editingStaffId === staff._id ? (
                  <>
                    <td>{index + 1}</td>
                    <td><input type="text" name="StaffName" value={editingStaffData.StaffName} onChange={handleInputChange} className="form-control" /></td>
                    <td><input type="text" name="phone" value={editingStaffData.phone} onChange={handleInputChange} className="form-control" /></td>
                    <td><input type="text" name="age" value={editingStaffData.age} onChange={handleInputChange} className="form-control" /></td>
                    <td><input type="text" name="work" value={editingStaffData.work} onChange={handleInputChange} className="form-control" /></td>
                    <td><button style={{ backgroundColor: 'green', borderRadius: '10px' }} onClick={() => updateStaff(staff._id)}>Save</button></td>
                    <td><button style={{ backgroundColor: 'gray', borderRadius: '10px' }} onClick={handleCancelClick}>Cancel</button></td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{staff.StaffName}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.age}</td>
                    <td>{staff.work}</td>
                    <td><button style={{ backgroundColor: 'red', borderRadius: '10px' }} onClick={() => deletestaff(staff._id)}>Delete</button></td>
                    <td><button style={{ backgroundColor: 'green', borderRadius: '10px' }} onClick={() => handleUpdateClick(staff)}>Update</button></td>
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

export default ShowStaff;
