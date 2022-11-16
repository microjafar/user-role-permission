<template>
    <form @submit.prevent="submit()">
        <h2>User Edit</h2>
        <div>
            <label class="form-label">Name: </label>
            <input type="text" v-model="form_data.name">
            <span class="input-feedback">{{ error.name }}</span>
        </div>
        <div>
            <label class="form-label">Email: </label>
            <input type="text" v-model="form_data.email">
            <span class="input-feedback">{{ error.email }}</span>
        </div>
        <div class="mb-3">
            <label class="form-label">User Role: </label>
            <div v-for="role in roles" :key="role.id" :value="role.id">
                <div>
                    <label>{{ role.name }} <input type="checkbox" @change="onUserRoleSelect(role.id)"
                            :checked="isUserRoleSelected(role.id)"></label>
                </div>
            </div>
            <span class="input-feedback">{{ error.password }}</span>
        </div>
        <div class="mb-3">
            <label class="form-label">User Permission List: </label>
            <div v-for="permission in permissions" :key="permission.id">
                <div>
                    <label>{{ permission.name }} <input type="checkbox" @change="onPermissionSelect(permission.id)"
                            :checked="isPermissionSelected(permission.id)"></label>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Unit List: </label>
            <div v-for="unit in units" :key="unit.id">
                <div>
                    <label>{{ unit.name }} <input type="checkbox" @change="onUnitSelect(unit.id)"
                            :checked="isUnitSelected(unit.id)"></label>
                </div>
            </div>
        </div>
        <input type="submit">
        <span>{{ error_message }}</span>
    </form>
</template>


<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const current_user_id = route.params.id;
const form_data = ref({
    id: null,
    name: '',
    email: '',
    user_roles: [],
    permissions: [],
    units: [],
});

const error = ref({});
const error_message = ref('');

const user = computed(() => store.getters['user/getUser']);
const roles = computed(() => store.getters['role/getRoles']);
const permissions = computed(() => store.getters['permission/getPermissions']);
const units = computed(() => store.getters['unit/getUnits']);

function fetchRoles() {
    store.dispatch('role/fetchRoles');
}
function fetchPermissions() {
    store.dispatch('permission/fetchPermissions');
}
function fetchUnits() {
    store.dispatch('unit/fetchUnits');
}
async function fetchUser() {
    if (current_user_id) {
        await store.dispatch('user/fetchUser', current_user_id);
        form_data.value = {
            id: user.value.id,
            name: user.value.name,
            email: user.value.email,
            user_roles: user.value.roles.length > 0 ? user.value.roles.map(role => role.id) : [],
            permissions: user.value.permissions.length > 0 ? user.value.permissions.map(permission => permission.id) : [],
            units: user.value.units.length > 0 ? user.value.units.map(unit => unit.id) : [],
        }
    }
}

// init load
fetchRoles();
fetchPermissions();
fetchUser();
fetchUnits();

async function submit() {
    if (validateFormData()) {
        await store.dispatch('user/updateUser', form_data.value);
        if (user.value.id) {

            error_message.value = 'Success';
        }
    }
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

function onUnitSelect(id) {
    const selected_unit_index = form_data.value.units.indexOf(id);
    if (selected_unit_index > -1) {
        form_data.value.units.splice(selected_unit_index, 1);
    } else {
        form_data.value.units.push(id);
    }
}

function isUserRoleSelected(id) {
    return form_data.value.user_roles.indexOf(id) > -1;
}

function isPermissionSelected(id) {
    return form_data.value.permissions.indexOf(id) > -1;
}

function isUnitSelected(id) {
    return form_data.value.units.indexOf(id) > -1;
}

function validateFormData() {

    clearErrors();

    if (!form_data.value.name) {
        error.value.name = 'Name is required';
    }
    if (!form_data.value.email) {
        error.value.email = 'Email is required';
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
