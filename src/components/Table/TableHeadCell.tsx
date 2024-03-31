// does not contain any data manipulation API, used solely for appearance
import { Group, Table as MantineTable } from '@mantine/core';
import { IconArrowsSort, IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { FC, PropsWithChildren } from 'react';

export interface TableHeadCellProps {
  onSort?: () => void;
  sortDirection?: 'asc' | 'desc';
}

const renderSortIcon = (sortDirection: TableHeadCellProps['sortDirection']) => {
  if (sortDirection === 'asc') {
    return <IconSortAscending aria-label='ascending-order' />;
  } else if (sortDirection === 'desc') {
    return <IconSortDescending aria-label='descending-order'/>
  }

  return <IconArrowsSort aria-label='sort-column' />;
}

const TableHeadCell: FC<PropsWithChildren<TableHeadCellProps>> = ({ children, sortDirection, onSort }) => {
  return (
    <MantineTable.Td onClick={onSort}>
      <Group>
        {children}
        {onSort && renderSortIcon(sortDirection)}
      </Group>
    </MantineTable.Td>
  );
};

export default TableHeadCell;
