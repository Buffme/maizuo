<template>
  <div class="films-list">
    <!-- header -->
    <mt-header title="电影" :class="topBarFixed === true ? 'isFixed' :''">
      <div slot="left">
        <span>深圳</span>
        <i class="iconfont icon-xiala-"></i>
      </div>
      <div icon="more" slot="right"></div>
    </mt-header>
    <!-- header -->

    <!-- 轮播图 -->
    <mt-swipe :auto="1000">
      <mt-swipe-item>
        <img src="../images/banner1.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner2.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner3.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner4.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner5.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner6.jpg" alt="">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="../images/banner7.jpg" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 轮播图 -->

    <!-- 定位城市 -->
    <div class="city-fixed">
      <span>深圳</span>
      <i class="iconfont icon-xiala-"></i>
    </div>
    <!-- /定位城市 -->

    <!-- tab-bar -->
    <div class="tab-bar-wrapper">
      <ul class="tab-bar">
        <li :class="{ 'z-act': $route.path === '/films/nowPlaying' }" @click="switchList('now')">
          <span>正在热映</span>
        </li>
        <li :class="{ 'z-act': $route.path === '/films/comingSoon' }" @click="switchList('soon')">
          <span>即将上映</span>
        </li>
      </ul>
    </div>
    <!-- /tab-bar -->

    <router-view></router-view>

  </div>
</template>

<script>
import { Swipe, SwipeItem, Header } from 'mint-ui';

export default {
  name: 'films',

  data () {
    return {
      topBarFixed: false
    }
  },

  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
    'mt-header': Header
  },

  mounted () {
    document.querySelector('.films-list').addEventListener('scroll', this.handleScroll, true)
  },

  beforeDestroyed () {
    document.querySelector('.films-list').removeEventListener('scroll', this.handleScroll, false)
  },

  methods: {
    /**
     * 监听滚轮事件,决定header显示与否
     */
    handleScroll () {
      var scrollTop = document.querySelector('.films-list').scrollTop;
      var swipeTop = document.querySelector('.mint-swipe').offsetHeight;
      // console.log(scrollTop);
      if (scrollTop > swipeTop / 2) {
        document.querySelector('.city-fixed').style.display = 'none';
        document.querySelector('.mint-header').style.display = 'flex'
      } else if (scrollTop < swipeTop / 2) {
        document.querySelector('.city-fixed').style.display = 'block';
        document.querySelector('.mint-header').style.display = 'none'
      };
    },

    // top () {
    //   document.querySelector('.films-list').scrollTop = 0
    // },
    /**
     * 切换不同类型影片列表
     * @param {String} type 不同类型影片列表
     */
    switchList (type) {
      if (type === 'now') {
        this.$router.push('/films/nowPlaying')
      } else {
        this.$router.push('/films/comingSoon')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.films-list {
  flex: 1;
  overflow-y: auto;
  /* header样式 */
  .mint-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(44);
    border-bottom: px2rem(1) solid #ededed;
    line-height: px2rem(44);
    overflow: hidden;
    margin: 0;
    padding: 0;
    z-index: 3000;
    background-color: #fff;
    display: none;
    color: #2c3e50;
    .mint-header-button{
      font-size: px2rem(13);
      padding-left: px2rem(15);
    }
    .mint-header-title{
      font-size: px2rem(14);
    }
  }

  /* 轮播图样式 */
  .mint-swipe {
    height: px2rem(210);
    .mint-swipe-items-wrap {
      img{
        width:100%;
      }
    }
    .mint-swipe-indicators{
      bottom: px2rem(10);
      left:auto!important;
      right:px2rem(12);
      transform: translateX(0);
      // left: calc(100% - 4rem);
      .mint-swipe-indicator{
        opacity: 1;
        width: px2rem(5);
        height: px2rem(5);
        border-radius:100%;
        margin: 0 px2rem(4);
        background: transparent;
        border: px2rem(1) solid #fff;
        &.is-active {
          background: #fff;
        }
      }
    }
  }

  /* 城市定位的样式 */
  .city-fixed {
    display: block;
    position: absolute;
    top: px2rem(18);
    left: px2rem(8);
    z-index: 999;
    height: px2rem(30);
    line-height: px2rem(30);
    font-size: px2rem(14);
    color: #fff;
    border-radius: px2rem(15);
    text-align: center;
    padding: 0 px2rem(5);
    background: rgba(0, 0, 0, 0.2);
  }

  /* tab-bar的样式 */
  .tab-bar-wrapper {
    position: sticky;
    top: px2rem(44);
    height: px2rem(50);
    border-bottom: px2rem(1) solid #ededed;
    background: #fff;
    .tab-bar {
      display: flex;
      height: px2rem(50);
      align-items: center;
      li {
        flex: 1;
        font-size: px2rem(14);
        display: flex;
        height:100%;
        justify-content: center;
        span {
          padding: 0 px2rem(10);
          height:100%;
          line-height: px2rem(50);
        }
        &.z-act {
          color: #ff5f16;
          span {
            border-bottom: px2rem(1) solid #ff5f16;
          }
        }
      }
    }
  }
}
</style>
