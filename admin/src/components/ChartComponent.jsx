import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [userData, setUserData] = useState(Array(12).fill(0));
  const [orderData, setOrderData] = useState(Array(12).fill(0));

  const fetchData = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/api/user-registrations');
      const orderResponse = await axios.get('http://localhost:5000/api/user-orderchart');

      // console.log(orderResponse.data);
      // console.log(userResponse.data);

       
      // console.log(orderResponse.data);
      // console.log(userResponse.data);
      const userData = userResponse.data;
      const orderData = orderResponse.data;

      if (userData.success && orderResponse.data.success) {
        // Process user registration data
        const registrationCounts = userData.data.reduce((acc, user) => {
          acc[user.registerDate] = (acc[user.registerDate] || 0) + 1;
          return acc;
        }, Array(12).fill(0));

        // Process order data for each month
        const orderCounts = Array(12).fill(0);
        orderData.data.forEach(monthIndex => {
          // Adjust month index to zero-based
          const adjustedMonthIndex = monthIndex - 1;
          if (adjustedMonthIndex >= 0 && adjustedMonthIndex < 12) {
            orderCounts[adjustedMonthIndex]++;
          }
        });

        setUserData(registrationCounts);
        setOrderData(orderCounts);
      } else {
        console.error('Error fetching data:', userResponse.data.error, orderResponse.data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Users',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: userData
      },
      {
        label: 'Orders',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 255, 0, 0.5)',
        hoverBorderColor: 'rgba(0, 255, 0, 1)',
        data: orderData
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0  
        }
      }
    }
  };

  return (
    <div style={{width: "130vh", height: "100vh"}}>
      <h2>User Growth and Orders</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
