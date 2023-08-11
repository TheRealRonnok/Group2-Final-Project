const client = require("../client");

module.exports = {
    getAllFigures,
    getFiguresByUser,
};

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