<template>
    <button :type="type" :disabled="disabled" class="button" @click="onClick">
        {{ label }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    label: string
}>();
</script>

<style scoped>
.button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #0056b3;
}

.button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
</style>