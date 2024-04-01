// does not contain any data manipulation API, used solely for appearance ()
import { Card, Table as MantineTable } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import TableBody from '~/components/Table/TableBody';
import TableEditModal from '~/components/Table/TableEditModal';
import TableHead from '~/components/Table/TableHead';
import TableNav from '~/components/Table/TableNav';

export type TableOptions = {
  editable: boolean;
};

export type TableBaseRow = {
  id: Key;
};

export type TableColumn<Row> = {
  id: string;
  label: ReactNode;
  editable?: boolean;
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

export type Sort = {
  id: Key;
  direction: 'asc' | 'desc';
};

function Table<Row extends TableBaseRow>({ data, columns, options = defaultTableOptions }: TableProps<Row>) {
  const { editable } = options;

  const [tableData, setTableData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const [sort, setSort] = useState<Sort>({ id: '', direction: 'asc' });

  const editableColumns = useMemo(() => columns.filter((col) => col.editable), [columns]);
  const [currentEditRow, setCurrentEditRow] = useState<Row | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = useCallback(() => {
    setIsEditOpen((prev) => !prev);
  }, [])

  // unmemoized fn triggers TableHead re-renders
  const handleHeaderCell = useCallback((row: TableColumn<Row>) => {
    if (!row.sortColumn) {
      return;
    }

    setSort((prevSort) => {
      if (prevSort.id === row.id) {
        return { ...prevSort, direction: prevSort.direction === 'asc' ? 'desc' : 'asc' };
      }

      return {
        id: row.id,
        direction: 'asc',
      };
    });
  }, []);

  useEffect(() => {
    const selectedRow = columns.find((col) => col.id === sort.id);

    if (!selectedRow) return;

    setTableData((prevTableData) => {
      const sortedTableData = prevTableData.slice().sort(selectedRow.sortColumn);

      if (sort.direction === 'desc') {
        sortedTableData.reverse();
      }

      return sortedTableData;
    });
  }, [sort, columns]);

  const handleEditModal = useCallback(
    (row: Row) => {
      setCurrentEditRow(row);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  useEffect(() => {
    setTableData(
      data.filter((row) => {
        const values = Object.values(row);

        return values.some((val) => val.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
      }),
    );
  }, [data, debouncedSearchQuery]);

  const handleRowEdit = useCallback((values: Record<string, Key>) => {
    setTableData((prevTableData) => {
      const nextTableData = prevTableData.slice();

      const changeIndex = prevTableData.findIndex((row) => row.id === currentEditRow?.id);
      Object.keys(values).forEach((key) => {
        const objectRef: Record<string, Key> = nextTableData[changeIndex];
        objectRef[key] = values[key];
      });

      return nextTableData;
    });

    toggleEditModal();
  }, [toggleEditModal, currentEditRow]);

  return (
    <Card withBorder>
      <TableNav onSearch={setSearchQuery} />
      <MantineTable highlightOnHover verticalSpacing="md">
        <TableHead sort={sort} onSort={handleHeaderCell} editable={editable} columns={columns} />
        <TableBody tableData={tableData} editable={editable} columns={columns} onRowEdit={handleEditModal} />
      </MantineTable>
      {currentEditRow && (
        <TableEditModal
          currentRow={currentEditRow}
          columns={editableColumns}
          opened={isEditOpen}
          onClose={toggleEditModal}
          onSubmit={handleRowEdit}
        />
      )}
    </Card>
  );
}

export default Table;
