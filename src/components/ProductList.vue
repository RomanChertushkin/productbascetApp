<template>
  <div class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import ProductCard from './ProductCard.vue';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/productType';

const productStore = useProductStore();

const products = computed<Product[]>(() => {
  return productStore.filteredProducts;
});

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 290px);
  grid-template-rows: repeat(auto-fill, 300px);
  grid-gap: 16px;

  width: 100%;
  max-height: 90.6vh;
  overflow-y: scroll;
}
</style>