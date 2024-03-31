import { Button, Flex, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { memo, Key } from 'react';

import { TableBaseRow, TableColumn } from '~/components/Table/Table';

export interface TableEditModalProps<Row> {
  // Row is cast to a more generic Record type for dynamic data handling
  currentRow: Record<string, Key>;
  columns: TableColumn<Row>[];
  opened: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, Key>) => void;
}

const TableEditModal = <Row extends TableBaseRow>({
  currentRow,
  columns,
  opened,
  onClose,
  onSubmit,
}: TableEditModalProps<Row>) => {
  const editForm = useForm({
    initialValues: columns.reduce<Record<string, Key>>((acc, field) => {
      acc[field.id] = currentRow[field.id];

      return acc;
    }, {}),
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Table Edit" centered>
      {currentRow && (
        <form onSubmit={editForm.onSubmit((values) => onSubmit(values))}>
          <Flex direction="column" gap="md">
            {columns.map((field) => (
              <TextInput
                key={`ti-${field.id}`}
                label={field.label}
                placeholder={currentRow[field.id].toString()}
                {...editForm.getInputProps(field.id)}
              />
            ))}
            <Button type="submit">Save</Button>
          </Flex>
        </form>
      )}
    </Modal>
  );
};

export default memo(TableEditModal) as typeof TableEditModal;
