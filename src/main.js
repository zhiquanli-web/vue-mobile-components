import "normalize.css";
import "@/assets/styles/index.scss";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Radio from "@/packages/Radio/index";
import RadioGroup from "./packages/RadioGroup";
import Select from "@/packages/Select";
import Option from "./packages/Option";
import Checkbox from "@/packages/Checkbox";
import CheckboxGroup from "./packages/CheckboxGroup";
import Button from "./packages/Button";
import ButtonGroup from "./packages/ButtonGroup";
import Swiper from "./packages/Swiper";
import Menu from "./packages/Menu"
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Swiper);
Vue.use(Menu);

import Toast from "@/packages/Toast/index";
Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
