import { Box } from '@material-ui/core';
import { ListParams } from 'models';
import React from 'react';
import FilterByCategory from './Filter/FilterByCategory';
import FilterByPrice from './Filter/FilterByPrice';

export interface ProductFilterProps {
  filters: ListParams;

  onChange: (newFilter: ListParams) => void;
}

export default function ProductFilter({ filters, onChange }: ProductFilterProps) {
  const handleFiterCategory = (newCategoryId: any) => {
    if (!onChange) return;

    const newFilter = {
      categoryId: newCategoryId,
    };
    onChange(newFilter);
  };

  const handleFiter = (newFilter: ListParams) =>{
    console.log(newFilter)
  }

  return (
    <Box>
      <FilterByCategory onChange={handleFiterCategory} />
      <FilterByPrice onChange={handleFiter} />
    </Box>
  );
}
