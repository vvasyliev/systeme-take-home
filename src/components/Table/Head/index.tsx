// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable } from '@mantine/core';
import { FC, ReactNode } from 'react';

export interface TableHeadProps {
  children: ReactNode;
}

const TableHead: FC<TableHeadProps> = ({ children }) => {
  return <MantineTable.Thead>{children}</MantineTable.Thead>;
};

export default TableHead;
