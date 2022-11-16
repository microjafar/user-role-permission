<template>
    <h2>User Create</h2>
    <form @submit.prevent="submit()">
        <div>
            <label>Name: </label>
            <input type="text" v-model="form_data.name">
            <span class="input-feedback">{{ error.name }}</span>
        </div>
        <div>
            <label>Email: </label>
            <input type="text" v-model="form_data.email">
            <span class="input-feedback">{{ error.email }}</span>
        </div>
        <div>
            <label>Password: </label>
            <input type="text" v-model="form_data.password">
            <span class="input-feedback">{{ error.password }}</span>
        </div>
        <div>
            <label class="form-label">User Role: </label>
            <div v-for="role in roles" :key="role.id" :value="role.id">
                <div>
                    <label>{{ role.name }} <input type="checkbox" @change="onUserRoleSelect(role.id)"
                            :checked="isUserRoleSelected(role.id)"></label>
                </div>
            </div>
            <span class="input-feedback">{{ error.password }}</span>
        </div>
        <label class="form-label">User Permission List: </label>
        <div v-for="permission in permissions" :key="permission.id">
            <div>
                <label>{{ permission.name }} <input type="checkbox" @change="onPermissionSelect(permission.id)"
                        :checked="isPermissionSelected(permission.id)"></label>
            </div>
        </div>

        <input type="submit">
        <span>{{ error_message }}</span>
    </form>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const form_data = ref({
    name: '',
    email: '',
    password: '',
    user_roles: [],
    permissions: []
});
const error = ref({});
const error_message = ref('');

const user = computed(() => store.getters['user/getUser']);
const roles = computed(() => store.getters['role/getRoles']);
const permissions = computed(() => store.getters['permission/getPermissions']);

function fetchRoles() {
    store.dispatch('role/fetchRoles');
}

function fetchPermissions() {
    store.dispatch('permission/fetchPermissions');
}


function onUserRoleSelect(id) {
    const selected_user_role_index = form_data.value.user_roles.indexOf(id);
    if (selected_user_role_index > -1) {
        form_data.value.user_roles.splice(selected_user_role_index, 1);
    } else {
        form_data.value.user_roles.push(id);
    }
}

function onPermissionSelect(id) {
    const selected_permission_index = form_data.value.permissions.indexOf(id);
    if (selected_permission_index > -1) {
        form_data.value.permissions.splice(selected_permission_index, 1);
    } else {
        form_data.value.permissions.push(id);
    }
}

function isUserRoleSelected(id) {
    return form_data.value.user_roles.indexOf(id) > -1;
}

function isPermissionSelected(id) {
    return form_data.value.permissions.indexOf(id) > -1;
}

fetchRoles();
fetchPermissions();


async function submit() {
    if (validateFormData()) {
        await store.dispatch('user/createUser', form_data.value);
        if (user.value.id) {
            form_data.value.name = '';
            form_data.value.email = '';
            form_data.value.password = '';
            form_data.value.user_roles = [];
            form_data.value.permissions = [];   
            error_message.value = 'Success';
        }
    }
}

function validateFormData() {

    clearErrors();

    if (!form_data.value.name) {
        error.value.name = 'Name is required';
    }
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
