<template>
  <div class="user-view">
    <TopNav></TopNav>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNav from '../components/TopNav';
export default {
  name: 'User',

  components: {
    TopNav
  }

}
</script>

<style lang="scss">
@import '@/styles/common/px2rem.scss';

.user-view {
  display: flex;
  height: 100%;
}
</style>
