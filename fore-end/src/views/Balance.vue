<template>
  <div class="balance-list">
    <div class="balance-count">
      <div class="label">当前余额</div>
      <div class="balance-amount">￥0.00</div>
    </div>
    <div class="no-record-img">
      <img src="../images/nobalance.png" alt="">
      <div>暂无余额使用明细</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Balance',

  beforeRouteEnter (to, from, next) {
    // 用没有登录
    if (localStorage.getItem('userName')) {
      next();
    } else {
      next({
        path: 'login',
        // 实现从那个页面拦截到登陆页面后，登录成功回跳到原页面，则需要记录原页面
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.balance-list {
  flex: 1;
  margin-top: px2rem(44);
  width: 100%;
  .balance-count {
    height: px2rem(141);
    background-image: url(~@/images/bbg.png);
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: px2rem(40);
    color: #fff;
    .label {
      font-size: px2rem(13);
    }
    .balance-amount {
      font-size: px2rem(30);
      line-height: px2rem(45);
    }
  }
  .no-record-img {
    width: 100%;
    background-color: #fff;
    margin-top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: px2rem(95);
      height: px2rem(95);
    }
    div {
      font-size: px2rem(14);
      margin-top: px2rem(11);
      color: #bdc0c5;
    }
  }
}

</style>
