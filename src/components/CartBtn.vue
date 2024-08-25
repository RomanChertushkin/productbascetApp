<template>
    <ButtonComponent label="Корзина" :alertIconNumber="productsLength" />
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useProductStore } from '@/stores/productStore';
import { computed, onMounted } from 'vue';

const productStore = useProductStore();

const productsLength = computed<number | null>((): number | null => {
    return productStore.cart ? productStore.cart.products.length : null;
});

onMounted(() => {
    productStore.fetchCart();
})
</script>