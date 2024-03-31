import { Anchor, Container, Group, Title } from '@mantine/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import pricePlans from '~/assets/mocks/price-plans.json';
import Table, { TableColumn } from '~/components/Table/Table';
import { PAGES_PAGE_ROUTE } from '~/pages/PagesPage';
import { PRODUCTS_PAGE_ROUTE } from '~/pages/ProductsPage';

export const PRICE_PLANS_PAGE_ROUTE = '/price-plans';

export type PricePlan = {
  id: number;
  description: string;
  active: boolean;
  removedAt: string;
};

const data = pricePlans as PricePlan[];
const columns: TableColumn<PricePlan>[] = [
  {
    id: 'description',
    label: 'Description',
    editable: true,
    renderCell: (row) => row.description,
    sortColumn: (a, b) => a.description.localeCompare(b.description),
  },
  {
    id: 'active',
    label: 'Active',
    renderCell: (row) => (row.active ? 'Active' : 'Disabled'),
    sortColumn: (a, b) => {
      return Number(a.active > b.active) * 2 - 1;
    },
  },
  {
    id: 'removedAt',
    label: 'Removed',
    renderCell: (row) =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        hourCycle: 'h24',
        timeStyle: 'short',
      }).format(Date.parse(row.removedAt)),
  },
];
const PricePlansPage: FC = () => {
  return (
    <Container mt="sm" fluid>
      <Group mb="xs">
        <Anchor component={Link} to={PRODUCTS_PAGE_ROUTE} underline="never">
          <Title c="dimmed">Products</Title>
        </Anchor>
        <Anchor component={Link} to={PAGES_PAGE_ROUTE} underline="never">
          <Title c="dimmed" onClick={() => null}>
            Pages
          </Title>
        </Anchor>
        <Title>Price Plans</Title>
      </Group>
      <Table data={data} columns={columns} />
    </Container>
  );
};

export default PricePlansPage;
