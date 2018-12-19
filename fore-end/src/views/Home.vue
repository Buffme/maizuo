<template>
  <div class="home">
    <transition
      appear
      mode="out-in"
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
      >
      <router-view></router-view>
    </transition>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';

export default {
  name: 'Home',

  components: {
    NavBar
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
