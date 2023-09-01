// grab our db client connection to use with our adapters
const client = require("../client");
const { getUserByUsername, getUserById } = require("./user");

module.exports = {
  createOrder,
  getAllOrders,
  addDetailtoOrder,
  getAllOrdersByUser,
  getOrderByOrderID,
  deleteOrder,
};

// CREATE USER CART ITEM
async function createOrder({ userID, status, lastUpdate }) {
  try {
    console.log("Inside createOrder.");
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders (userID, status, lastUpdate) 
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

// Return array of orders for the user (no details, just the orders)
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
      SELECT orders.id, status, userId, u.username, lastUpdate
      FROM orders
      JOIN users u ON u.id=orders.userId;
    `);

    return orders;
  } catch (error) {
    throw error;
  }
}

// Attach details to an order
async function addDetailtoOrder(orders) {
  try {
    console.log("Inside addDetailtoOrder.");
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
      let _user = await getUserById(orders[i].userid);
      orders[i].username = _user.username;

      let orderid = orders[i].id;

      let { rows: orderdetails } = await client.query(`
        SELECT
        od.orderId AS orderId,
        od.productId AS productId,
        od.quantity AS quantity,
        od.price AS price,
        prod.title AS title,
        prod.imgURL AS imgURL
        FROM orderdetails AS od
        JOIN products prod ON prod.id=od.productId
        WHERE od.orderId=${orderid};
      `);

      orders[i].orderdetails = orderdetails;
      console.log(orders[i].orderdetails);
    }
    return;
  } catch (error) {
    throw error;
  }
}

// Get all Orders By User
async function getAllOrdersByUser({ username }) {
  try {
    console.log("Inside getAllOrdersByUser.");
    const user = await getUserByUsername(username);

    const { rows: orders } = await client.query(
      `SELECT * FROM orders WHERE userID = ${user.id};`
    );
    console.log(orders);
    await addDetailtoOrder(orders);
    console.log(orders);
    return orders;
  } catch (error) {
    throw error;
  }
}

// Get all Orders By User
async function getOrderByOrderID({ id }) {
  try {
    const { rows: orders } = await client.query(
      `SELECT * FROM orders WHERE id = ${id};`
    );

    await addDetailtoOrder(orders);

    return orders;
  } catch (error) {
    throw error;
  }
}

// DELETE ORDER
async function deleteOrder(orderID) {
  console.log("Inside deleteOrder.");

  try {
    const { order } = await client.query(`
          DELETE FROM orders
          WHERE id = ${orderID};
        `);

    console.log("Successfully deleted Order.");

    return order;
  } catch (error) {
    console.log("Error deleting order.");
    throw error;
  }
}
