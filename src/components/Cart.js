import React, { useState, useEffect } from "react";

function displayOrderDetails(detail) {
  console.log("Inside displayOrder", detail);
  return (
    <>
      {/* Order ID */}
      {detail.orderid ? (
        <h2>Product ID: {detail.orderid}</h2>
      ) : (
        <h2>Product ID not found</h2>
      )}
      {/* Product Title */}
      {detail.title ? (
        <h2>Product Price: {detail.title}</h2>
      ) : (
        <h2>Product Price not found</h2>
      )}
      {/* Product ID */}
      {detail.productid ? (
        <h2>Product Title: {detail.productid}</h2>
      ) : (
        <h2>Product Title not found</h2>
      )}
      {/* Image */}
      {detail.imgurl ? (
        <img src={detail.imgurl} alt={detail.title} />
      ) : (
        <h2>No picture found D:</h2>
      )}
      {/* Quantity */}
      {detail.quantity ? (
        <h2>Product Description: {detail.quantity}</h2>
      ) : (
        <h2>Product Description not found</h2>
      )}
      {/* Product Price */}
      {detail.price ? (
        <h2>Product Price: {detail.price}</h2>
      ) : (
        <h2>Product Price not found</h2>
      )}
      <hr></hr>
    </>
  );
}

const Cart = () => {
  const [order, setOrder] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  // const username = localStorage.getItem("user");
  const username = "Konnor";

  console.log("username = ", username);

  useEffect(() => {
    async function fetchOrder() {
      console.log(username);
      try {
        const response = await fetch(`api/orders/${username}`);
        const result = await response.json();
        const orderData = result.userOrders;

        console.log("Result is : ", result);
        console.log("Result.userOrders is : ", result.userOrders);
        console.log("Result.0 is : ", result.userOrders[0]);
        console.log("orderData is : ", orderData);
        if (orderData?.length > 0) {
          setOrder(orderData[0]);
        } else {
          setOrder([]);
        }
      } catch (error) {
        console.error("Failed to fetch Order for user.");
      }
    }
    fetchOrder();
    console.log("The order is ", order);
    console.log("The details are ", order.orderdetails);
    setForceRender(false);
  }, [forceRender]);

  if (Array.isArray(order)) {
    return <h1>No Order to Display! D:</h1>;
  }

  return (
    <section>
      <h1>Your Cart:</h1>
      <hr></hr>
      <div>Your Order ID is: {order.id}</div>
      <div>Your Status is: {order.status}</div>
      <div>
        {order.orderdetails.map((item, idx) => (
          <div key={idx}>{displayOrderDetails(item)}</div>
        ))}
      </div>
    </section>
  );
};

export default Cart;
