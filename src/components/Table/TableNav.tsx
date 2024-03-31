// does not contain any data manipulation API, used solely for appearance
import { Grid, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { memo } from 'react';

export interface TableNavProps {
  onSearch: (value: string) => void;
}

const TableNav = memo(({ onSearch }: TableNavProps) => {
  return (
    <Grid>
      <Grid.Col offset={{ base: 0, sm: 8 }} span={{ base: 12, sm: 4 }}>
        <TextInput
          placeholder="Search"
          rightSection={<IconSearch size={16} />}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Grid.Col>
    </Grid>
  );
});

export default TableNav;
