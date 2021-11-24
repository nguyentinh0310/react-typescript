export interface Cart {
  id?: string | number;
  product: ProductItem;
  quantity: number;
}

export interface ProductItem {
  [key: string]: string;
}
