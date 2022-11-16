<template>
    <h2>User List</h2>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Units</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
                <td>{{ index + 1 }}.</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.roles.map(role=>role.name).join(", ") }}</td>
                <td>{{ user.units.map(unit=>unit.name).join(", ") }}</td>
                <td>
                    <router-link :to="{ name: 'UserEdit', params: { id: user.id } }">Edit</router-link>
                    <input type="button" value="Delete" @click="deleteUser(user.id)">
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const users = computed(() => store.getters['user/getUsers']);

fetchUsers();

function fetchUsers() {
    store.dispatch('user/fetchUsers');
}

async function deleteUser(id) {
    await store.dispatch('user/deleteUser', id);
    fetchUsers();
}
</script>
