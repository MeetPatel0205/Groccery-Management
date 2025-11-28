import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentRestaurant = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("useremail");

  const handlePayment = async () => {
    const data = await fetch(`http://localhost:5000/api/payment?id=${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonRes = await data.json();
    // console.log(jsonRes);

    const getid = await fetch("http://localhost:5000/getid", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const finalId = await getid.json();

    // console.log(finalId);

    const options = {
      key: finalId.key_id,
      amount: jsonRes.resultData.amount,
      currency: "INR",
      name: "Grocery Hub",
      description: "Demo Transaction",
      order_id: jsonRes.resultData.id,
      callback_url: "http://localhost:5000/api/paymentverification",
      prefill: {
        name: userName,
        email: userEmail,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return (
    <h5
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      Loading...
    </h5>
  );
};

export default PaymentRestaurant;
