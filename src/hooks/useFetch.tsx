import { productApi } from 'api/productApi';
import { Product } from 'models';
import React, { useEffect, useState } from 'react';

export default function useProductDetail(productId: string | number) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await productApi.getById(productId);
        setProduct(result);
        console.log(result);
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch to Product', error);
      }
    })();
  }, [productId]);

  return { product, loading };
}
