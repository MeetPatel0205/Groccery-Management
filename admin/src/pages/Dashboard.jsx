// Dashboard.js
import React, { useEffect, useState } from 'react';
import '../style/dashboardStyles.css';
import ChartComponent from '../components/ChartComponent';
import axios from 'axios';
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderSum, setOrderSum] = useState(0);

  const [userData, setUserData] = useState(0);
  const [staffData, setStaffData] = useState(0);



  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showorder");
      const data = response.data;
      if (data.success) {
        const orders = data.data.map((item) => item.order_data.length);
        setOrderData(orders);

        const sum = orders.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        setOrderSum(sum);
      } else {
        console.error("Error fetching menu data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };


  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showuser");
      const data = response.data;
      if (data.success) {
        const users = data.data.length;
        setUserData(users);
      } else {
        console.error("Error fetching menu data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/showWorker");
      const data = response.data;
      if (data.success) {
        const users = data.data.length;
        setStaffData(users);
      } else {
        console.error("Error fetching menu data:", data.error);
      }
    } catch (error) {
      console.error("Fetch data error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
    fetchStaffData();
  }, []);

  return (
    <div className="dashboard-container">

      <div className='main-poster'>
        <Link to={"/user"} style={{ textDecoration: "none" }}>
          <div className="poster red">
            <h2>{userData} Users</h2>
            <p>Manage your users here</p>
          </div>
        </Link>

        <Link to={"/order"} style={{ textDecoration: "none" }}>
          <div className="poster green">
            <h2>{orderSum} Orders</h2>
            <p>Manage your orders here</p>
          </div>
        </Link>

        <Link to={"/staff"} style={{ textDecoration: "none" }}>
          <div className="poster green">
            <h2>{staffData} Staff</h2>
            <p>Manage your staff here</p>
          </div>
        </Link>
      </div>
      <div className="chart-container">
        <ChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
