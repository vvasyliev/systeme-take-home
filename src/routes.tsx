import { Navigate, createBrowserRouter } from 'react-router-dom';

import RootPage from '~/pages/RootPage';
import ProductsPage, { PRODUCTS_PAGE_ROUTE } from '~/pages/ProductsPage';
import PricePlansPage, { PRICE_PLANS_PAGE_ROUTE } from '~/pages/PricePlansPage';
import PagesPage, { PAGES_PAGE_ROUTE } from '~/pages/PagesPage';

const router = createBrowserRouter([
  {
    element: <RootPage />,
    children: [
      {
        path: PRODUCTS_PAGE_ROUTE,
        element: <ProductsPage />,
      },
      {
        path: PRICE_PLANS_PAGE_ROUTE,
        element: <PricePlansPage />,
      },
      {
        path: PAGES_PAGE_ROUTE,
        element: <PagesPage />,
      },
      {
        path: '*',
        element: <Navigate to={PRODUCTS_PAGE_ROUTE} />,
      },
    ],
  },
]);

export default router;
