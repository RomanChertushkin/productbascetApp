<template>
    <ButtonComponent label="Корзина" :alertIconNumber="productsLength" @click="router.push({ name: 'cart' })" />
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useProductStore } from '@/stores/productStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

const productsLength = computed<number | null>((): number | null => {
    return productStore.cart ? productStore.cart.products.length : null;
});

onMounted(() => {
    productStore.fetchCart();
})
</script>