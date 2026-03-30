import api from "./api";
import type { Product } from "../types/product";

export const apiDeleteProduct = (id: string) => {
  return api.delete<Product>(`produtos/${id}`);
};