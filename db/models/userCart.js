// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createUserCartItem,
  updateUserItemQuantity,
  deleteUserCartItem,
};

// CREATE USER CART ITEM
async function createUserCartItem({
  userID,
  productID,
  quantity,
  status,
  date,
}) {
  try {
    console.log("Inside createUserCartItem.");
    const {
      rows: [userCartItem],
    } = await client.query(
      `
        INSERT INTO userorders("userId", "productId", quantity, status, "datePlaced") 
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [userID, productID, quantity, status, date]
    );

    return userCartItem;
  } catch (error) {
    console.log("Error adding to User's Cart.");
    throw error;
  }
}

// ADJUST USER CART ITEM
async function updateUserItemQuantity({ productID, quantity }) {
  try {
    console.log("Inside updateUserItemQuantity.");
    const {
      rows: [userCartItem],
    } = await client.query(
      `
          UPDATE userorders
          SET quantity=${quantity}
          WHERE "productId"=${productID};
        `
    );

    console.log("Successfully updated User Item Quantity!");

    return userCartItem;
  } catch (error) {
    console.log("Error updating User's Item Quantity.");
    throw error;
  }
}

// DELETE ITEM IN USERS CART
async function deleteUserCartItem(productID) {
  console.log("Inside deleteUserCartItem.");

  try {
    const { userCartItem } = await client.query(`
          DELETE FROM userorders
          WHERE "productId"=${productID};
        `);

    console.log("Successfully deleted user's cart item.");

    return userCartItem;
  } catch (error) {
    console.log("Error deleting user's cart item.");
    throw error;
  }
}
