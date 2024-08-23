<template>
    <div class="main-content">
        <FilterPanel />
        <ProductList />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FilterPanel from '@/components/FilterPanel.vue';
import ProductList from '@/components/ProductList.vue';

export default defineComponent({
    name: 'App',
    components: {
        FilterPanel,
        ProductList,
    },
});
</script>

<style scoped>
.main-content {
    display: flex;
    padding: 20px;
}
</style>