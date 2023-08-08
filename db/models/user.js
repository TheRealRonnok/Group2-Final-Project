// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    console.log("Inside getAllUsers.");
    const { user } = await client.query(
      `
        SELECT *
        FROM users;
      `
    );

    if (!user) {
      console.log("No user found - Inside getAllUsers.");
      return null;
    }

    user.password = null;

    return user;
  } catch (error) {
    console.log("Error getting All Users.");
    throw error;
  }
}
