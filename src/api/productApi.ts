import { ListParams, ListResponse, PaginationParams, Product } from 'models';
import axiosClient from './axiosClient';

export interface ProductSate {
  data: Product[];
  pagination: PaginationParams;
}

export const productApi = {
  async getAll(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/products';
    return axiosClient.get(url, { params });
  },
  getById(id: string | number): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(data: Product): Promise<Product> {
    const url = `/products`;
    return axiosClient.post(url, data);
  },
  update(data: Product): Promise<Product> {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string | number): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};
