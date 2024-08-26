import type { Product } from './productType'

export interface CartProduct {
  productId: number
  quantity: number
  realProduct?: Product
}

export interface Cart {
  id: number
  userId: number
  date: string
  products: CartProduct[]
}
