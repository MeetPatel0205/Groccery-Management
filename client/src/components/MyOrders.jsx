import React, { useEffect, useState } from "react";
import Header from "./Header";

const MyOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      let response = await fetch("http://localhost:5000/api/userorderdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("useremail"),
        }),
      });

      let jsonRes = await response.json();

      if (jsonRes.myData != null) {
        console.log([jsonRes]);
        setOrderData([jsonRes]);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <p
          style={{
            fontSize: "xx-large",
            borderBottom: "2px solid black",
            display: "inline-block",
            paddingBottom: "2px",
          }}
        >
          Order History
        </p>
        {loading ? (
          <p style={{ fontSize: "20px" }}>Loading...</p>
        ) : orderData.length === 0 ? (
          <p style={{ fontSize: "20px" }}>No orders have been placed yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Image</th>
                <th>Staus</th>
              </tr>
            </thead>
            <tbody>
              {orderData[0].myData.order_data.reverse().map((order, index) => (
                <React.Fragment key={index}>
                  {order.map((item, idx) => (
                    <tr key={idx} className={idx === order.length - 1 ? "order-border" : ""}>
                      <td>{idx == 0 ? item.orderDate : ""}</td>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{(idx != 0) ? `₹${item.price}` : ""}</td>
                      <td>
                        <img src={item.img} alt={item.name} width="50" />
                      </td>
                      <td>{idx == 0 ? item.status : ""}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyOrders;
