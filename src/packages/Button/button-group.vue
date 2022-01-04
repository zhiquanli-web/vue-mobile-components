<template>
  <section class="button-group-container" role="group">
    <slot />
  </section>
</template>

<script>
export default {
  name: "LiButtonGroup",
  componentName: "buttonGroup",
  data() {
    return {};
  },
  props: {
    value: {},
  },
};
</script>

<style lang="scss" scoped></style>
