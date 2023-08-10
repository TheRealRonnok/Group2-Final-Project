// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
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

// GET USER BY ID FUNCTION
async function getUserById(userId) {
  try {
    console.log("Inside getUserById.");
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT id, username
        FROM users
        WHERE id=${userId};
      `
    );

    if (!user) {
      console.log("No User found - Inside getUserById.");
      return null;
    }

    return user;
  } catch (error) {
    console.log("Error getting User By Id.");
    throw error;
  }
}

// GET USER BY USERNAME FUNCTION
async function getUserByUsername(userName) {
  try {
    console.log("Inside getUserByUsername.");
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=${userName};
      `
    );

    if (!user) {
      console.log("No User found - Inside getUserByUsername.");
      return null;
    }

    return user;
  } catch (error) {
    console.log("Error getting User By Username.");
    throw error;
  }
}

// UPDATE USER BY ID
async function updateUser({ id, ...fields }) {
  // Build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  console.log("Inside updateUser, String set to: ", setString);

  // Return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    console.log("Inside updateUser.");
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    if (!user) {
      console.log("No User to Update - Inside updateUser.");
      return null;
    }

    // Return the updated user
    return user;
  } catch (error) {
    console.log("Error updating User.");
    throw error;
  }
}

// DELETE USER BY ID
async function deleteUser(id) {
  console.log("Inside deleteUser.");

  try {
    const { user } = await client.query(`
        DELETE FROM users
        WHERE id=${id};
      `);

    console.log("Successfully deleted user.");

    return user;
  } catch (error) {
    console.log("Error deleting user.");
    throw error;
  }
}
