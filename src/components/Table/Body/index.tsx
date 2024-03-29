// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable } from '@mantine/core';
import { FC, ReactNode } from 'react';

export interface TableBodyProps {
  children: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children }) => {
  return <MantineTable.Tbody>
    {children}
  </MantineTable.Tbody>
}

export default TableBody;