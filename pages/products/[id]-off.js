import { useRouter } from 'next/router';

// Dummy product data, replace this with actual data fetched from the API or JSON
const dummyProducts = [
  { id: '12345', title: 'Product 1', description: 'Description 1' },
  { id: '67890', title: 'Product 2', description: 'Description 2' },
  // Add more product data as needed
];

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find the product with the given ID from the dummyProducts array
  const product = dummyProducts.find((p) => p.id === id);

  return (
    <div>
      {product ? (
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          {/* Add other product details as needed */}
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
