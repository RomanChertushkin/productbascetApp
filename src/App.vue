<script setup lang="ts">
import { RouterView } from 'vue-router'
import CartBtn from './components/CartBtn.vue';
</script>

<template>
  <header>
    <img src="@/assets/logo.svg" />
    <CartBtn />
  </header>

  <RouterView />
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
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
