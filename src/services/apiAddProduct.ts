import api from "./api";
import type { Product } from "../types/product";

export const apiAddProduct = (data: Product) => {
  return api.post<Product>(`produtos`, data);
};