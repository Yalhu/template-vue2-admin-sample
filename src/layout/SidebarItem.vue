<template>
  <div class="sidebar-item">
    <template v-for="subNav in visibleNav">
      <el-submenu v-if="Array.isArray(subNav.children) && subNav.children.length > 1" :index="subNav.path" :key="subNav.path">
        <!-- <template  v-if="subNav.children.length > 1"> -->
          <template slot="title">
            <i :class="`el-icon-${subNav.meta.icon}`"></i>
            <span>{{ subNav.meta.title || subNav.name }}</span>
          </template>
          <sidebar-item :navs="subNav.children"></sidebar-item>
        <!-- </template>
        <template v-else>
          <i :class="`el-icon-${subNav.meta.icon}`"></i>
          <router-link :to="subNav.path">{{ subNav.meta.title || subNav.name }}</router-link>
        </template> -->
      </el-submenu>
      <el-menu-item v-else :index="subNav.children ? subNav.children[0].path : subNav.path" :key="subNav.path">
        <i v-if="subNav.meta.icon" :class="`el-icon-${subNav.meta.icon}`"></i>
        <router-link :to="subNav.path">{{ subNav.meta.title || subNav.name }}</router-link>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    navs: {
      type: Array,
      default: () => [{ path: '', hidden: true, meta: { title: '', icon: '' }}]
    }
  },
  data() {
    return {}
  },
  computed: {
    visibleNav() {
      function _hide(arr) {
        return arr.filter(v => {
          if(Array.isArray(v.children)) {
            v.children = _hide(v.children)
          }
          return !v.hidden
        })
      }
      let _nav = _hide(this.navs)
      if(_nav.children && _nav.children.length < 2) _nav.children = null
      console.log('_nav', _nav)
      return _nav
    },
  }
}
</script>

