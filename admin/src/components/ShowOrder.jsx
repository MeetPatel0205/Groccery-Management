import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../style/order.css";

const ShowOrder = () => {
    const [orderData, setOrderData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/showorder");
            const data = response.data;
            if (data.success) {
                setOrderData(data.data);
            } else {
                console.error("Error fetching menu data:", data.error);
            }
        } catch (error) {
            console.error("Fetch data error:", error);
        }
    };

    const updateOrderStatus = async (email, orderIndex, status) => {
        try {
            const response = await axios.put("http://localhost:5000/api/updateorder", { email, orderIndex, status });
            if (response.status === 200) {
                setOrderData(prevOrderData => 
                    prevOrderData.map(order => {
                        if (order.email === email) {
                            order.order_data[orderIndex][0].status = status;
                        }
                        return order;
                    })
                );
            } else {
                console.error("Error updating order status:", response.data.error);
            }
        } catch (error) {
            console.error("Update status error:", error);
        }
    };

    const handleAccept = async (email, orderIndex) => {
        updateOrderStatus(email, orderIndex, "Completed");
    };

    const handleReject = async (email, orderIndex) => {
        updateOrderStatus(email, orderIndex, "Rejected");
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Order Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Items</th>
                        <th colSpan="2">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.map((order, index) => (
                        <React.Fragment key={index}>
                            {order.order_data.map((orderDetail, idx) => (
                                <tr key={`${index}-${idx}`}>
                                    <td>{order.email}</td>
                                    <td>{orderDetail[0].orderDate}</td>
                                    <td>{orderDetail[0].status}</td>
                                    <td>
                                        <table className="nested-table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th>Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetail.slice(1).map((item, itemIdx) => (
                                                    <tr key={itemIdx}>
                                                        <td>{item.name}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{item.price}</td>
                                                        <td>
                                                            <img src={item.img} alt={item.name} width="50" height="50" />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <button style={{ backgroundColor: "green", color: "white" }} onClick={() => handleAccept(order.email, idx)}>
                                            Accept
                                        </button>
                                    </td>
                                    <td>
                                        <button style={{ backgroundColor: "red", color: "white" }} onClick={() => handleReject(order.email, idx)}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowOrder;
