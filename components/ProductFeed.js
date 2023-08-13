import React, { useState, useEffect } from 'react';
import { fetchAndParseProductFeedCsv } from '../lib/parseProductFeedCsv';
import { useRouter } from 'next/router';

const productsPerPage = 12;

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

  const redirectToProductPage = (title) => {
    if (title) {
      const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
      router.push(`/products/${encodeURIComponent(formattedTitle)}`);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      router.push(`/?page=${newPage}`);
    }
  };

  return (
    <div className="bg-white container">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.Image_link}
                  alt={product.Title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="" />
                      {product.Title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                  <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30"
                  onClick={() => redirectToProductPage(product.Title)}
                  disabled={!product.Link}>Learn More</button>
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">Php{product.Price}</p>
               
              </div>
            </div>
            
          ))}
           <div>
        </div>
        </div>
        <div className="flex justify-between">
        <button
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={products.length < productsPerPage}
        >
          Next Page
        </button>
        </div>
        
      </div>
    </div>
  )
}

export default ProductFeed;
