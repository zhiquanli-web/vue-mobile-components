<template>
  <section class="carousel-container" role="group">
    <slot />
  </section>
</template>

<script>
export default {
  name: "LiCarousel",
  componentName: "Carousel",
  data() {
    return {};
  },
  props: {
    value: {},
    disabled: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
