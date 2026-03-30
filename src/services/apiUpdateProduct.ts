import api from "./api";
import type { Product } from "../types/product";

export const apiUpdateProduct = (id: string, data: Product) => {
  return api.put<Product>(`produtos/${id}`, data);
};