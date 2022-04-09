<template>
  <menu-item
    :item="item"
    @click.native="clickMenuItem(item)"
    :class="[
      item.id == comp.activeIds[comp.activeIds.length - 1] && 'active-bar',
    ]"
  >
    <span
      :class="['menu-item-text', comp.activeIds[0] === item.id && 'active']"
    >
      {{ item.name }}
    </span>
    <template v-if="hasChildren">
      <collapse-transition>
        <ul
          class="menu-list"
          v-show="comp.activeIds.includes(item.id) && item.isOpen"
        >
          <li-sub-menu
            v-for="subItem in item.children"
            :key="subItem.id"
            :item="subItem"
          />
        </ul>
      </collapse-transition>
    </template>
  </menu-item>
</template>

<script>
import CollapseTransition from "@/utils/collapse-transition";
export default {
  name: "LiSubMenu",
  inject: ["comp"],
  components: {
    MenuItem: () => import("./menu-item.vue"),
    "collapse-transition": CollapseTransition,
  },
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  computed: {
    hasChildren() {
      return this.item.children && this.item.children.length > 0;
    },
  },
  methods: {
    clickMenuItem(item) {
      this.comp.menuIdList.push(item.id);
      this.$emit("handleClickMenu", this.item);
    },
  },
};
</script>

<style lang="scss" scoped></style>
