<template>
  <div class="no-cards alone">
    <img src="../images/nocard.png" alt="" class="no-card-img">
    <div class="message">你还没有卖座卡哦～</div>
    <div class="to-binding-card">激活新卡</div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  beforeRouteEnter (to, from, next) {
    // 用没有登录
    if (localStorage.getItem('userName')) {
      next();
    } else {
      next({
        path: 'login',
        // 实现从哪个页面拦截到登陆页面后，登录成功回跳到那个页面，则需要记录那个页面
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
.no-cards.alone {
  width:100%;
  padding-top: px2rem(180);
  .no-card-img {
    display: block;
    margin: 0 auto;
    width: px2rem(95);
    height: px2rem(95);
  }
  .message {
    margin: px2rem(11) 0 px2rem(20);
    font-size: px2rem(14);
    width: 100%;
    text-align: center;
    color: #bdc0c5;
  }
  .to-binding-card {
    border: px2rem(1) solid #ff5f16;
    color: #ff5f16;
    border-radius: px2rem(3);
    width: px2rem(150);
    height: px2rem(33);
    line-height: px2rem(33);
    text-align: center;
    font-size: px2rem(14);
    margin: 0 auto;
  }
}

</style>
