<template>
  <section class="carousel-item-container" role="group">
    <slot />
  </section>
</template>

<script>
export default {
  name: "LiCarouselItem",
  componentName: "CarouselItem",
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
