import User from "../../views/user/User.vue";
import UserCreate from "../../views/user/UserCreate.vue";
import UserEdit from "../../views/user/UserEdit.vue";
import UserList from "../../views/user/UserList.vue";
import UserRole from "../../views/user/UserRole.vue";

export default [
  {
    path: "user",
    name: "User",
    component: User,
    children: [
      {
        path: "",
        name: "UserList",
        component: UserList,
        meta: {
          permissions: ["User Read"],
        },
      },
      {
        path: "create",
        name: "UserCreate",
        component: UserCreate,
        meta: {
          permissions: ["User Create"],
        },
      },
      {
        path: "role",
        name: "UserRole",
        component: UserRole,
        meta: {
          permissions: ["User Role Create"],
        },
      },
      {
        path: ":id/update",
        name: "UserEdit",
        component: UserEdit,
        meta: {
          permissions: ["User Update"],
        },
      },
    ],
  },
];
