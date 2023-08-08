// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
};

// CREATE USER FUNCTION
async function createUser({ username, password }) {
  try {
    console.log(
      "Inside createUser, Username and Password created: ",
      username,
      password
    );
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password) 
        VALUES($1, $2) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;
      `,
      [username, password]
    );

    user.password = null;

    return user;
  } catch (error) {
    console.log("Error creating user.");
    throw error;
  }
}

// GET ALL USERS FUNCTION
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
