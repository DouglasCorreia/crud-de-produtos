export interface Product {
  id: string;
  quantidade: number;
  nome: string;
  endereco: string;
  codigo_barras: string;
  armazem: string;
  lote: string;
  validade: string | null;
};