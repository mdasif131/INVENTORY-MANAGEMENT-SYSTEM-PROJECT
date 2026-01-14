import { lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';

const NotFound = lazy(() => import('../components/notFound/NotFound'));
const Page404 = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    </div>
  );
};

export default Page404;
