import { Product } from '../../_models/product'

export interface ProductCart {
  product?:Product;
  quantity?:number;
}
