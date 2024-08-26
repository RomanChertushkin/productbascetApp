<template>
    <button :type="type" :disabled="disabled" class="button">
        {{ label }}
        <div class="alert-icon" v-if="alertIconNumber" :class="{ 'alert-icon-animated': animated }">
            {{ alertIconNumber }}
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';

const props = defineProps<{
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    label: string;
    color?: 'warn' | 'success' | 'info';
    alertIconNumber?: number | null;
}>();

const animated = ref<boolean>(false);

watch(() => props.alertIconNumber, (newVal: number | null | undefined) => {
    animated.value = newVal ? true : false;
    setTimeout(() => {
        animated.value = false;
    }, 1000)
});

const btnColor = computed(() => {
    if (props.color === 'warn') {
        return '#c34a4a'
    }

    if (props.color === 'success') {
        return '#8bc34a'
    }

    if (props.color === 'info') {
        return '#4a55c3'
    }

    return '#4a55c3'
})
</script>

<style scoped>
.button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: v-bind(btnColor);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
}

.button:hover {
    filter: brightness(85%);
}

.button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.alert-icon {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(248, 101, 101);
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-icon-animated {
    animation-name: slidein;
    animation-duration: 0.3s;
    animation-timing-function: cubic-bezier(.22, .54, .73, .43)
}

@keyframes slidein {
    0% {
        top: -5px;
    }

    50% {
        top: -10px
    }

    100% {
        top: -5px;
    }
}
</style>