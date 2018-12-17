<template>
  <div class="home">
    <router-view></router-view>
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
