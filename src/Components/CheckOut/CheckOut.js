import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
// import "./Checkout.css";

const CheckOut = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const email = "sakibalhassan@gmail.com";

  const handleCheckout = () => {
    console.log(email, "Do checkout", id);

    const orderInfo = {
      email: email,
      productId: id,
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
            <tr>
              <td className="text-left">Ruchi Chanachur</td>
              <td className="text-center">1 Piece</td>
              <td className="text-right">৳ 50</td>
            </tr>

            <tr>
              <td className="text-left">Rupchanda Fortified Soybean Oil</td>
              <td className="text-center">5 Liter</td>
              <td className="text-right">৳ 700</td>
            </tr>

            <tr style={{ borderTop: "1px solid rgba(0,0,0,0.25)" }}>
              <td className="text-left" colSpan="2">
                Total
              </td>
              <td className="text-right">৳ 750</td>
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
