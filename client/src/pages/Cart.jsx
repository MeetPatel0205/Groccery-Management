import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length == 0) {
    return (
      <div className="rescart">
        <div className="m-5 w-100 text-center fs-3">The Cart Is Empty!</div>
      </div>
    );
  }

  let finalTotalprice = data.reduce(
    (total, food) => total + parseInt(food.price),
    0
  );

  return (
    <div>
      <div
        className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md"
        style={{ height: "500px", overflowY: "scroll"}}
      >
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th
                scope="col"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                ID
              </th>
              <th
                scope="col"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Name
              </th>
              <th
                scope="col"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Quantity
              </th>
              <th
                scope="col"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Amount
              </th>
              <th
                scope="col"
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>₹{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Trash2
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                      color="#bb2124"
                      style={{ border: "none", outline: "none" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h6 style={{ fontSize: "22px", marginTop: "40px" }}>
            Final Price: {finalTotalprice}/-
          </h6>
        </div>
        <div>
          <Link to={`/payment/${finalTotalprice}`}>
            <button className="add-to-cart-btn">Check Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
