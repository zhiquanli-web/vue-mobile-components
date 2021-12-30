<template>
  <section class="radio-group-container">
    <slot />
  </section>
</template>

<script>
export default {
  name: "LiRadioGroup",
  componentName: "radioGroup",
  data() {
    return {};
  },
  props: {
    value: [Number, String],
    disabled: Boolean,
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
};
</script>

<style lang="scss" scoped></style>
