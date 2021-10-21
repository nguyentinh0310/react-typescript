import { Box, Grid } from '@material-ui/core';
import { Product } from 'models';
import React from 'react';
import ProductItem from './ProductItem';

export interface ProductListProps {
  data: Product[];
}

export default function ProductList({ data }: ProductListProps) {
  return (
    <Box>
      <Grid container>
        {data?.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
