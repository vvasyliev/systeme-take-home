import { Container, Group, Anchor, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

import products from '~/assets/mocks/products.json';
import Table, { TableColumn } from '~/components/Table/Table';
import { PAGES_PAGE_ROUTE } from '~/pages/PagesPage';
import { PRICE_PLANS_PAGE_ROUTE } from '~/pages/PricePlansPage';

export const PRODUCTS_PAGE_ROUTE = '/products';

export type Product = {
  id: number;
  name: string;
  options: {
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    amount: number;
  };
  active: boolean;
  createdAt: string;
};

const data = products as Product[];
const columns: TableColumn<Product>[] = [
  {
    id: 'name',
    label: 'Name',
    editable: true,
    renderCell: (row) => row.name,
    sortColumn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    id: 'status',
    label: 'Status',
    renderCell: (row) => (row.active ? 'Active' : 'Disabled'),
    sortColumn: (a, b) => {
      return Number(a.active > b.active) * 2 - 1;
    },
  },
  {
    id: 'options',
    label: 'Options',
    renderCell: (row) => {
      const { size, amount } = row.options;

      return (
        <>
          Size: {size}, amount: {amount}
        </>
      );
    },
    sortColumn: (a, b) => {
      const { amount: amountA } = a.options;
      const { amount: amountB } = b.options;

      return amountA - amountB;
    },
  },
  {
    id: 'createdAt',
    label: 'Created',
    renderCell: (row) =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        hourCycle: 'h24',
        timeStyle: 'short',
      }).format(Date.parse(row.createdAt)),
  },
];

const ProductsPage = () => {
  return (
    <Container mt="sm" fluid>
      <Group mb="xs">
        <Title>Products</Title>
        <Anchor component={Link} to={PAGES_PAGE_ROUTE} underline="never">
          <Title c="dimmed" onClick={() => null}>
            Pages
          </Title>
        </Anchor>
        <Anchor component={Link} to={PRICE_PLANS_PAGE_ROUTE} underline="never">
          <Title c="dimmed">Price Plans</Title>
        </Anchor>
      </Group>
      <Table data={data} columns={columns} />
    </Container>
  );
};

export default ProductsPage;
