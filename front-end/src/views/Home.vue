<template>
    <div class="navbar">
        <div>
            <div class="small">{{ auth.user.name }}</div>
            <div class="small">{{ auth.user.email }}</div>
        </div>
        <div class="nav" v-for="nav in nav_menus" :key="nav.id">
            <router-link :to="{ name: nav.route_name }">{{ nav.title }}</router-link>
            <div class="nav-submenu" v-if="nav.has_submenu">
                <router-link class="nav-submenu-item" v-for="(sub_nav, index) in nav.submenu_items"
                    :key="nav.id + '-' + index" :to="{ name: sub_nav.route_name }">{{ sub_nav.title }}</router-link>
            </div>
        </div>
    </div>
    <!-- <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link> |
    <router-link :to="{ name: 'UnitList' }">Unit</router-link> |
    <router-link :to="{ name: 'UserList' }">User</router-link> |
    <router-link :to="{ name: 'Logout' }">Logout</router-link> -->
    <RouterView />
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import navigation from '../router/navigation';

// import { user, is_login, getAuth, authenticate } from '../datas/users';
const router = useRouter();
const store = useStore();

const auth = computed(() => store.getters['user/auth']);

const routers = ref({});

function getRoute(children) {
    children.forEach(function (r) {
        if (r.meta && r.name && r.meta.permissions) {
            routers.value[r.name] = r.meta.permissions;
        }
        if (r.children) {
            getRoute(r.children)
        }
    })
}

getRoute(router.options.routes[0].children)

const nav_menus = computed(() => {
    // all permissions allow for admin user role 
    if(auth.value.user.roles.find(role=>role.name.toLowerCase() === 'admin')) return navigation;
    
    return navigation.filter((menu) => {
        if (menu.has_submenu && menu.submenu_items) {
            menu.submenu_items = menu.submenu_items.filter(sub_menu => {
                if (sub_menu.route_name) {
                    return isPermissionExist(routers.value[sub_menu.route_name]);
                }
            });
        } else if (menu.route_name) {
            return isPermissionExist(routers.value[menu.route_name]);
        }
        return menu.submenu_items.length > 0;
    });
})
function isPermissionExist(permissions) {
    return permissions ? permissions.filter(permission => auth.value.user.permissions.includes(permission)).length > 0 : true;
}
// getAuth();
// check user logged in if not redirect to login page

checkUserIsLoggedIn();

async function checkUserIsLoggedIn() {
    if (auth.value.is_login) {
        if (!auth.value.user.email) {
            await store.dispatch('user/authenticate');
        }
    } else {
        routeToLoginPage();
    }
    return true;
}

function routeToLoginPage() {
    console.log('logut');
    router.push({ name: 'Login' })
}
</script>