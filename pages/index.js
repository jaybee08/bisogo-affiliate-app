import { useRouter } from 'next/router';
import ProductFeed from '../components/ProductFeed';

const IndexPage = () => {
  const router = useRouter();
  const { query } = router;
  const currentPage = query.page ? parseInt(query.page) : 1;

  return (
    <div>
      {/* Other content */}
      <h1>Home page</h1>
      <ProductFeed currentPage={currentPage} />
    </div>
  );
};

export default IndexPage;
