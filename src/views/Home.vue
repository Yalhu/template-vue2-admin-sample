<template>
  <div class="home">
    <h1>欢迎访问应用</h1>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  }
}
</script>
<style scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1b2d69 url('../assets/bg.png') no-repeat;
  background-size: cover;
}
h1{
  margin: 0;
  padding: 20vh 0;
  color: #fff;
  text-align: center;
}
</style>
