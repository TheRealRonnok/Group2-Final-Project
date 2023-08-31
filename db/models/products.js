const client = require("../client");

module.exports = {
  createActionFigure,
  getAllFigures,
  getAllActiveFigures,
  updateProduct,
  deactivateProduct,
  activateProduct,
};

// Create a new Action Figure to sell
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
        INSERT INTO products(isActive, title, description, price, imgURL) 
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

// Returns all action figures
async function getAllFigures() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM products;
    `);

    console.log({ rows });

    return rows;
  } catch (error) {
    throw error;
  }
}

// Return all ACTIVE action figures
async function getAllActiveFigures() {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products
      WHERE isActive=TRUE;
    `);

    return products;
  } catch (error) {
    throw error;
  }
}

// Update a product
async function updateProduct() {
  try {
    const productFields = [
      "isActive",
      "title",
      "description",
      "price",
      "imgURL",
    ];

    const updateFields = [];
    const values = [id];

    productFields.forEach((field) => {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = $${values.length + 1}`);
        values.push(updates[field]);
      }
    });

    const {
      rows: [product],
    } = await client.query(
      `
      UPDATE products
      SET ${updateFields.join(", ")}
      WHERE id = $1
      RETURNING *;
      `,
      values
    );

    return product;
  } catch (error) {
    throw error;
  }
}

// Deactivate a product
async function deactivateProduct(id) {
  try {
    const updates = {
      isActive: false,
    };

    const deactivatedProduct = await updateProduct(id, update);

    return deactivatedProduct;
  } catch (error) {
    throw error;
  }
}

// Activate a product
async function activateProduct(id) {
  try {
    const updates = {
      isActive: true,
    };

    const deactivatedProduct = await updateProduct(id, update);

    return deactivatedProduct;
  } catch (error) {
    throw error;
  }
}
