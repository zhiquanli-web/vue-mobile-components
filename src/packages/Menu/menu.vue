<template>
  <section class="menu-container">
    <div class="menu-header">
      <slot />
    </div>
    <ul class="menu-list">
      <sub-menu
        v-for="item in initMenu"
        :key="item.id"
        :item="item"
        :activeIds="activeIds"
        @handleClickMenu="handleClickMenu"
      />
    </ul>
  </section>
</template>

<script>
export default {
  name: "LiMenu",
  props: {
    list: {
      type: Array,
      require: true,
    },
  },
  provide() {
    return {
      comp: this,
    };
  },
  components: {
    SubMenu: () => import("./sub-menu.vue"),
  },
  data() {
    return {
      activeIds: [],
      menuIdList: [],
      initMenu: [],
      flag: false,
    };
  },
  watch: {
    initMenu: {
      handler(val) {
        if (val && val.length > 0 && !this.flag) {
          const defaultActiveIds = localStorage.getItem("activeArr");
          this.activeIds = defaultActiveIds
            ? JSON.parse(defaultActiveIds)
            : this.findActiveIds(val);
          this.flag = true;
        }
      },
      immediate: true,
    },
    activeIds: {
      handler(val, oldVal) {
        if (!this.compareArray(val, oldVal)) {
          // 保存当前激活组,用作缓存
          localStorage.setItem("activeArr", JSON.stringify(val));
        }
      },
      deep: true,
    },
  },
  computed: {},
  created() {
    this.initMenu = this.formatData(JSON.parse(JSON.stringify(this.list)));
    this.initMenuList = JSON.parse(JSON.stringify(this.initMenu));
  },
  methods: {
    // 更新激活菜单
    handleClickMenu(item) {
      const clickId = this.menuIdList[0]
      this.$emit('change', clickId)
      this.initMenu = this.activeIds.includes(clickId)
        ? this.formatData(this.initMenu, [], clickId)
        : this.initMenuList;
      // 当前点击类id
      let newArr = [];
      const hasChild = item.children && item.children.length > 0;
      if (clickId === item.id && hasChild) {
        // 点击一级菜单 且 存在子菜单
        newArr = this.findActiveIds(item.children);
      } else if (hasChild) {
        // 2级存在子菜单
        newArr = this.findActiveIds(item.children, [], clickId);
      }
      this.activeIds = [...new Set([...newArr, ...this.menuIdList])];
      this.menuIdList = [];
    },
    // 激活菜单组
    findActiveIds(arr, ids = [], curId, cLevel = 0) {
      if (!curId) {
        // 默认激活第一个最下级菜单
        const { id, children, level } = arr[0];
        if (children && children.length > 0 && level < 5) {
          this.findActiveIds(children, ids);
        }
        ids.push(id);
      } else {
        // 激活当前点击菜单 及其 子菜单
        for (let index = 0; index < arr.length; index++) {
          const { children, id, level } = arr[index];
          // if (level < 5) { // 控制最大展示层级
          if (children && children.length > 0) {
            // 存在子菜单
            if (id === +curId) {
              this.findActiveIds(children, ids);
              ids.push(id);
              break;
            } else {
              this.findActiveIds(children, ids, curId, cLevel);
              if (cLevel > level) {
                // 相同层级不重复push
                ids.push(id);
              }
            }
          } else {
            // 不存在子菜单
            if (id === +curId) {
              ids.push(id);
              break;
            }
          }
          // }
        }
      }
      return ids;
    },
    // 判断两个数组是否相同
    compareArray(arr1, arr2) {
      if (arr1 === arr2) return true;
      if ((!arr1 && arr2) || (arr1 && !arr2)) return false;
      if (arr1.length !== arr2.length) return false;
      for (var i = 0, n = arr1.length; i < n; i++) {
        if (arr1[i] !== arr2[i]) return false;
      }
      return true;
    },
    // 初始数据处理数据
    formatData(arr, newArr = [], curId) {
      for (let i = 0; i < arr.length; i++) {
        const { children, id, isOpen } = arr[i];
        arr[i].isOpen = typeof isOpen === "undefined" ? true : isOpen;
        newArr[i] = JSON.parse(JSON.stringify(arr[i]));
        if (curId && curId == id && arr[i].isOpen) {
          // 当前菜单展开状态控制
          newArr[i].isOpen = false;
        } else {
          newArr[i].isOpen = true;
        }
        if (children && children.length > 0) {
          this.formatData(children, newArr[i].children, curId);
        }
      }
      return newArr;
    },
  },
};
</script>

<style lang="scss">
.menu-container {
  border: 1px solid #ccc;
  width: vw(250);
  .menu-header {
    text-align: center;
  }
  .menu-list {
    height: auto;
    .menu-item {
      text-align: center;
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      &-text {
        display: inline-block;
        width: 100%;
        height: vw(60);
        line-height: vw(60);
      }
    }
  }
}
.menu-item {
  &.active-bar {
    .menu-item-text.active {
      color: #f60;
    }
  }
}

.menu-list {
  & > .menu-item {
    padding: 0 vw(10);
    & > .menu-list > .menu-item {
      padding: 0 vw(20);
    }
  }
}
</style>
