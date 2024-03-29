// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable } from '@mantine/core';
import { FC, ReactNode } from 'react';

export interface TableRowProps {
  children: ReactNode;
}

const TableRow: FC<TableRowProps> = ({ children }) => {
  return <MantineTable.Tr>{children}</MantineTable.Tr>;
};

export default TableRow;
