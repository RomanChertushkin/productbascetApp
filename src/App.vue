<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import CartBtn from './components/CartBtn.vue';

const router = useRouter();
</script>

<template>
  <header v-if="router.currentRoute.value.meta.headerNeeded">
    <img src="@/assets/logo.svg" class="logo" @click="router.push({ name: 'main' })" />
    <CartBtn />
  </header>
  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 60px;
  padding-left: 20px;
  padding-left: 20px;
}

.logo {
  display: block;
  cursor: pointer;
}

.main-content {
  display: flex;
  padding: 20px 0 0 20px;
  gap: 20px;
  height: 92vh;
}
</style>
