// components/ProductFeed.js

import React, { useState, useEffect } from 'react';
import { fetchAndParseProductFeedCsv } from '../lib/parseProductFeedCsv';
import { useRouter } from 'next/router';

const productsPerPage = 5;

function ProductFeed() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const parsedData = await fetchAndParseProductFeedCsv();
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsOnPage = parsedData.slice(startIndex, endIndex);
        setProducts(productsOnPage);
      } catch (error) {
        console.error('Error fetching and parsing product feed:', error);
      }
    }
    fetchData();
  }, [currentPage]);

  const redirectToProductPage = (id) => {
    if (id) {
      router.push(`/products/${id}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      router.push(`/?page=${newPage}`);
    }
  };
  
  

  return (
    <div>
      <h2>Product Feed</h2>
      <ul>
        {products.map((product) => (
          <li key={product.Id}>
            <h3>{product.Title}</h3>
            <p>Price: {product.Price}</p>
            {product.Image_link && (
              <img src={product.Image_link} alt={product.Title} width={200} />
            )}
            <button
              onClick={() => redirectToProductPage(product.Id)}
              disabled={!product.Link}
            >
              Learn More
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={products.length < productsPerPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default ProductFeed;
