<template>
  <div class="home">
    <!-- 单选框 -->
    <li-radio label="0" v-model="value0">按钮0</li-radio>
    <!-- 单选框组 -->
    <li-radio-group v-model="value1" @change="radioChange">
      <li-radio label="1">按钮1</li-radio>
      <li-radio label="2">按钮2</li-radio>
    </li-radio-group>

    <!-- 复选框 -->
    <li-checkbox label="复选框0" v-model="check">复选框0</li-checkbox>
    <!-- 复选框组 -->
    <li-checkbox-group v-model="checkList" @change="checkboxChange">
      <li-checkbox label="复选框1">复选框1</li-checkbox>
      <li-checkbox label="复选框2">复选框2</li-checkbox>
      <li-checkbox label="复选框3">复选框3</li-checkbox>
    </li-checkbox-group>

    <!-- 选择器 -->
    <li-select v-model="select" @change="selectChange">
      <li-option v-for="item in list" :key="item.value" :value="item.value">
        {{ item.label }}
      </li-option>
    </li-select>
    <br />
    <li-button @change="handleClick" type="text">11</li-button>
    <li-button @change="handleClick">22</li-button>
    <br />
    <br />
    <li-button-group v-model="label" @change="handleClick" :type="type">
      <li-button>3</li-button>
      <li-button>4</li-button>
    </li-button-group>
    <!-- swiper -->
    <!-- <li-swiper :list="swiperList" :slidesPerView="3" :pagination="true"></li-swiper> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value0: "0",
      value1: "2",
      check: true,
      checkList: ["复选框3"],
      list: [
        { label: "选项1", value: 1 },
        { label: "选项2", value: 2 },
        { label: "选项3", value: 3 },
        { label: "选项4", value: 4 },
        { label: "选项5", value: 5 },
        { label: "选项6", value: 6 },
        { label: "选项7", value: 7 },
      ],
      select: 7,
      swiperList: [1, 2, 3, 4, 5],
      label: 4,
      type: "button",
    };
  },
  methods: {
    radioChange(val) {
      console.log("单选框", val);
    },
    checkboxChange(val) {
      console.log("复选框", val);
    },
    selectChange(val) {
      console.log("选择器", val);
    },
    handleClick(val) {
      console.log("按钮", val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
