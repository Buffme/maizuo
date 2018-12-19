<template>
  <header class="mint-header" style="display: flex;">
    <div class="left">
        <i class="iconfont icon-zhuye"></i>
      </div>
        <h1 class="title">{{page}}</h1>
        <div class="right"><div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TopNav',

  computed: {
    ...mapState([
      'page'
    ])
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';
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
  .left {
    min-width: 15%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: px2rem(15);
    i {
      display: block;
      font-size: px2rem(23);
      color: #191a1b;
    }
  }
  .title {
    text-align: center;
    font-size: px2rem(17);
    color: #191a1b;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .right {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: px2rem(15);
  }
}
</style>
