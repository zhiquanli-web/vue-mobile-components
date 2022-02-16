<!-- 滑动轮播组件: 兼容移动端、PC端 -->
<template>
  <section class="swiper-main">
    <!-- 轮播盒子 -->
    <div class="swiper">
      <!-- 移动容器 -->
      <div
        class="swiper-container"
        ref="swiper-container"
        @touchend="touchend"
        @touchmove="touchmove"
        @touchstart="touchstart"
      >
        <!-- 滑块 -->
        <div
          class="swiper-item"
          ref="swiper-item"
          v-for="item in list"
          :key="item"
          :style="{
            width:
              Math.ceil(
                (swiperWidth - spaceBetween * (slidesPerView - 1)) /
                  slidesPerView -
                  0.5
              ) + 'px',
            marginRight: `${spaceBetween}px`,
          }"
        >
          <div class="item-content">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <!-- 左右按钮 -->
    <template v-if="navigation">
      <div class="swiper-btn-prev" @click="turn('prev')"></div>
      <div class="swiper-btn-next" @click="turn('next')"></div>
    </template>
    <!-- 导航按钮 -->
    <template v-if="pagination">
      <ul class="nav-list">
        <li
          v-for="(item, navIndex) in navCount"
          :key="'nav-' + item"
          :class="[index === navIndex && 'active']"
          @click="turnTopage(navIndex)"
        ></li>
      </ul>
    </template>
  </section>
</template>

<script>
import { vpx } from "@/utils";
export default {
  name: "LiSwiper",
  props: {
    duration: {
      //自动轮播切换时延
      type: Number,
      default: 3000,
    },
    autoplay: {
      // 是否开启自动播放
      type: Boolean,
      default: false,
    },
    list: {
      // 轮播数组
      type: Array,
      default: () => [],
      required: true,
    },
    slidesPerView: {
      // 一屏展示个数
      type: Number,
      default: 1,
    },
    pagination: {
      // 是否展示导航
      type: Boolean,
      default: false,
    },
    navigation: {
      // 是否展示左右按钮
      type: Boolean,
      default: false,
    },
    spaceBetween: {
      // 滑块间间隔距离
      type: [Number, String],
      default: 0,
      validator: function (value) {
        return value >= 0;
      },
    },
  },
  data() {
    return {
      index: 0, // 当前滑块的索引值
      status: 0, // 状态值，是否跟随鼠标移动
      oldX: 0, // 起点坐标
      newX: 0, // 新坐标
      navCount: 1, // 导航栏个数
      swiperWidth: 0, //容器默认宽度
    };
  },
  mounted() {
    this.swiper = this.$refs["swiper-container"]; // 滑动容器
    this.swiperWidth = this.swiper.offsetWidth;
    this.itemArr = this.$refs["swiper-item"]; // 滑块集合
    this.$nextTick(() => {
      this.navCount =
        this.itemArr.length - (this.slidesPerView - 1) <= 0
          ? 1
          : this.itemArr.length - (this.slidesPerView - 1);
      this.itemWidth = Math.ceil(
        this.itemArr[0].offsetWidth + this.spaceBetween
      ); // 单个滑块的宽度
      this.left = 0 - this.itemWidth * this.index; // 容器的初始left值
      this.swiper.style.left = this.left + "px"; // 设置容器的初始位置
      this.autoplay && this.autoPlay();
    });
  },
  methods: {
    vpx(val) {
      console.log("val", val);
      return val ? vpx(val) : 0;
    },
    // 开始触摸/鼠标按下
    touchstart(e) {
      this.status = 1;
      this.oldX = this.startX = e.targetTouches[0].pageX;
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
    },
    // 手指触摸/鼠标 滑动
    touchmove(e) {
      if (this.status !== 1) return;
      this.newX = e.changedTouches[0].pageX;
      if (this.newX < this.oldX) {
        const width = this.oldX - this.newX;
        this.left -=
          this.index === this.list.length - this.slidesPerView
            ? width / 3
            : width;
      } else {
        const width = this.newX - this.oldX;
        this.left += this.index === 0 ? width / 3 : width;
      }
      this.oldX = this.newX;
      // 禁止边缘滑动
      // if (this.left > 0 || this.left < (this.navCount - 1) * -this.itemWidth)
      //   return;
      this.swiper.style.left = this.left + "px";
    },
    // 手指触摸结束/鼠标抬起
    touchend(e) {
      this.status = 0;
      const pageX = e.changedTouches[0].pageX;
      if (Math.abs(this.startX - pageX) > 50) {
        if (pageX < this.startX) {
          this.index++;
        } else {
          this.index--;
        }
        if (this.index < 0) {
          this.index = 0;
        } else if (this.index > this.navCount - 1) {
          this.index = this.navCount - 1;
        }
      }
      this.move();
      this.autoplay && this.autoPlay();
    },
    // 左右按钮切换
    turn(type) {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.autoplay && this.autoPlay();
      if (type === "next") {
        if (this.index >= this.navCount - 1) return;
        this.index++;
      } else if (type === "prev") {
        if (this.index <= 0) return;
        this.index--;
      }
      this.move();
    },
    // 跳转到指定位置
    turnTopage(index) {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.index = index;
      this.move();
      this.autoplay && this.autoPlay();
    },
    // 滑动
    move() {
      this.swiper.className += " move";
      this.swiper.addEventListener("transitionend", () => {
        this.swiper.className = this.swiper.className.replace(/\s+move/, "");
      });
      this.left = 0 - this.itemWidth * this.index;
      this.swiper.style.left = this.left + "px";
    },
    // 自动切换
    autoPlay() {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.swiperAutoTimer = setInterval(() => {
        this.index++;
        if (this.index > this.navCount - 1) {
          this.index = 0;
        }
        this.move();
      }, this.duration);
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper-main {
  position: relative;
  width: 100%;
  height: vw(200);
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  .swiper {
    position: relative;
    width: 100%;
    margin: auto;
    overflow-x: hidden;
    .swiper-container {
      position: relative;
      display: flex;
      left: 0px;
      .swiper-item {
        flex-shrink: 0;
        width: vw(100);
        height: vw(200);
        background: #eee;
        border: 1px solid #ccc;
        overflow-y: auto;
        .item-content {
          height: vw(400);
        }
      }
      &.move {
        transition: all 0.2s ease-in-out;
      }
    }
  }
  .swiper-btn-prev {
    position: absolute;
    cursor: pointer;
    left: vw(10);
    top: calc(50% - #{vw(10)});
    transform: translateY(-50%);
    width: 0px;
    height: 0px;
    border: vw(12) solid #000;
    border-left-color: transparent;
    border-top-color: transparent;
    transform: rotate(135deg);
  }
  .swiper-btn-next {
    position: absolute;
    cursor: pointer;
    right: vw(10);
    top: calc(50% - #{vw(10)});
    transform: translateY(-50%);
    width: 0px;
    height: 0px;
    border: vw(12) solid #000;
    border-right-color: transparent;
    border-top-color: transparent;
    transform: rotate(-135deg);
  }
  .nav-list {
    position: absolute;
    left: 50%;
    bottom: vw(10);
    display: flex;
    transform: translateX(-50%);
    li {
      cursor: pointer;
      width: vw(20);
      height: vw(20);
      background-color: rgb(210, 210, 210);
      margin: 0 vw(5);
      border-radius: vw(10);
      &.active {
        background-color: #f60;
      }
    }
    &.move {
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
