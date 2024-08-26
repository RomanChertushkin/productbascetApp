<template>
    <div class="cart-container" v-if="cart?.products.length && productStore.cartLoaded">
        <h2>Товары в корзине</h2>
        <table class="cart-table">
            <thead>
                <tr>
                    <th width="50px" style="padding-left: 10px;">№</th>
                    <th>Товар</th>
                    <th width="170px">Количество</th>
                    <th width="100px">Цена за ед.</th>
                    <th width="100px">Итого</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cartProduct, index) in cart?.products" :key="cartProduct.realProduct?.id">
                    <td style="padding-left: 10px;">{{ index + 1 }}</td>
                    <td class="product-info">
                        <img :src="cartProduct.realProduct?.image" alt="product image" class="product-image" />
                        <span>{{ cartProduct.realProduct?.title }}</span>
                    </td>
                    <td>
                        <ButtonComponent class="minibtn" color="success" @click="decrementQuantity(cartProduct)"
                            label="-">
                        </ButtonComponent>
                        <span>{{ cartProduct.quantity }}</span>
                        <ButtonComponent class="minibtn-right" color="success" @click="incrementQuantity(cartProduct)"
                            label="+">
                        </ButtonComponent>
                    </td>
                    <td>{{ cartProduct.realProduct?.price }}₽</td>
                    <td>{{ (cartProduct.realProduct?.price || 0) * cartProduct.quantity }}₽</td>
                </tr>
            </tbody>
        </table>
        <div class="cart-summary">
            <p>Всего товаров {{ totalQuantity }} на сумму {{ totalPrice }}₽</p>
            <ButtonComponent color="success" @click="placeOrder" label="Оформить заказ"></ButtonComponent>
        </div>

        <div v-if="isOrderPlaced" class="modal">
            <h1>Заказ №11223</h1>
            <br>
            <p>Заказ успешно оформлен!</p>
            <br>
            <ButtonComponent color="success" @click="closeModal" label="Закрыть"></ButtonComponent>
        </div>
    </div>
    <div v-else-if="productStore.cartLoaded" class="eamptycart-container">
        <h1>Корзина пуста</h1>
        <br>
        <ButtonComponent @click="routeToMainPage" label="Вернутся к покупкам" color="success"></ButtonComponent>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import type { Cart, CartProduct } from '@/types/cartType';
import { useProductStore } from '@/stores/productStore';
import ButtonComponent from './ButtonComponent.vue';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

const routeToMainPage = () => {
    router.push({ name: 'main' });
}

const cart = computed<Cart | null>(() => {
    return productStore.cart
});

const isOrderPlaced = ref(false);

type DebounceFunction = (...args: any[]) => void;

const debounce = (func: DebounceFunction, delay: number): DebounceFunction => {
    let debounceTimer: number | undefined;

    return function (this: any, ...args: any[]) {
        const context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const debouncedEditCart = debounce((cartObj: Cart) => {
    productStore.editCart(cartObj as Cart)
}, 300);

const incrementQuantity = (cartProduct: CartProduct) => {
    const cartObj = cart.value as Cart;
    const cardProductIndex: number = cartObj?.products.findIndex(e => {
        return cartProduct.productId == e.productId;
    }) || 0

    if (cardProductIndex != -1) {
        cartObj.products[cardProductIndex].quantity += 1;
    }

    debouncedEditCart(cartObj)
}

const decrementQuantity = (cartProduct: CartProduct) => {
    const cartObj = cart.value as Cart;
    const cardProductIndex: number = cartObj?.products.findIndex(e => {
        return cartProduct.productId == e.productId;
    }) || 0

    if (cartProduct.quantity > 1) {
        cartObj.products[cardProductIndex].quantity -= 1;
    } else {
        cartObj.products.splice(cardProductIndex, 1);
    }

    debouncedEditCart(cartObj)
}

const totalQuantity = computed(() => {
    return productStore.cart?.products.reduce((total, product) => total + product.quantity, 0)
});

const totalPrice = computed(() => {
    return productStore.cart?.products.reduce((total, product) => total + (product.quantity * (product.realProduct?.price || 0)), 0);
});

function placeOrder() {
    isOrderPlaced.value = true;
}

const closeModal = () => {
    isOrderPlaced.value = false;
    router.push({ name: 'main' })
};

watch(() => productStore.cart, (newVal) => {
    console.log(123)
    newVal?.products.forEach(e => {
        productStore.fetchProduct(e.productId, true)
    })
})

onMounted(() => {
    productStore.cart?.products.forEach(e => {
        productStore.fetchProduct(e.productId, true)
    })
})
</script>

<style scoped lang="scss">
.cart-container {
    width: 900px;
    height: 430px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

    h2 {
        text-align: start;
    }
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.cart-table th,
.cart-table td {
    padding: 12px 0px;
    border-bottom: 1px solid #ddd;
    text-align: start;

    height: 30px span {
        font-weight: 600;
    }
}

.cart-table th {
    background-color: #4CAF50;
    color: white;

    height: 10px
}

.cart-table tr:hover {
    background-color: #f1f1f1;
}

.product-info {
    display: flex;
    align-items: center;
}

.product-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.cart-summary {
    font-size: 18px;
    margin-top: 20px;

    display: flex;
    justify-content: space-between;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 1000;
}

.eamptycart-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%
}

.minibtn {
    margin-right: 10px;
}

.minibtn-right {
    margin-left: 10px;
}
</style>