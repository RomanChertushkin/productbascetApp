<template>
    <div class="login-page">
        <div class="login-screen">
            <form @submit.prevent="handleSubmit" class="form">
                <label>Войдите в приложение</label>
                <div class="formgroup">
                    <label for="email">Почта:</label>
                    <InputComponent id="email" v-model="email" type="text"
                        :class="{ error: errors.email || accountNotFoundLabel }" />
                    <span v-if="errors.email">{{ errors.email }}</span>
                </div>

                <div class="formgroup">
                    <label for="password">Пароль:</label>
                    <InputComponent id="password" v-model="password" type="password"
                        :class="{ error: errors.password || accountNotFoundLabel }" />
                    <span v-if="errors.password">{{ errors.password }}</span>
                </div>

                <div class="account-notfound-container" v-if="accountNotFoundLabel">Аккаун не найден</div>

                <ButtonComponent type="submit" color="success" label="Войти"></ButtonComponent>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();

const accountNotFoundLabel = ref<boolean>(false);

const errors = ref<{ email?: string; password?: string }>({});

const validate = () => {
    errors.value = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value) {
        errors.value.email = 'Логин обязателен к заполнению';
    }

    if (!emailPattern.test(email.value)) {
        errors.value.email = 'Неправильный формат почты';
    }

    if (!password.value) {
        errors.value.password = 'Пароль обязателен к заполнению';
        return;
    }

    if (email.value != 'admin@email.com' && password.value != 'admin') {
        accountNotFoundLabel.value = true;
        return;
    }

    return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
    if (validate()) {
        accountNotFoundLabel.value = false;
        localStorage.setItem('logined', '1')
        router.push({ name: 'main' })
    }
};
</script>

<style scoped lang='scss'>
.login-page {
    width: 100%;
    height: 100%;
    padding-right: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.login-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 400px;

    padding: 20px;
    border: 1px solid #ddd;
    background-color: #ffff;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

.formgroup {
    width: 100%;

    input {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .error {
        border-color: red;
    }

    span {
        color: red;
        font-size: 0.9em;
    }
}

.account-notfound-container {
    background-color: rgb(207, 86, 86);
    color: white;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px
}
</style>