import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import ShowCheckoutProduct from "../ShowCheckoutProduct/ShowCheckoutProduct";
// import "./Checkout.css";

const CheckOut = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  //   const email = "sakibalhassan@gmail.com";

  const [checkoutData, setCheckoutData] = useState({});
  //Getting Data based on ID
  useEffect(() => {
    const url = `https://evening-harbor-99368.herokuapp.com/showProductById/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setCheckoutData(data);
        }
      });
  }, [id]);

  const handleCheckout = () => {
    const orderInfo = {
      email: loggedInUser.email,
      productId: id,
      totalPrice: checkoutData.price,
      discount: 0,
      quantity: 1,
      deliveryCharge: 60,
      orderDate: new Date(),
    };

    const url = `https://evening-harbor-99368.herokuapp.com/addOrder`;
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(orderInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const wrapper = document.getElementById("checkoutWrapper");
          wrapper.style.display = "none";
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };

  return (
    <div className="container checkout-area">
      {!success && <h2>Checkout</h2>}
      {success && (
        <>
          <h2 style={{ color: "green" }}>Checkout Successful</h2>
          <Link className="btn btn-success" to="/orders">
            Check Orders
          </Link>
        </>
      )}
      <div className="custom-wrapper" id="checkoutWrapper">
        <table className="table table-borderless custom-checkout-table">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.25)" }}>
              <th className="text-left" scope="col">
                Description
              </th>
              <th className="text-center" scope="col">
                Quantity
              </th>
              <th className="text-right" scope="col">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <ShowCheckoutProduct
              dataObject={checkoutData}
            ></ShowCheckoutProduct>
            <tr style={{ borderTop: "1px solid rgba(0,0,0,0.25)" }}>
              <td className="text-left" colSpan="2">
                Total
              </td>
              <td className="text-right">${checkoutData.price}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleCheckout} className="btn btn-success">
          {" "}
          Checkout{" "}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
