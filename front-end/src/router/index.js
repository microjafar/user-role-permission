import { createRouter, createWebHashHistory } from "vue-router";
import modules from "./modules";
// 1. Define route components.
// These can be imported from other files
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Dashboard from "../views/Dashboard.vue";
import UnitDashboard from "../views/UnitDashboard.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/404.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: {
      name: "Dashboard",
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "unit-dashboard",
        name: "UnitDashboard",
        component: UnitDashboard,
      },
      ...modules,
      {
        path: "/404",
        name: "404",
        component: NotFound,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// import {
//     is_login,
//     user,
//     getAuth,
//     authenticate
// } from '../datas/users'

import { computed } from "vue";
import store from "../store";
const user = computed(() => store.getters["user/getAuthUser"]);

router.beforeEach(async (to, from, next) => {
  const { permissions } = to.meta;

  console.log(store.getters["user/auth"].is_login);

  if (store.getters["user/auth"].is_login) {
    if (!user.value.id) {
      // if does not exist user data it will authenticate to server
      await store.dispatch("user/authenticate");
    }
    // if route meta has permissions
    if (permissions && permissions.length > 0) {
      const allowedPermissions = permissions.filter((permission) =>
        user.value.permissions.includes(permission)
      );
      console.log(allowedPermissions);

      /* if user role is admin route will not check the permissions  */
      const is_admin = user.value.roles.find(
        (role) => role.name.toLowerCase() === "admin"
      );
      if (is_admin) return next();

      /* if permission not exist return 404 page */
      if (allowedPermissions.length === 0)
        return next({
          name: "404",
        });
    }
  }

  next();
});

export default router;
