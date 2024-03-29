import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const ROOT_PAGE_ROUTE = '/';

const ProductsPage = () => {
  return (
    <AppShell>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default ProductsPage;
