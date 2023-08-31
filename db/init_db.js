const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");

// Import Adapter Methods for Users
const { createUser } = require("./models/user.js");
// Import Adapter Methods for Products
const { createActionFigure } = require("./models/products.js");
// Import Adapter Methods for Orders
const { createOrder } = require("./models/orders.js");
// Import Adapter Methods for Order Details
const { addItemToOrder } = require("./models/orderdetails.js");

async function buildTables() {
  try {
    client.connect();

    console.log("DROP TABLES SECTION");
    // Drop all tables, in the correct order
    try {
      console.log("Starting to drop tables...");

      await client.query(`
      DROP TABLE IF EXISTS orderdetails;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users cascade;
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
        password varchar(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false
        );
      `);
      console.log("Created users table.");

      await client.query(`
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          isActive BOOLEAN DEFAULT true,
          title varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10,2),
          imgURL varchar(255)
        );
      `);
      console.log("Created products table.");

      await client.query(`
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          userID INTEGER REFERENCES users(id),
          status varchar(50) NOT NULL,
          lastUpdate DATE DEFAULT CURRENT_DATE
          );
        `);
      console.log("Created orders table.");

      await client.query(`
        CREATE TABLE orderdetails (
          orderId INTEGER NOT NULL REFERENCES orders(id),
          productId INTEGER NOT NULL REFERENCES products(id),
          quantity INTEGER NOT NULL DEFAULT 0,
          price DECIMAL (10,2),
          PRIMARY KEY (orderId, productId)
        );
      `);
      console.log("Created order details table.");
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
      {
        username: "tstark",
        password: "irule3000",
        isAdmin: false,
      },
      {
        username: "bpanther",
        password: "wakanda4ever",
        isAdmin: false,
      },
      {
        username: "murica",
        password: "freedom123",
        isAdmin: false,
      },
      {
        username: "user4",
        password: "user4123",
        isAdmin: false,
      },
      {
        username: "Konnor",
        password: "konnor123",
        isAdmin: true,
      },
      {
        username: "Jerikka",
        password: "jerikka123",
        isAdmin: true,
      },
      {
        username: "Ion",
        password: "ion123",
        isAdmin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    // Display Initial Users
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");

    // Create Initial Products
    const productsToCreate = [
      {
        isActive: true,
        title: "ironman",
        description:
          "Iron Man in all his glory! Approximately 10 inches tall. (Not capable of actual flight)",
        price: 79.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "blackpanther",
        description: "From Avengers: Endgame. Approximately 10 inches tall.",
        price: 89.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "captamerica",
        description:
          "The perfect addition to anyone's July 4th collection! Approximately 11 inches tall.",
        price: 84.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product4",
        description: "Product 4",
        price: 8.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product5",
        description: "Product 5",
        price: 4.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product6",
        description: "Product 6",
        price: 6.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product7",
        description: "Product 7",
        price: 74.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product8",
        description: "Product 8",
        price: 88.99,
        imgURL: "",
      },
      {
        isActive: true,
        title: "product9",
        description: "Product 9",
        price: 90.99,
        imgURL: "",
      },
      {
        isActive: false,
        title: "product10",
        description: "Product 10",
        price: 100.0,
        imgURL: "",
      },
    ];
    const products = await Promise.all(
      productsToCreate.map(createActionFigure)
    );

    // Display Initial Products
    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");

    // Create Initial Orders
    const ordersToCreate = [
      {
        userID: 1,
        status: "CURRENT",
      },
      {
        userID: 2,
        status: "CURRENT",
      },
      {
        userID: 3,
        status: "CURRENT",
      },
      {
        userID: 4,
        status: "PURCHASED",
      },
      {
        userID: 5,
        status: "CURRENT",
      },
      {
        userID: 6,
        status: "CURRENT",
      },
      {
        userID: 7,
        status: "CURRENT",
      },
    ];
    const orders = await Promise.all(ordersToCreate.map(createOrder));

    // Display Initial Orders
    console.log("Orders created:");
    console.log(orders);
    console.log("Finished creating orders!");

    // Create Initial Order Details
    const orderDetailsToCreate = [
      {
        orderId: 1,
        productId: 1,
        quantity: 1,
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 2,
      },
      {
        orderId: 3,
        productId: 3,
        quantity: 3,
      },
      {
        orderId: 4,
        productId: 4,
        quantity: 4,
      },
      {
        orderId: 5,
        productId: 5,
        quantity: 5,
      },
      {
        orderId: 6,
        productId: 6,
        quantity: 6,
      },
      {
        orderId: 7,
        productId: 7,
        quantity: 7,
      },
    ];
    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(addItemToOrder)
    );

    // Display Initial Order Details
    console.log("Order Details created:");
    console.log(orderDetails);
    console.log("Finished creating orders details!");
  } catch (error) {
    console.error("Error seeding database!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
