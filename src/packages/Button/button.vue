<template>
  <button
    :class="[
      'button-content',
      isGroup && model == curLabel && 'active',
      buttonType,
    ]"
    @click="handleClick"
  >
    <span class="value">
      <span v-if="$slots.default"><slot></slot></span>
    </span>
  </button>
</template>

<script>
import { dispatch } from "@/utils";
export default {
  name: "LiButton",
  props: {
    label: {},
    type: {
      type: String,
      default: "button",
    },
  },
  data() {
    return {
      active: "",
    };
  },
  computed: {
    curLabel() {
      return this.label || this.$slots.default[0].text;
    },
    model: {
      get() {
        return this.isGroup
          ? this.store
          : this.label || this.$slots.default[0].text;
      },
      set(val) {
        if (this.isGroup) {
          this.oldModel = val;
          dispatch("buttonGroup", "input", [val], this);
        } else {
          this.$emit("change", val);
        }
      },
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "buttonGroup") {
          parent = parent.$parent;
        } else {
          this.buttonGroup = parent;
          return true;
        }
      }
      return false;
    },
    store() {
      return this.buttonGroup
        ? this.buttonGroup.value
        : this.label || this.$slots.default[0].text;
    },
    buttonType() {
      return this.isGroup ? this.buttonGroup.type : this.type;
    },
  },
  created() {
    if (this.isGroup) {
      this.oldModel = this.model;
    }
  },
  methods: {
    handleClick() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        if (this.isGroup) {
          const newVal = this.label || this.$slots.default[0].text;
          if (newVal == this.buttonGroup.value) return;
          this.model = newVal;
          dispatch("buttonGroup", "handleChange", newVal, this);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.button-content {
  outline: none;
  border: none;
  background-color: transparent;
  margin-right: vw(16);
  &.button {
    box-sizing: border-box;
    outline: none;
    height: vw(50);
    border: 1px solid #b1906b;
    padding: 0 vw(30);
    line-height: vw(50);
    border-radius: vw(8);
    color: #b1906b;
    &.active {
      border-color: transparent;
      background-color: #b1906b;
      color: #fb8241;
    }
  }
  &.text {
    color: #b1906b;
    &.active {
      border: none;
      color: #fb8241;
    }
  }
}
</style>
