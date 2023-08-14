const client = require("../client");

module.exports = {
  createActionFigure,
  getAllFigures,
  getFiguresByUser,
};

async function createActionFigure({ name, description, price }) {
  try {
    console.log("Inside createActionFigure");
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO actionfigures(name, description, price) 
        VALUES($1, $2, $3) 
        ON CONFLICT (name) DO NOTHING 
        RETURNING *;
      `,
      [name, description, price]
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
      SELECT * FROM actionfigures;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getFiguresByUser(userId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM actionfigures
      WHERE "userId"=${userId};
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}
