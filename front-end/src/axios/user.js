import apiRequest from ".";
import { restApi } from "./helper";

export default {
  ...restApi("user"),
  login(payload) {
    return apiRequest().post("login", payload);
  },
  logout() {
    return apiRequest().post("logout");
  },
  auth() {
    return apiRequest().get("auth");
  },
};
