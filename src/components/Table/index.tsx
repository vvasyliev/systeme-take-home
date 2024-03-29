// does not contain any data manipulation API, used solely for appearance
import { Button, Card, Grid, Input, Table as MantineTable, Text } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { Key, ReactNode, useState } from 'react';

import TableBody from '~/components/Table/Body';
import TableCell from '~/components/Table/Cell';
import TableColumn from '~/components/Table/Column';
import TableHead from '~/components/Table/Head';
import TableRow from '~/components/Table/Row';

export type TableOptions = {
  editable: boolean;
};

export type TableRow = {
  id: Key;
};

export type TableColumn<Row> = {
  label: ReactNode;
  renderCell: (row: Row) => ReactNode;
  sortColumn?: (leftRow: Row, rightRow: Row) => number;
};

export interface TableProps<Row> {
  data: Row[];
  columns: TableColumn<Row>[];
  options?: TableOptions;
}

const defaultTableOptions = {
  editable: true,
};

function Table<Row extends TableRow>({ data, columns, options = defaultTableOptions }: TableProps<Row>) {
  const { editable } = options;
  const [tableData, setTableData] = useState(data);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleHeaderCell = (row: TableColumn<Row>) => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setTableData((prevTableData) => {
      const sortedTableData = prevTableData.sort(row.sortColumn);

      if (sortDirection === 'desc') {
        sortedTableData.reverse();
      }

      return sortedTableData;
    });
  };

  return (
    <Card withBorder>
      <Grid>
        <Grid.Col offset={{ base: 0, sm: 8 }} span={{ base: 12, sm: 4 }}>
          <Input placeholder="Search" rightSection={<IconSearch size={16} />} />
        </Grid.Col>
      </Grid>
      <MantineTable>
        <TableHead>
          <TableRow>
            {columns.map((v) => (
              <TableCell key={v.label?.toString()} onClick={v.sortColumn ? () => handleHeaderCell(v) : null}>
                <Text>{v.label}</Text>
              </TableCell>
            ))}
            {editable && (
              <TableCell>
                <Text>Edit</Text>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              {columns.map((col) => (
                <TableCell key={`${row.id}-${col.label}`}>{col.renderCell(row)}</TableCell>
              ))}
              {editable && (
                <TableCell>
                  <Button variant="outline" size="xs" radius="xs">
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MantineTable>
    </Card>
  );
}

export default Table;
