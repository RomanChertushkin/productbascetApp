<template>
    <div class="product-card">
      <div class="product-image">Изображение</div>
      <div class="product-name">{{ product.name }}</div>
      <button class="add-to-cart">В корзину</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  interface Product {
    id: number;
    name: string;
    image: string;
  }
  
  export default defineComponent({
    name: 'ProductCard',
    props: {
      product: {
        type: Object as PropType<Product>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .product-image {
    width: 100%;
    height: 150px;
    background-color: #f0f0f0;
    margin-bottom: 10px;
  }
  
  .add-to-cart {
    background-color: #8bc34a;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .add-to-cart:hover {
    background-color: #7cb342;
  }
  </style>
  