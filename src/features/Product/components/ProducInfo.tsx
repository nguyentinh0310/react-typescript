import { Box, makeStyles, Typography } from '@material-ui/core';
import { Product } from 'models';
import * as React from 'react';
import { formatPrice } from 'utils';

export interface ProductInfoProps {
  product: Product | undefined;
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    borderBottom: `1px solid ${theme.palette.grey[200]}`
  },

  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  salePrice: {
    marginRight: theme.spacing(3),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  originalPrice: {
    marginRight: theme.spacing(3),
    textDecoration: 'line-through',
  },
  promotionPercent: {},
}));

export default function ProductInfo({ product }: ProductInfoProps) {
  const classes = useStyles();
  const productPercent: any = product?.promotionPercent;

  return (
    <Box className={classes.root}>
      <Typography>{product?.name}</Typography>
      <Typography className={classes.description}>{product?.shortDescription}</Typography>
      <Box className={classes.priceBox}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(product?.salePrice)}
        </Box>
        {productPercent > 0 && (
          <>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(product?.originalPrice)}
            </Box>
            <Box component="span" className={classes.promotionPercent}>
              {productPercent} %
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
