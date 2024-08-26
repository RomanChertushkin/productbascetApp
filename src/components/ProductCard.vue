<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image" />
    </div>
    <div class="product-name">{{ product.title }}</div>
    <div class="product-price">{{ product.price }}$</div>
    <ButtonComponent label="В корзину" color="success" @click="editCart"></ButtonComponent>
  </div>
</template>

<script lang="ts" setup>
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/productType';
import ButtonComponent from './ButtonComponent.vue';
import type { Cart } from '@/types/cartType';

const props = defineProps<{
  product: Product,
}>();

const productStore = useProductStore();

const editCart = () => {
  const cartObj: Cart | null = productStore.cart;
  cartObj?.products.push({
    productId: props.product.id,
    quantity: 1
  })
  productStore.editCart(cartObj as Cart, true, props.product.id);
}
</script>

<style scoped>
.product-card {
  position: relative;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  width: 290px;
  height: 300px;
  text-align: center;
  transition: 0.3s;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid rgb(218, 215, 215);
  border-radius: 5px;

  img {
    max-width: 80%;
    max-height: 80%;
    object-fit: cover;
  }
}

.product-name {
  font-weight: bold;
  font-size: 15px;
  height: 82px;
  text-align: start;
  overflow-wrap: break-word;
  text-wrap: balance;
  word-wrap: unset;

  overflow-y: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.product-price {
  position: absolute;
  right: 8px;
  width: 60px;
  top: 140px;
  text-align: center;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  background-color: #8bc34a;

  display: flex;
  justify-content: center;
}
</style>