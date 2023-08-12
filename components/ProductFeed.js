// ProductFeed.js
import React, { useState, useEffect } from 'react';
import { fetchAndParseProductFeedCsv } from '../lib/parseProductFeedCsv';
import { withRouter } from 'next/router';


const productsPerPage = 5;

function ProductFeed({ router }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const parsedData = await fetchAndParseProductFeedCsv();
  
        // Filter out any items with missing or duplicate "Id" values
        const uniqueProducts = parsedData.filter(
          (product, index, self) =>
            product.Id && self.findIndex((p) => p.Id === product.Id) === index
        );
  
        // Filter out items without valid Image_link URLs
        const productsWithImages = uniqueProducts.filter(
          (product) => product.Image_link
        );
  
        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching and parsing product feed:', error);
      }
    }
    fetchData();
  }, []);
  

  // Calculate the index range for the current page
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  // Handle pagination navigation
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  // Redirect to the product page when the button is clicked
  const redirectToProductPage = (id) => {
    console.log('Product ID:', id);
    if (id) {
      router.push(`/products/${id}`);
    }
  };

  return (
    <div>
      <h2>Product Feed</h2>
      <ul>
        {currentProducts.map((product) => (
          <li key={product.Id}>
            <h3>{product.Title}</h3>
            <p>Price: {product.Price}</p>
            {product.Image_link && (
              <img
                src={product.Image_link}
                alt={product.Title}
                width={200}
              />
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
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage} disabled={lastIndex >= products.length}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default withRouter(ProductFeed);
