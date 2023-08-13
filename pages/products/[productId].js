// pages/products/[productId].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchAndParseProductFeedCsv } from '../../lib/parseProductFeedCsv';

function fetchProductByTitle(title) {
  return fetchAndParseProductFeedCsv().then(products => {
    return products.find(product => product.Title.toLowerCase() === title.toLowerCase());
  });
}

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (productId) {
          // Format the title to lowercase with dashes
          const formattedTitle = productId.replace(/-/g, ' ');
          // Fetch the product data based on the formatted title
          const productData = await fetchProductByTitle(formattedTitle);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.Title}</h2>
      <p>Price: {product.Price}</p>
      <p>Description: {product.Description}</p>
      {product.Image_link && (
        <img src={product.Image_link} alt={product.Title} width={200} />
      )}
      <button 
      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30"
      onClick={() => router.push('/')}>Back to Product Feed</button>
    </div>
  );
}

export default ProductDetail;
