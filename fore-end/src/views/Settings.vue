<template>
  <div class="setting-detail">
    <div class="item-box account">
      <div class="common">
        <span class="label">账号ID</span>
        <span class="text" style="color: rgb(121, 125, 130);">230055003</span>
      </div>
    </div>
    <div class="item-box">
      <div class="common">
        <span class="label">登录密码</span>
        <span class="set">
          <span class="text" style="color: rgb(121, 125, 130);">未设置</span>
          <img src="../images/you.png" alt="">
        </span>
      </div>
      <div class="common">
        <span class="label">安全密码</span>
        <span class="set">
          <span class="text" style="color: rgb(121, 125, 130);">未设置</span>
          <img src="../images/you.png" alt="">
        </span>
      </div>
    </div>
    <div class="item-box">
      <div class="common">
        <span class="label">软件版本</span>
        <img src="../images/you.png" alt="">
      </div>
      <div class="common feedback">
        <span class="label">意见反馈</span>
        <img src="../images/you.png" alt="">
      </div>
    </div>
    <div class="item-box">
      <div class="common">
        <span class="label">清除缓存</span>
        <span class="text">0.1 KB</span>
      </div>
    </div>
    <div class="logout-btn">退出登录</div>
  </div>
</template>

<script>

export default {
  name: 'Settings',

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

.setting-detail {
  flex: 1;
  margin-top: px2rem(44);
  width: 100%;
  background: #f4f4f4;
  font-size: px2rem(15);
  .item-box {
    background: #fff;
    margin-bottom: px2rem(10);
    .common {
      padding: 0 px2rem(14) 0 px2rem(15);
      height: px2rem(49);
      line-height: px2rem(49);
      background: #fff;
      color: #191a1b;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
          width: px2rem(7);
          height: px2rem(12);
      }
      .set {
        img {
          width: px2rem(7);
          height: px2rem(12);
          margin-left: px2rem(14);
          color: #bdc0c5;
        }
      }

    }
    .text {
      font-size: px2rem(13);
      color: #bdc0c5;
    }
  }
  .account {
    margin-top: px2rem(10);
  }
  .logout-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #ff5f16;
    height: px2rem(49);
    line-height: px2rem(49);
    background: #fff;
  }
}
</style>
