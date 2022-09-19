/* tslint:disable */
import { Stock } from './stock';
export interface Product {
  packageSize?: string;
  productName?: string;
  pzn: string;
  stock?: Stock;
  strength?: string;
  supplier?: string;
  unit?: string;
}
