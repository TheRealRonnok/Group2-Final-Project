const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

// Import Adapter Methods for Users
const { createUser } = require("./models/user.js");
// Import Adapter Methods for Action Figures
const { createActionFigure } = require("./models/actionFigure.js");
// Import Adapter Methods for User Cart
const {} = require("./models/userCart.js");

async function buildTables() {
  try {
    client.connect();

    console.log("DROP TABLES SECTION");
    // Drop all tables, in the correct order
    try {
      console.log("Starting to drop tables...");

      await client.query(`
      DROP TABLE IF EXISTS guestorders;
      DROP TABLE IF EXISTS userorders;
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
      console.log("Created users table.");

      await client.query(`
        CREATE TABLE actionfigures (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2)
        );
      `);
      console.log("Created actionfigures table.");

      await client.query(`
        CREATE TABLE userorders (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES actionfigures(id),
          quantity INTEGER NOT NULL DEFAULT 0,
          status varchar(255) DEFAULT 'created',
          "datePlaced" DATE DEFAULT CURRENT_DATE
          );
        `);
      console.log("Created userorders table.");

      await client.query(`
        CREATE TABLE guestorders (
          id SERIAL PRIMARY KEY,
          "guestId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES actionfigures(id),
          quantity INTEGER NOT NULL DEFAULT 0,
          status varchar(255) DEFAULT 'created',
          "datePlaced" DATE DEFAULT CURRENT_DATE
          );
          `);
      console.log("Created guestorders table.");
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
      { username: "tstark", password: "irule3000" },
      { username: "bpanther", password: "wakanda4ever" },
      { username: "murica", password: "freedom123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    // Display Initial Users
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    // Create Initial Products
    const productsToCreate = [
      {
        name: "ironman",
        description:
          "Iron Man in all his glory! Approximately 10 inches tall. (Not capable of actual flight)",
        price: 79.99,
      },
      {
        name: "blackpanther",
        description: "From Avengers: Endgame. Approximately 10 inches tall.",
        price: 89.99,
      },
      {
        name: "captamerica",
        description:
          "The perfect addition to anyone's July 4th collection! Approximately 11 inches tall.",
        price: 84.99,
      },
    ];
    const products = await Promise.all(
      productsToCreate.map(createActionFigure)
    );

    // Display Initial Products
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
