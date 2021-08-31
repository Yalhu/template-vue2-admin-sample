import Layout from '@/layout/Layout'

export default {
  path: '/demo2',
  component: Layout,
  name: 'Demo',
  meta: { title: '嵌套路由', icon: 'ice-tea' },
  redirect: '/demo/list',
  children: [
    {
      path: '/demo2/list',
      name: 'DemoList',
      // 子路由可以不设置icon
      component: () => import(/* webpackChunkName: "Demo" */ '@view/demo/demoList'), meta: { title: '示例页面2', icon: '' }
    },
    {
      path: '/demo2/list2',
      name: 'DemoList',
      // 子路由可以不设置icon
      component: () => import(/* webpackChunkName: "Demo" */ '@view/demo/demoList'), meta: { title: '示例页面3', icon: '' }
    }
  ]
}
