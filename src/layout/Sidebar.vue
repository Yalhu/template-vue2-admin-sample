<template>
  <div class="slidebar" style="height: 100%;">
    <el-menu class="el-menu-demo" :router="true"
      :default-active="activeIndex"
      background-color="#090F32"
      text-color="rgb(156, 159, 173)"
      active-text-color="#fff"
      style="height: 100%"
    >
      <sidebar-item :navs="this.$router.options.routes" />
    </el-menu>
  </div>
</template>
<script>
import SidebarItem from  './SidebarItem'
export default {
  name: 'Sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  components: { SidebarItem },
  computed: {
    activeIndex() {
      return this.$route.path
    }
  },
  methods: {
  }
}
</script>
