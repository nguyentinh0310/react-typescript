import { Box, makeStyles, Typography } from '@material-ui/core';
import { categoryApi } from 'api/categoryApi';
import { Category, ListParams } from 'models';
import React, { useEffect, useState } from 'react';

export interface FilterByCategoryProps {
  onChange: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '&> li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));

export default function FilterByCategory({ onChange }: FilterByCategoryProps) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState<Array<Category>>();

  useEffect(() => {
    (async () => {
      try {
        const data = await categoryApi.getAll();
        console.log(data);
        setCategoryList(
          data.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list ', error);
      }
    })();
  }, []);

  const handleClickCategory = (category: any) => {
    if (!onChange) return;
    onChange(category.id);
  };

  return (
    <Box className={classes.root}>
      <Typography>DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {categoryList?.map((category) => (
          <li key={category.id} onClick={() => handleClickCategory(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </Box>
  );
}
