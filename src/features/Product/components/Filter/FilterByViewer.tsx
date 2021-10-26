import { Box, Chip, makeStyles } from '@material-ui/core';
import { ListParams } from 'models';
import React, { useMemo } from 'react';

export interface FilterByViewerProps {
  filters: ListParams;

  onChange: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignContent: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));
/**
 * FILTER LIST
 * id: number
 * getLabel: (filter) => string
 * isActive: (filter) => true/false
 * isVisible: (filter) => true/false
 * isRemovable: boolean
 * onRemove: func
 * onToggle: func
 */

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí vận chuyển',
    isActive: (filters: ListParams) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters: ListParams) => {
      const newFilter = { ...filters };
      if (newFilter.isFreeShip) {
        delete newFilter.isFreeShip;
      } else {
        newFilter.isFreeShip = true;
      }
      return newFilter.isFreeShip;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: (filters: ListParams) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters: ListParams) => {
      const newFilter = { ...filters };
      delete newFilter.isPromotion;
      return newFilter;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters: ListParams) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: () => true,
    isVisible: (filters: ListParams) => {
      Object.keys(filters).includes('salePrice_lte') &&
        Object.keys(filters).includes('salePrice_gte');
    },
    isRemovable: true,
    onRemove: (filters: ListParams) => {
      const newFilter = { ...filters };
      delete newFilter.salePrice_lte;
      delete newFilter.salePrice_gte;
      return newFilter;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters: ListParams) => filters.categoryId,
    isActive: () => true,
    isVisible: (filters: ListParams) => {
      Object.keys(filters).includes('categoryId')
    },
    isRemovable: true,
    onRemove: (filters: ListParams) => {
      const newFilter = { ...filters };
      delete newFilter.categoryId;
      return newFilter;
    },
    onToggle: () => {},
  },
];

export default function FilterByViewer({ filters = {}, onChange }: FilterByViewerProps) {
  const classes = useStyles();
  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter(x => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilter.map(x =>(
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            // onClick={
            //   x.isRemovable
            //     ? null
            //     : () => {
            //         if (!onChange) return;

            //         const newFilter = x.onToggle(filters);
            //         onChange(newFilter);
            //       }
            // }
            // onDelete={
            //   x.isRemovable
            //     ? () => {
            //         if (!onChange) return;

            //         const newFilter: any = x.onRemove(filters);
            //         onChange(newFilter);
            //       }
            //     : null
            // }
          />

        </li>
      ))}
    </Box>
  );
}
