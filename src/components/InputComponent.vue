<template>
    <input :type="type" :value="modelValue" @input="onInput" :placeholder="placeholder" :disabled="disabled"
        class="input-field" />
</template>

<script setup lang="ts">

defineProps<{
    modelValue: string | number | null;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}>();

// Определение emits
const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();

// Обработка ввода
const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    outline: none;
}

.input-field:focus {
    border-color: #007bff;
}

.input-field:disabled {
    background-color: #f5f5f5;
    border-color: #ddd;
    cursor: not-allowed;
}
</style>