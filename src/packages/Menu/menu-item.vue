<template>
  <li class="menu-item">
    <slot />
  </li>
</template>

<script>
export default {
  name: "LiMenuItem",
  props: {
    item: Object,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
