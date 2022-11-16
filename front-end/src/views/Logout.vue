<template>
    <div></div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
const error_response = computed(() => store.getters['user/getErrorResponse']);

async function logout() {
    await store.dispatch('user/logout');
    if (error_response.value.is_error) {
        console.log(error_response.value.message);
    } else {
        await router.push({ name: 'Login' })
    }
}

logout();

</script>