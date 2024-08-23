<template>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <ProductCard :product="product" />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ProductCard from './ProductCard.vue';
  
  export default defineComponent({
    name: 'ProductList',
    components: {
      ProductCard,
    },
    setup() {
      const products = ref([
        { id: 1, name: 'Товар 1', image: 'image1.png' },
        { id: 2, name: 'Товар 2', image: 'image2.png' },
        { id: 3, name: 'Товар 3', image: 'image3.png' },
        // Добавьте больше товаров по необходимости
      ]);
  
      return {
        products,
      };
    },
  });
  </script>
  
  <style scoped>
  .product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-left: 20px;
  }
  </style>
  