// pages/[productId].js (or [productId].tsx)

import { useRouter } from 'next/router';
import { fetchAndParseProductFeedCsv } from '../lib/parseProductFeedCsv';

export default function ProductPage({ product }) {
  const router = useRouter();

  // Handle case when the page is still being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Handle case when product is not found
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h1>{product.Title}</h1>
      <p>Description: {product.Description}</p>
      {/* Display other product details here */}
    </div>
  );
}

export async function getStaticProps({ params }) {
  try {
    const parsedData = await fetchAndParseProductFeedCsv();
    const productId = params.productId;
    const product = parsedData.find((item) => item.Id === productId);

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching and parsing product feed:', error);
    return {
      props: {
        product: null,
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const parsedData = await fetchAndParseProductFeedCsv();
    const paths = parsedData.map((item) => ({ params: { productId: item.Id } }));

    return {
      paths,
      fallback: true, // Set to false if you want to return a 404 page for non-existing products
    };
  } catch (error) {
    console.error('Error fetching and parsing product feed:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}
