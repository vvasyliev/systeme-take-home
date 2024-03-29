// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable } from '@mantine/core';
import { FC, ReactNode } from 'react';

export interface TableColumnProps {
  children: ReactNode;
}

const TableColumn: FC<TableColumnProps> = ({ children }) => {
  return <MantineTable.Td>
    {children}
  </MantineTable.Td>
}

export default TableColumn;