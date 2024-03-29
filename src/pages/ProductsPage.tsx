import { Container } from '@mantine/core';

import products from '~/assets/mocks/products.json';
import Table, { TableColumn } from '~/components/Table';

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
    label: 'Name',
    renderCell: (row) => row.name,
    sortColumn: (a, b) => a.name.localeCompare(b.name),
  },
  {
    label: 'Status',
    renderCell: (row) => (row.active ? 'Active' : 'Disabled'),
    sortColumn: (a, b) => {
      return Number(a.active > b.active) * 2 - 1
    },
  },
  {
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
    <Container mt="sm">
      <Table data={data} columns={columns} />
    </Container>
  );
};

export default ProductsPage;
