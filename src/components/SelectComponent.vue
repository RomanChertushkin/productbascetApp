<template>
    <div class="select-container">
      <select
        v-model="selectedValue"
        @change="handleChange"
        class="select-input"
      > 
        <option value="" disabled hidden selected>{{ props.placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits, defineProps, ref, watch } from 'vue';
  
  // Определение пропсов
  interface Option {
    label: string;
    value: string | number;
  }
  
  const props = defineProps<{
    modelValue: string | number;
    options: Option[];
    placeholder: string
  }>();
  
  // Определение событий
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
  }>();
  
  // Локальное состояние для привязки v-model
  const selectedValue = ref(props.modelValue);
  
  // Слежение за изменениями props.modelValue и синхронизация с локальным состоянием
  watch(
    () => props.modelValue,
    (newValue) => {
      selectedValue.value = newValue;
    }
  );
  
  // Обработка изменения значения и отправка события
  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
  };
  </script>
  
  <style scoped>
  .select-container {
    display: inline-block;
    position: relative;
    width: 100%;
  }
  
  .select-input {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    appearance: none;
    background-color: #fff;
    cursor: pointer;

    option {
        font-weight: 600;
    }
  }
  
  .select-input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .select-input::-ms-expand {
    display: none;
  }
  
  .select-container::after {
    content: '▼';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 12px;
    color: #777;
  }
  </style>
  