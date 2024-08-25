<template>
    <div class="filter-panel">
        <h3>Фильтр</h3>
        <hr />

        <div class="filter-panel-content">
            <div class="form-group">
                <label>Категория</label>
                <SelectComponent v-model="selectedCategory" :options="optionsList" placeholder="Выберите категорию" />
            </div>

            <div class="form-group">
                <label>Цена</label>

                <div class="form-group-minMaxContent">
                    <InputComponent v-model="minPrice" type="number" placeholder="Мин. цена" />
                    <InputComponent v-model="maxPrice" type="number" placeholder="Макс. цена" />
                </div>
            </div>
            <div class="form-group-buttonsGroup">
                <ButtonComponent label="Сброс" @click="resetFilters" />
                <ButtonComponent label="Применить" color="success" @click="applyFilters" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { type Option } from '@/types/optionType';
import SelectComponent from '@/components/SelectComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useProductStore } from '@/stores/productStore';

const selectedCategory = ref('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const productStore = useProductStore();

const optionsList = computed<Option[]>(() => {
    return productStore.categories.map((e: string) => {
        return { label: e.toLocaleUpperCase(), value: e }
    })
})

const applyFilters = () => {
    const filter = {
        category: selectedCategory.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
    }

    productStore.applyFilters(filter);
};

const resetFilters = () => {
    selectedCategory.value = '';
    minPrice.value = null;
    maxPrice.value = null;

    applyFilters();
};


onMounted(() => {
    productStore.fetchProductsCategories();
})

</script>

<style scoped lang="scss">
.filter-panel {
    color: black;
    border-radius: 5px;
    width: 356px;
    height: 93vh;

    background-color: #ffffff;
    border-radius: 5px;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    h3 {
        font-weight: bold;
        font-size: 20px;
        padding-left: 10px;
    }

    &-content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &-minMaxContent {
            display: flex;
            justify-content: space-between;
            gap: 16px;
        }

        &-buttonsGroup {
            margin-top: 16px;
            display: flex;
            justify-content: end;
            gap: 16px
        }
    }
}

label {
    font-weight: bold;
}
</style>