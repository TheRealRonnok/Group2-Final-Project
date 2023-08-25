import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:4000";

function displayProduct(input) {
  return (
    <>
      {console.log("Inside displayProduct")}
      {/* Product ID */}
      {input.id ? (
        <h2>Product ID: {input.id}</h2>
      ) : (
        <h2>Product ID not found</h2>
      )}
      {/* Product Name */}
      {input.title ? (
        <h2>Product Title: {input.title}</h2>
      ) : (
        <h2>Product Title not found</h2>
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
      <button className="bg-gray-300 p-1 m-2">Add to Cart</button>
      <hr></hr>
    </>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log("getProducts Result: ", result);
        setProducts(result.actionFigures);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
    setForceRender(false);
  }, [forceRender]);

  return (
    <section>
      PRODUCTS
      <div>
        {products.map((item, idx) => (
          <div key={idx}>{displayProduct(item)}</div>
        ))}
      </div>
    </section>
  );
}

export default Products;
