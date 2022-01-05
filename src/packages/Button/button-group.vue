<template>
  <section class="button-group-container">
    <slot />
  </section>
</template>

<script>
export default {
  name: "LiButtonGroup",
  componentName: "buttonGroup",
  props: {
    value: {},
    type: String,
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
};
</script>

<style lang="scss" scoped></style>
