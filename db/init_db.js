const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

async function buildTables() {
  try {
    client.connect();

    console.log("DROP TABLES SECTION");
    // Drop all tables, in the correct order
    try {
      console.log("Starting to drop tables...");

      await client.query(`
      DROP TABLE IF EXISTS actionfigures;
      DROP TABLE IF EXISTS users;
    `);

      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }

    // Build tables in correct order
    try {
      console.log("Starting to build tables...");

      // Create all tables, in the correct order
      await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
        );
      `);

      await client.query(`
        CREATE TABLE actionfigures (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2)
        );
      `);
    } catch (error) {
      console.log("Error building tables!");
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    // Create Initial User Data
    const usersToCreate = [
      { username: "bob", password: "bob99" },
      { username: "kenny", password: "kenny123" },
      { username: "elise", password: "elise321" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    const productsToCreate = [
      { username: "bob", password: "bob99" },
      { username: "kenny", password: "kenny123" },
      { username: "elise", password: "elise321" },
    ];
    const products = await Promise.all(usersToCreate.map(createProduct));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
