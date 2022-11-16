<!-- Parent Unit -->
<template>
    <div>
        <router-link :to="{ name: 'UserList' }">User List</router-link> |
        <router-link :to="{ name: 'UserCreate' }">User Create</router-link> | 
        <router-link :to="{ name: 'UserRole' }">User Role Create</router-link>
    </div>
    <RouterView />
</template>
