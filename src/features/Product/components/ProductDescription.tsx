import { Paper } from '@material-ui/core';
import { Product } from 'models';
import React from 'react';
import DOMPurify from 'dompurify';

export interface ProductDescriptionProps {
  product: Product | undefined;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  const productDescription: any = product?.description;
  const safeDescription = DOMPurify.sanitize(productDescription);
  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}
