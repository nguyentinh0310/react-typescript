import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { ListParams } from 'models';
import React, { useState, ChangeEvent } from 'react';

export interface FilterByPriceProps {
  onChange: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

export default function FilterByPrice({ onChange }: FilterByPriceProps) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">LỌC KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span> - </span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      {/* <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button> */}
    </Box>
  );
}
