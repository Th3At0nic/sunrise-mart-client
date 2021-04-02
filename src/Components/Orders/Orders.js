import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import ShowMyOrders from "../ShowMyOrders/ShowMyOrders";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const email = loggedInUser.email;

  //Getting Orders based on email
  useEffect(() => {
    const url = `https://evening-harbor-99368.herokuapp.com/showMyOrders/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data) {
          setOrders(data);
        }
      });
  }, [email]);

  return (
    <div className="container checkout-area">
      <h2>My orders: {orders.length}</h2>
      <div className="custom-wrapper" id="checkoutWrapper">
        <table className="table table-striped custom-checkout-table">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.25)" }}>
              <th className="text-left" scope="col">
                Date
              </th>
              <th className="text-right" scope="col">
                Price
              </th>
              <th className="text-right" scope="col">
                Discount
              </th>
              <th className="text-right" scope="col">
                Delivery Charge
              </th>
              <th className="text-right" scope="col">
                Total
              </th>
              <th className="text-center" scope="col">
                Quantity
              </th>
              <th className="text-center" scope="col">
                Payment Type
              </th>
              <th className="text-center" scope="col">
                Order Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <ShowMyOrders dataObject={order}></ShowMyOrders>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
