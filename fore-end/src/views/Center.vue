<template>
  <keep-alive>
    <div class="center-view">
      <!-- 显示登录 -->
      <div class="avatar" @click="toRegister">
        <img src="../images/unregistered.png" class="avator-icon">
        <div class="nick-name" :class="{'hide': showPhone}">立即登录</div>
        <div class="phone" :class="{'show': showPhone}">{{phone}}</div>
      </div>
      <!-- 显示登录 -->

      <!-- 订单 -->
      <ul class="my-order-tab">
        <li>
          <img src="../images/order1.png" alt="">
          <span class="mint-badge is-primary is-size-small" style="display: none">0</span>
          <div class="common-p">电影订单</div>
        </li>
        <li>
          <img src="../images/order2.png" alt="">
          <div class="common-p">拼团订单</div>
        </li>
      </ul>
      <!-- 订单 -->

      <!-- 卖座卡 -->
      <div class="margin-set my-card" @click="turnToPage('card')">
        <img src="../images/1.png" alt="">
        <span class="label">卖座卡</span>
        <img src="../images/you.png" alt="" class="arrow">
      </div>
      <!-- 卖座卡 -->

      <!-- 余额 -->
      <div class="margin-set my-balance" @click="turnToPage('balance')">
        <img src="../images/2.png" alt="">
        <span class="label">余额</span>
        <span class="value">
          <span class="price-decimal price-fmt">
            <i>￥</i>
            <span class="interge">0</span>
            <span style="display: none;">.</span>
            <span class="decimal"></span>
          </span>
        </span>
        <img src="../images/you.png" alt="" class="arrow">
      </div>
      <!-- 余额 -->

      <!-- 设置 -->
      <div class="margin-set system-set" @click="turnToPage('settings')">
        <img src="../images/1.png" alt="">
        <span class="label">设置</span>
        <img src="../images/you.png" alt="" class="arrow">
      </div>
      <!-- 设置 -->
    </div>
  </keep-alive>
</template>

<script>
export default {
  name: 'Center',

  data () {
    return {
      phone: '',

      showPhone: false

    }
  },

  methods: {
    getPhone () {
      if (localStorage.getItem('userName')) {
        this.showPhone = true;
        this.phone = localStorage.getItem('userName');
        console.log(this.phone);
      } else {
        this.showPhone = false;
      };
    },
    /**
     * 跳转到不同的user下面的页面
     * @param {String} page 不同页面
     */
    turnToPage (page) {
      if (page === 'card') {
        this.$router.push('/user/card');
        this.$store.commit({
          type: 'getPage',
          pageName: '卖座卡'
        })
      } else if (page === 'balance') {
        this.$router.push('/user/balance');
        this.$store.commit({
          type: 'getPage',
          pageName: '余额'
        })
      } else {
        this.$router.push('/user/settings');
        this.$store.commit({
          type: 'getPage',
          pageName: '设置'
        })
      }
    },

    toRegister () {
      if (!localStorage.getItem('userName')) {
        this.$router.push('/login');
      }
    }
  },

  created () {
    this.getPhone();
  }
};
</script>

<style lang="scss">
@import "@/styles/common/px2rem.scss";

.center-view {
  flex: 1;
  font-size: px2rem(15);
  background: #f4f4f4;
  .avatar {
    text-align: center;
    margin-top: px2rem(-44);
    height: px2rem(200);
    padding-left: px2rem(22);
    padding-top: px2rem(64);
    background: url(~@/images/bg.png);
    background-size: cover;
    display: flex;
    align-items: center;
    color: #fff;
    .avator-icon {
      width: px2rem(63);
      height: px2rem(63);
      border-radius: px2rem(35);
      margin-right: px2rem(20);
      border: px2rem(2) solid #fff;
    }
    .nick-name {
      font-size: px2rem(16);
      &.hide {
        display: none;
      }
    }
    .phone {
      font-size: px2rem(16);
      display: none;
      &.show {
        display: block;
      }
    }
  }
  .my-order-tab {
    width: 100%;
    margin: 0 auto;
    display: flex;
    text-align: center;
    font-size: px2rem(13);
    padding: 0;
    height: px2rem(79);
    background: #fff;
    margin-bottom: px2rem(10);
    align-items: center;
    li {
      position: relative;
      flex: 1;
      img {
        display:inline-block;
        margin-bottom: px2rem(6);
        width: px2rem(26);
        height: px2rem(26);
      }
      .common-p {
        color: #797d82;
      }
    }
    .mint-badge {
      padding: 0;
      font-size: px2rem(10);
      height: px2rem(16);
      line-height: px2rem(18);
      min-width: px2rem(16);
      background: #ff5f16;
      position: absolute;
      left: 52%;
      text-align: center;
      top: 0;
    }
  }
  .margin-set {
    background: #fff;
    padding: 0 px2rem(15);
    height: px2rem(49);
    display: flex;
    align-items: center;
    img {
      width: px2rem(20);
      height: px2rem(20);
    }
    .label {
      margin-left: px2rem(15);
      color: #191a1b;
      flex: 1;
    }
    .arrow {
      text-align: right;
      width: px2rem(6);
      height: px2rem(10);
    }
    .value {
      text-align: right;
      color: #797d82;
      padding-right: px2rem(14);
      .interge {
        font-size: px2rem(15);
      }
      .decimal {
        font-size: px2rem(10);
      }
    }
  }
}
</style>
