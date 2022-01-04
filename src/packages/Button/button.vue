<template>
  <div class="button">
    <span class="text">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </div>
</template>

<script>
export default {
  name: "LiButton",
  props: {
    label: {},
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
