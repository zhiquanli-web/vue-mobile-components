<template>
  <li @click.stop="selectOptionClick" :class="{ active: selected }" :ref="value">
    <slot></slot>
    <template v-if="!$slots.default">{{ label }}</template>
  </li>
</template>

<script>
export default {
  name: "LiOption",
  props: {
    value: [String, Number],
    label: [String, Number],
  },
  inject: ["select"],
  data() {
    return {
      selected: false,
    };
  },
  watch: {
    "select.query": {
      handler(val) {
        this.selected = val === this.value;
      },
      immediate: true,
    },
  },
  methods: {
    selectOptionClick() {
      this.$parent.$emit.apply(
        this.$parent,
        ["handleOptionClick"].concat([this, this.value])
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
