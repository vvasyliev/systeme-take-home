// does not contain any data manipulation API, used solely for appearance
import { Button, Table as MantineTable, Text } from '@mantine/core';
import { memo } from 'react';

import { TableBaseRow, TableColumn } from '~/components/Table/Table';
import TableCell from '~/components/Table/TableCell';
import TableRow from '~/components/Table/TableRow';

export interface TableBodyProps<Row> {
  tableData: Row[];
  editable: boolean;
  columns: TableColumn<Row>[];
  onRowEdit: (row: Row) => void;
}

const TableBody = <Row extends TableBaseRow>({ tableData, columns, editable, onRowEdit }: TableBodyProps<Row>) => {
  return (
    <MantineTable.Tbody>
      {tableData.map((row) => (
        <TableRow key={row.id}>
          {columns.map((col) => (
            <TableCell key={`${row.id}-${col.label}`}>
              <Text>{col.renderCell(row)}</Text>
            </TableCell>
          ))}
          {editable && (
            <TableCell>
              <Button variant="outline" size="xs" radius="xs" onClick={() => onRowEdit(row)}>
                Edit
              </Button>
            </TableCell>
          )}
        </TableRow>
      ))}
    </MantineTable.Tbody>
  );
};

export default memo(TableBody) as typeof TableBody;
