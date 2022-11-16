<template>
    <form @submit.prevent="submit()">
        <div style="width: 50%; display: inline-block; vertical-align: top;">
            <h2>User Role</h2>
            <div>
                <label>Name: </label>
                <input type="text" v-model="form_data.name">
                <span class="input-feedback">{{ error.name }}</span>
            </div>
            <input type="submit">
            <input v-if="form_data.id" type="button" value="Clear" @click="clearFormData()">
            <span>{{ error_message }}</span>
        </div>
        <div style="width: 50%; display: inline-block; vertical-align: top;">
            <h2>User Permission List</h2>
            <div v-for="permission in permissions" :key="permission.id">
                <div>
                    <label>
                        {{ permission.name }}
                        <input type="checkbox" @change="onPermissionSelect(permission.id)"
                            :checked="isPermissionSelected(permission.id)">
                    </label>
                </div>
            </div>
        </div>
    </form>
    <h2>User Role List</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Permissions</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(role, index) in roles" :key="role.id">
                <tr v-if="role.name.toLowerCase() !== 'admin'">
                    <td>{{ index }}.</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.permissions.map(p => p.name).join(', ') }}</td>
                    <td>
                        <input type="button" value="Edit" @click="editRole(role.id)">
                        <input type="button" value="Delete" @click="deleteRole(role.id)">
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const form_data = ref({
    id: null,
    name: '',
    permissions: []
});
const error = ref({});
const error_message = ref('');

const selected_permissions = ref([]);

const role = computed(() => store.getters['role/getRole']);
const roles = computed(() => store.getters['role/getRoles']);
const permissions = computed(() => store.getters['permission/getPermissions']);

async function submit() {
    if (validateFormData()) {
        console.log('submit');
        if (form_data.value.id) {
            await store.dispatch('role/updateRole', form_data.value);
        } else {
            await store.dispatch('role/createRole', form_data.value);
        }
        if (role.value.id) {
            clearFormData();
            fetchRoles();
        }
    }
}

function clearFormData() {
    form_data.value.id = null;
    form_data.value.name = '';
    form_data.value.permissions = [];
}

function fetchRoles() {
    store.dispatch('role/fetchRoles');
}
function fetchPermissions() {
    store.dispatch('permission/fetchPermissions');
}

fetchPermissions();
fetchRoles();

function editRole(id) {
    const current_role = roles.value.find(role => role.id === id)
    if (current_role) {
        form_data.value.id = current_role.id;
        form_data.value.name = current_role.name;
        form_data.value.permissions = current_role.permissions.map(p => p.id);
    }
}

async function deleteRole(id) {
    await store.dispatch('role/deleteRole', id);
    // fetchRoles();
}


function onPermissionSelect(id) {
    const selected_permission_index = form_data.value.permissions.indexOf(id);
    if (selected_permission_index > -1) {
        form_data.value.permissions.splice(selected_permission_index, 1);
    } else {
        form_data.value.permissions.push(id);
    }
}

function isPermissionSelected(id) {
    return form_data.value.permissions.indexOf(id) > -1;
}

function validateFormData() {

    clearErrors();

    if (!form_data.value.name) {
        error.value.name = 'Name is required';
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

