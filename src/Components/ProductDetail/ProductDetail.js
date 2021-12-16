import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  document.title = "Product Details";
  const { productKey } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/product/" + productKey)
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
      });
  }, [productKey]);

  return (
    <div>
      <h1>Prodcuct ID:{productKey}</h1>
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetail;
