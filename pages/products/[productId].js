import { useRouter } from 'next/router';
import { fetchAndParseProductFeedCsv } from '../../lib/parseProductFeedCsv';

const ProductPage = ({ product }) => {
  console.log({ product });
  if (!product) {
    return <div>Loading...123</div>;
  }

  return (
    <div>
      <h1>{product.Title}</h1>
      <p>Description: {product.Description}</p>
      {product.Image_link && (
        <img src={product.Image_link} alt={product.Title} />
      )}
      {/* Display other product details here */}
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const parsedData = await fetchAndParseProductFeedCsv();

    const product = parsedData.find((p) => {
      return p.Id === context.params.productId;
    }) || null;

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
