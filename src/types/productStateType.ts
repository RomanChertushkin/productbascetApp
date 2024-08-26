import { type Cart } from './cartType'
import { type Product } from './productType'

export interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  product: Product | null
  loading: boolean
  cartLoaded: boolean
  cart: Cart | null
  categories: Array<string>
  error: string | null
}
