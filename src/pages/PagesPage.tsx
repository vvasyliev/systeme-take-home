import { Container, Group, Anchor, Title } from '@mantine/core';
import { FC } from 'react';

import pages from '~/assets/mocks/pages.json';
import Table, { TableColumn } from '~/components/Table/Table';
import { PRICE_PLANS_PAGE_ROUTE } from '~/pages/PricePlansPage';
import { PRODUCTS_PAGE_ROUTE } from '~/pages/ProductsPage';

export const PAGES_PAGE_ROUTE = '/pages';

export type Page = {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
};

const data = pages as Page[];
const columns: TableColumn<Page>[] = [
  {
    id: 'Title',
    label: 'title',
    editable: true,
    renderCell: (row) => row.title,
    sortColumn: (a, b) => a.title.localeCompare(b.title),
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
    id: 'publishedAt',
    label: 'Published',
    renderCell: (row) =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        hourCycle: 'h24',
        timeStyle: 'short',
      }).format(Date.parse(row.publishedAt)),
  },
  {
    id: 'updatedAt',
    label: 'Updated',
    renderCell: (row) =>
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        hourCycle: 'h24',
        timeStyle: 'short',
      }).format(Date.parse(row.updatedAt)),
  },
];

const PagesPage: FC = () => {
  return (
    <Container mt="sm" fluid>
      <Group mb="xs">
        <Anchor href={PRODUCTS_PAGE_ROUTE} underline="never">
          <Title c="dimmed">Products</Title>
        </Anchor>
        <Title onClick={() => null}>Pages</Title>
        <Anchor href={PRICE_PLANS_PAGE_ROUTE} underline="never">
          <Title c="dimmed">Price Plans</Title>
        </Anchor>
      </Group>
      <Table data={data} columns={columns} />
    </Container>
  );
};

export default PagesPage;
