// does not contain any data manipulation API, used solely for appearance
import { Table as MantineTable } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export interface TableCellProps {
  onClick?: () => void;
}

const TableCell: FC<PropsWithChildren<TableCellProps>> = ({ children, onClick }) => {
  return <MantineTable.Td onClick={onClick}>{children}</MantineTable.Td>;
};

export default TableCell;
