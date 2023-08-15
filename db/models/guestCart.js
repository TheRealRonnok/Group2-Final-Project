const client = require("../client");

// create guest cart items
async function createGuestCartItem({ productID, quantity, status, date }) {
  try {
    console.log("Inside createGuestCartItem.");
    const {
      rows: [guestCartItem],
    } = await client.query(
      `
        INSERT INTO guestorder("productId", quantity, status, "datePlaced") 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `,
      [productID, quantity, status, date]
    );

    return guestCartItem;
  } catch (error) {
    console.log("Error adding to User's Cart.");
    throw error;
  }
}

// adjust guest cart item
async function updateGuestItemQuantity({ productID, quantity }) {
  try {
    console.log("Inside updateGuestItemQuantity.");
    const {
      rows: [guestCartItem],
    } = await client.query(
      `
          UPDATE guestorder
          SET quantity=${quantity}
          WHERE "productId"=${productID};
        `
    );

    console.log("Successfully updated Guest Item Quantity!");

    return guestCartItem;
  } catch (error) {
    console.log("Error updating Guest's Item Quantity.");
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

module.exports = {
  createGuestCartItem,
  updateGuestItemQuantity,
  deleteGuestCartItem,
};
