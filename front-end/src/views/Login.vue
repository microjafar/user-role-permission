<template>
    <h1>Login</h1>
    <form @submit.prevent="submit()">
        <table>
            <tr>
                <th>Email: </th>
                <td>
                    <input type="text" v-model="form_data.email">
                    <span>{{ error.email }}</span>
                </td>
            </tr>
            <tr>
                <th>Password: </th>
                <td>
                    <input type="password" v-model="form_data.password">
                    <span>{{ error.password }}</span>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" value="Login" style="width: 100%">
                    <span>{{ error_message }}</span>
                </td>
            </tr>
        </table>
    </form>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const form_data = ref({
    email: 'yosinski@example.org',
    password: 'password',
});
const error = ref({});
const error_message = ref('');

const auth = computed(()=>store.getters['user/auth']);
const error_response = computed(()=>store.getters['user/getErrorResponse']);

if (auth.value.is_login) {
    router.push({ name: 'Home' });
}

async function submit() {
    if (validateFormData()) {
        await store.dispatch('user/login', form_data.value);
        console.log(error_response.value);
        if (error_response.value.is_error) {
            error_message.value = error_response.value.message;
        }
        else {
            router.push({ name: 'Dashboard' });
        }
    }
}

function validateFormData() {

    clearErrors();

    if (!form_data.value.email) {
        error.value.email = 'Email is required';
    }
    if (!form_data.value.password) {
        error.value.password = 'Password is required';
    }

    // get error values only in array 
    const error_values = Object.values(error.value);

    // check zero error value 
    if (error_values.length === 0) {
        return true;
    }
    return false;

}

function clearErrors() {
    error.value = {};
    error_message.value = '';
}

</script> 