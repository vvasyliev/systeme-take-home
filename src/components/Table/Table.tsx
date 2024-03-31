// does not contain any data manipulation API, used solely for appearance ()
import { Card, Grid, Input, Table as MantineTable } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { Key, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import TableBody from '~/components/Table/TableBody';
import TableEditModal from '~/components/Table/TableEditModal';
import TableHead from '~/components/Table/TableHead';

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
  const [opened, { open, close }] = useDisclosure(false);

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
      open();
    },
    [open],
  );

  useEffect(() => {
    setTableData(
      data.filter((row) => {
        const values = Object.values(row);

        return values.some((val) => val.toString().toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
      }),
    );
  }, [data, debouncedSearchQuery]);

  const handleRowEdit = (values: Record<string, Key>) => {
    setTableData((prevTableData) => {
      const nextTableData = prevTableData.slice();

      const changeIndex = prevTableData.findIndex((row) => row.id === currentEditRow?.id);
      Object.keys(values).forEach((key) => {
        const objectRef: Record<string, Key> = nextTableData[changeIndex];
        objectRef[key] = values[key];
      });

      return nextTableData;
    });

    close();
  };

  return (
    <Card withBorder>
      <Grid>
        <Grid.Col offset={{ base: 0, sm: 8 }} span={{ base: 12, sm: 4 }}>
          <Input
            placeholder="Search"
            rightSection={<IconSearch size={16} />}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      <MantineTable highlightOnHover>
        <TableHead sort={sort} onSort={handleHeaderCell} editable={editable} columns={columns} />
        <TableBody tableData={tableData} editable={editable} columns={columns} onRowEdit={handleEditModal} />
      </MantineTable>
      {currentEditRow && (
        <TableEditModal
          currentRow={currentEditRow}
          columns={editableColumns}
          opened={opened}
          onClose={close}
          onSubmit={handleRowEdit}
        />
      )}
    </Card>
  );
}

export default Table;
