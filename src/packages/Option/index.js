import Option from "../Select/options.vue";
Option.install = function (Vue) {
  Vue.component(Option.name, Option);
};

export default Option;
