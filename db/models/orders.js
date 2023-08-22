// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = { createOrder, deleteOrder };

// CREATE USER CART ITEM
async function createOrder({ userID, status, lastUpdate }) {
  try {
    console.log("Inside createOrder.");
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", status, "lastUpdate") 
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [userID, status, lastUpdate]
    );

    console.log("Successfully created Order.");
    return order;
  } catch (error) {
    console.log("Error creating Order.");
    throw error;
  }
}

// DELETE ITEM IN USERS CART
async function deleteOrder(orderID) {
  console.log("Inside deleteOrder.");

  try {
    const { order } = await client.query(`
          DELETE FROM orders
          WHERE "id"=${orderID};
        `);

    console.log("Successfully deleted Order.");

    return order;
  } catch (error) {
    console.log("Error deleting order.");
    throw error;
  }
}
