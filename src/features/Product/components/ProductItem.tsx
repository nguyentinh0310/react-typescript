import { Box, Typography } from '@material-ui/core';
import { Product } from 'models';
import React from 'react';
import { useHistory } from 'react-router-dom';

export interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const history = useHistory()
  const handleClick =() =>{
    history.push(`/products/${product.id}`)
  }
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1}>
        <img src={product.images[0]} alt={product.name} width="100%" height="200px" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}
