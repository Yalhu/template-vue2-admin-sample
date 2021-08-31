<template>
  <div class="layout">
    <el-container>
      <!-- <el-header v-if="$store.state.Independent">
        <header />
      </el-header>
      <el-container style="height: calc(100vh - 60px)"> -->
      <el-container>
        <el-aside width="200px">
          <sidebar/>
        </el-aside>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view :key="routeKey"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import Header from './Header'
import Sidebar from './Sidebar'
export default {
  name: 'Layout',
  props: {},
  components: {
    // Header,
    Sidebar
  },
  // mixinx: [],
  data() {
    return {}
  },
  computed: {
    routeKey() {
      return this.$route.path
    }
  },
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
// ::v-deep .el-header {
//   box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
// }

// ::v-deep .el-aside {
//   background-color: #D3DCE6;
//   color: #333;
// }

.layout {
  height: 100%;
  .el-container {
    // margin-bottom: 40px;
    flex: 1;
    height: 100%; // 滚动
    overflow-y: auto;
  }
}
</style>
