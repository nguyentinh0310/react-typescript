import { Product } from 'models';
import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';

export interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Box padding={1}>
      <Box padding={1}>
        <img src={product.image} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {product.price}
        </Box>
      </Typography>
    </Box>
  );
}
