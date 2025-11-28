import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowStaff from "../components/ShowStaff";
const Staff = () => {
    const [staff, setStaff] = useState({
        StaffName: "",
        phone: "",
        age: "",
        work: ""
    });
    const [newStaff, setnewStaff] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post("http://localhost:5000/api/Addstaff", staff, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.message) {
                toast.success(response.data.message);
                setnewStaff(response.data.staff);
                setStaff({
                    StaffName: "",
                    phone: "",
                    age: "",
                    work: ""
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
        <>
        <div className='container' style={{marginLeft: '5px'}}>
        <h2 className='header' style={{ color: 'green' }}>Add Staff</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label className="form-label">Staff Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Staff Name'
                    name="StaffName"
                    value={staff.StaffName}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-8">
                <label className="form-label">Phone No</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder='9876******'
                    name="phone"
                    value={staff.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter age"
                    name="age"
                    value={staff.age}
                    onChange={handleChange}
                />
            </div>

            <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">Work</label>
                <select
                    id="inputState"
                    className="form-select"
                    name="work"
                    value={staff.work}
                    onChange={handleChange}
                >
                    <option value="" disabled>Choose...</option>
                    <option value="Manager">Manager</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Chef">Chef</option>
                    <option value="Waiter">Waiter</option>

                </select>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green' }}>Add</button>
            </div>
        </form>
        <ToastContainer />
    </div>

    <div>
        <ShowStaff newStaff={newStaff}/>
    </div>
        </>
       
    );
};

export default Staff;
