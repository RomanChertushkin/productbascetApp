import { type Cart } from './cartType'
import { type Product } from './productType'

export interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  loading: boolean
  cart: Cart | null
  categories: Array<string>
  error: string | null
}
