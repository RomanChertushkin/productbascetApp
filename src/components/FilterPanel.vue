<template>
    <div class="filter-panel">
        <h3>Фильтр</h3>
        <hr />

        <div class="filter-panel-content">
            <div class="form-group">
                <label>Категория</label>
                <SelectComponent v-model="selectedOption" :options="optionsList" placeholder="Выберите категорию" />
            </div>

            <div class="form-group">
                <label>Цена</label>

                <div class="form-group-minMaxContent">
                    <InputComponent v-model="minPrice" type="number" placeholder="Мин. цена" />
                    <InputComponent v-model="maxPrice" type="number" placeholder="Макс. цена" />
                </div>
            </div>
            <div>
                <ButtonComponent label="Сброс" @click="resetFilters" />
                <ButtonComponent label="Применить" @click="applyFilters" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SelectComponent from '@/components/SelectComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue'

const selectedCategory = ref('');
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

interface Option {
    label: string,
    value: string,
}

const selectedOption = ref<string | number>('');
const optionsList: Option = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const resetFilters = () => {
    selectedCategory.value = '';
    minPrice.value = null;
    maxPrice.value = null;
};

const applyFilters = () => {
    console.log('Filters applied:', { selectedCategory, minPrice, maxPrice });
};

</script>

<style scoped lang="scss">
.filter-panel {
    color: black;
    background: #ededed;
    border-radius: 5px;
    width: 200px;

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
    }
}

label {
    font-weight: bold;
}
</style>