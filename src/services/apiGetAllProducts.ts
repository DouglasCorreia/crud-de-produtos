import api from "./api";
import type { Product } from "../types/product";

export const apiGetAllProducts = () => {
  return api.get<Product[]>(`produtos`);
};