import { createStore } from "vuex";
import user from "./modules/user";
import role from "./modules/role";
import permission from "./modules/permission";
import unit from "./modules/unit";

export default createStore({
  modules: {
    user: user,
    role: role,
    permission: permission,
    unit: unit,
  },
});
