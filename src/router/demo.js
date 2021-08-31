import Layout from '@/layout/Layout'

export default {
  path: '/demo',
  component: Layout,
  name: 'Demo',
  meta: { title: '示例页面', icon: 'eleme' },
  redirect: '/demo/list',
  children: [
    {
      path: '/demo/list',
      name: 'DemoList',
      // 子路由可以不设置icon
      component: () => import(/* webpackChunkName: "Demo" */ '@view/demo/demoList'), meta: { title: '示例页面', icon: '' }
    }
  ]
}
