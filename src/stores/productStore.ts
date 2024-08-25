import { defineStore } from 'pinia'
import { apiService } from '@/services/productService'
import type { ProductState } from '@/types/productStateType'
import type { Product } from '@/types/productType'
import type { Cart, CartProduct } from '@/types/cartType'

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    filteredProducts: [],
    categories: [],
    cart: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null

      try {
        const products = await apiService.get<Product[]>('/products')
        this.products = products
        this.filteredProducts = products
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchProductsCategories() {
      this.loading = true
      this.error = null

      try {
        const categories = await apiService.get<string[]>('/products/categories')
        this.categories = categories
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async fetchCart() {
      this.loading = true
      this.error = null

      try {
        const carts = await apiService.get<Cart>('/carts/1')
        this.cart = carts
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async editCart(product: Product) {
      this.loading = true
      this.error = null

      this.cart?.products.push({ productId: product.id, quantity: 1 })

      try {
        const carts = await apiService.put<Cart>('/carts/1', this.cart)
        this.cart = carts
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    applyFilters(filter: any) {
      this.filteredProducts = this.products.filter((product) => {
        const { category, minPrice, maxPrice } = filter

        const matchesCategory = category ? product.category === category : true

        if (!matchesCategory) {
          return false
        }

        const matchesMinPrice = minPrice ? product.price >= minPrice : true
        const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true

        console.log(maxPrice)

        return matchesMinPrice && matchesMaxPrice
      })

      console.log(this.filteredProducts)
    }
  }
})
