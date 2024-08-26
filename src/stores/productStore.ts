import { defineStore } from 'pinia'
import { apiService } from '@/services/productService'
import type { ProductState } from '@/types/productStateType'
import type { Product } from '@/types/productType'
import type { Cart } from '@/types/cartType'

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    filteredProducts: [],
    product: null,
    categories: [],
    cart: null,
    loading: false,
    cartLoaded: false,
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

    async fetchProduct(id: number, addToCart: boolean = false) {
      this.loading = true
      this.error = null

      try {
        const product = await apiService.get<Product>('/products/' + id)
        this.product = product

        if (addToCart) {
          const cardProductIndex = this.cart?.products.findIndex((e) => {
            return this.product?.id == e.productId
          }) as number

          if (this.cart) {
            this.cart.products[cardProductIndex]['realProduct'] = this.product
          }
        }
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
        this.cartLoaded = true
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async editCart(cart: Cart, fetchRealProduct: boolean = false, productId: number = 0) {
      this.loading = true
      this.error = null

      console.log(123)

      try {
        const cartObj = await apiService.put<Cart>('/carts/1', cart)
        this.cart = cartObj

        if (fetchRealProduct && productId) {
          this.fetchProduct(productId, true)
        }
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
