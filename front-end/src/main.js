import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Guard from "./components/Guard.vue";

const app = createApp(App);
app.use(router).use(store).mount("#app");

app.component("guard", Guard);
