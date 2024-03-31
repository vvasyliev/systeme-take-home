// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable, Title, Text } from '@mantine/core';
import { memo } from 'react';

import { TableColumn, TableBaseRow, Sort } from '~/components/Table/Table';
import TableHeadCell from '~/components/Table/TableHeadCell';
import TableRow from '~/components/Table/TableRow';

export interface TableHeadProps<Row> {
  editable: boolean;
  columns: TableColumn<Row>[];
  sort: Sort;
  onSort: (column: TableColumn<Row>) => void;
}

const TableHead = <Row extends TableBaseRow>({ editable, columns, sort, onSort }: TableHeadProps<Row>) => {
  return (
    <MantineTable.Thead>
      <TableRow>
        {columns.map((column) => (
          <TableHeadCell
            key={column.id}
            onSort={column.sortColumn ? () => onSort(column) : undefined}
            sortDirection={sort.id === column.id ? sort.direction : undefined}
          >
            <Title order={5}>{column.label}</Title>
          </TableHeadCell>
        ))}
        {editable && (
          <TableHeadCell>
            <Text fw={700}>Edit</Text>
          </TableHeadCell>
        )}
      </TableRow>
    </MantineTable.Thead>
  );
};

export default memo(TableHead) as typeof TableHead;
