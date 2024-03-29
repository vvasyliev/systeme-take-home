import { useEffect, useState } from 'react';
import { TableColumn } from '~/components/Table';

type ColumnsHook<T> = {
  tableColumns: TableColumn<T>[];
};

function useColumns<T>(
  columns: TableColumn<T>[],
): ColumnsHook<T> {
  const [tableColumns, setTableColumns] = useState<TableColumn<T>[]>(columns);

  useEffect(() => {
    setTableColumns(columns);
  }, [columns]);

  return {
    tableColumns,
  };
}
