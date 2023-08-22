const client = require("../client");

module.exports = {
  addDetailToOrder,
};

// Add an item to the order
async function addDetailToOrder({ orderId, productId, quantity, price }) {
  try {
    console.log("Inside addDetailToOrder.");
    const {
      rows: [orderDetail],
    } = await client.query(
      `
        INSERT INTO orderdetails("orderId", "productId", quantity, price) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [orderId, productId, quantity, price]
    );

    return orderDetail;
  } catch (error) {
    console.log("Error adding detail to order.");
    throw error;
  }
}

// delete item in guest's cart
async function deleteGuestCartItem(productID) {
  console.log("Inside deleteGuestCartItem.");

  try {
    const { guestCartItem } = await client.query(`
          DELETE FROM userorders
          WHERE "productId"=${productID};
        `);

    console.log("Successfully deleted user's cart item.");

    return guestCartItem;
  } catch (error) {
    console.log("Error deleting guest's cart item.");
    throw error;
  }
}
