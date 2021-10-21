export interface Product {
  categoryId?: string | number;
  id?: string | number;
  name: string;
  color: string;
  image: string;
  description: string;
  price: number;

  createdAt?: number;
  updatedAt?: number;
}
