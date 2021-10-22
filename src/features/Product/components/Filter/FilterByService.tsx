import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import { ListParams } from 'models';
import React, { ChangeEvent } from 'react';

export interface FilterByServiceProps {
  filters: ListParams;

  onChange: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    padding: 0,
    margin: 0,

    '&>li': {
      listStyleType: 'none',
      marginTop: theme.spacing(1),
    },
  },
}));

export default function FilterByService({ filters = {}, onChange }: FilterByServiceProps) {
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<{ name?: any; checked: any }>) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>
      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mại' },
          { value: 'isFreeShip', label: 'Vận chuyển miễn phí' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  name={service.value}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}
