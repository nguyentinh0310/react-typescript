import { Category, ListParams, ListResponse } from "models";
import axiosClient from "./axiosClient";

export const categoryApi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = `/categories`;
    return axiosClient.get(url);
  },
  getById(id: string | number): Promise<Category> {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  add(data: Category): Promise<Category> {
    const url = `/categories`;
    return axiosClient.post(url, data);
  },
  update(data: Category): Promise<Category> {
    const url = `/categories/${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id: string | number): Promise<any> {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};
