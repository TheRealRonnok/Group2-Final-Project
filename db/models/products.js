const client = require("../client");

module.exports = {
  createActionFigure,
  getAllFigures,
  getFiguresByUser,
};

async function createActionFigure({
  isActive,
  title,
  description,
  price,
  imgURL,
}) {
  try {
    console.log("Inside createActionFigure");
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products("isActive", title, description, price, imgURL) 
        VALUES($1, $2, $3, $4, $5) 
        ON CONFLICT (title) DO NOTHING 
        RETURNING *;
      `,
      [isActive, title, description, price, imgURL]
    );

    return product;
  } catch (error) {
    console.log("Error creating product.");
    throw error;
  }
}

async function getAllFigures() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getFiguresByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products
      WHERE "userId"=${userId};
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
