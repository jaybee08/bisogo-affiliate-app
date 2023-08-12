// pages/[productId].js
import { useRouter } from 'next/router';
import { fetchAndParseProductFeedCsv } from '../../lib/parseProductFeedCsv';

const ProductPage = ({ product }) => {
  console.log({ product });
  if (!product) {
    return <div>Loading...123</div>;
  }

  return (
    <div>
      <h2>{product.Title}</h2>
      <p>Price: {product.Price}</p>
      {/* Add other product details as needed */}
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const parsedData = await fetchAndParseProductFeedCsv();
    const product = parsedData.find((p) => p.Id === context.params.productId) || null;

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

export default ProductPage;
