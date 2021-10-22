import { Tab, Tabs } from '@material-ui/core';
import { ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface ProductSortProps {
  currentSort: string;

  onChange: (newFilter: ListParams) => void;
}

export default function ProductSort({ currentSort, onChange }: ProductSortProps) {
  const handleSortChange = (e: ChangeEvent<any>, newFilter: ListParams) => {
    if (onChange) onChange(newFilter);
  };

  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá thấp tới cao" value="salePrice.asc"></Tab>
      <Tab label="Giá cao xuống thấp" value="salePrice.desc"></Tab>
    </Tabs>
  );
}
