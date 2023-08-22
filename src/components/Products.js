import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:4000";

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function displayProduct(input) {
  return (
    <>
      {/* Product ID */}
      {input.id ? (
        <h2>Product ID: {input.id}</h2>
      ) : (
        <h2>Product ID not found</h2>
      )}

      {/* Product Name */}
      {input.name ? (
        <h2>Product Name: {input.name}</h2>
      ) : (
        <h2>Product Name not found</h2>
      )}

      {/* Product Description */}
      {input.description ? (
        <h2>Product Description: {input.description}</h2>
      ) : (
        <h2>Product Description not found</h2>
      )}

      {/* Product Price */}
      {input.price ? (
        <h2>Product Price: {input.price}</h2>
      ) : (
        <h2>Product Price not found</h2>
      )}
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  const getAPIProducts = async () => {
    let result = await getProducts();
    setProducts(result);
  };

  useEffect(() => {
    getAPIProducts();
    setForceRender(false);
  }, [forceRender]);

  return (
    <section>
      <div>Products Page!</div>
      <div>
        {products.map((item, idx) => (
          <div key={idx}>{displayProduct(item)}</div>
        ))}
      </div>
    </section>
  );
}

export default Products;
