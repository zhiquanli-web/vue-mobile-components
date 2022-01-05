<template>
  <section class="select-container">
    <input
      type="text"
      ref="select"
      :disabled="disabled"
      v-model="query"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
      readonly
      class="select-input"
    />
    <transition name="fade">
      <nav class="option-container" v-show="visible">
        <ul class="select-list" ref="selectList">
          <slot></slot>
        </ul>
      </nav>
    </transition>
  </section>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
export default {
  name: "LiSelect",
  props: {
    disabled: Boolean,
    value: [Number, String],
  },
  components: {
    Option: () => import("./options.vue"),
  },
  data() {
    return {
      query: "",
      visible: false,
      isFocus: false,
      scroll: null,
    };
  },
  provide() {
    return {
      select: this,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.scroll = Scrollbar.init(this.$refs.selectList, { damping: 0.2 });
        setTimeout(() => {
          const options = this.$refs.selectList.childNodes[0].childNodes;
          const active = Array.from(options).find((item) =>
            item.className.includes("active")
          );
          this.scroll.scrollTo(0, active.offsetTop, 500);
        }, 100);
      }
    },
  },
  created() {
    this.query = this.value;
    this.$on("handleOptionClick", this.handleOptionSelect);
  },
  methods: {
    handleFocus() {
      if (!this.isFocus) {
        this.visible = true;
      }
    },
    handleBlur() {
      this.visible = false;
      this.isFocus = false;
    },
    handleClick() {
      if (this.isFocus) this.visible = !this.visible;
      else this.isFocus = true;
    },
    handleOptionSelect(option, val) {
      this.query = val;
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
  beforeDestroy() {
    this.scroll && this.scroll.destroy();
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  max-height: vw(290);
  transition: max-height 0.3s ease-in;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
}
.select-container {
  position: relative;
  width: vw(350);
  height: vw(60);
  .select-input {
    box-sizing: border-box;
    outline: none;
    border: 1px #000 solid;
    border-radius: vw(8);
    width: 100%;
    height: 100%;
    text-indent: vw(10);
    &:focus {
      caret-color: #fb8241;
      border: #fb8241 1px solid;
    }
  }
  ::v-deep nav {
    box-sizing: border-box;
    position: absolute;
    z-index: 999;
    width: 100%;
    border-radius: vw(8);
    border: 1px solid #fb8241;
    overflow: hidden;
    margin-top: vw(10);
    background-color: #fff;
    .scrollbar-thumb {
      width: vw(8);
      border-radius: vw(4);
    }
    .scrollbar-track-y {
      width: vw(8);
      border-radius: vw(4);
    }
  }
  ::v-deep .select-list {
    max-height: vw(290);
    overflow: auto;
    li {
      border-radius: vw(6);
      padding: vw(10);
      &.active {
        background-color: #fb8241;
        color: #fff;
      }
    }
  }
}
</style>
