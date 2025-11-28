import React, { useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Paymentsuccess = () => {
  const data = useCart();
  const dispatch = useDispatchCart();

  const navigate = useNavigate();

  const handleOrderCheckout = async () => {
    let userEmail = localStorage.getItem("useremail");

    let response = await fetch("http://localhost:5000/api/myorders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        orderData: data,
        orderDate: new Date().toDateString(),
      }),
    });

    let jsonRes = await response.json();

    console.log(jsonRes);

    if (jsonRes.success) {
      navigate("/menu");
      dispatch({ type: "DROP" });
      toast.success("Order Has Been Placed");
    }
  };

  useEffect(() => {
    handleOrderCheckout();
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
      Payment Success...
    </h5>
  );
};

export default Paymentsuccess;
