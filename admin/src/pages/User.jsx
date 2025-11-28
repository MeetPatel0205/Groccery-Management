// User.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/table.css" 

const User = () => {
  const [workersData, setWorkersData] = useState([]);

  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showuser");
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
    fetch();
  }, []);

  return (
    <div className="table-container">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {workersData.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.pic} alt={`${user.name}'s profile`} width="50" height="50" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
