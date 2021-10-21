import { ListParams, ListResponse, PaginationParams, Product } from 'models';
import axiosClient from './axiosClient';

export interface ProductSate {
  data: Product[];
  pagination: PaginationParams;
}

export const productApi = {
  async getAll(params: ListParams): Promise<ListResponse<Product>> {
    // // Transform _page to _start
    // const newParams = { ...params };
    // newParams._start =
    //   !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);

    // delete params._page;
    // // Fetch product list + count
    // const productList = await axiosClient.get('products',{ params: newParams})
    // const count = await axiosClient.get('products/count',{ params: newParams})
    //  // Buid response and return
    //  return{
    //   data: productList,
    //   pagination:{
    //       page: params._page,
    //       limit: params._limit,
    //       total: count
    //   }
    // }
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
