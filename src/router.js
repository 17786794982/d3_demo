import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    },
    {
      path: '/force',
      name: 'force',
      component: () => import(/* webpackChunkName: 'force' */ '@/views/force'),
      children: [
        {
          path: '/force_guidance_graph',
          name: 'force_guidance_graph',
          component: () => import(/* webpackChunkName: 'force' */ '@/views/force/force_guidance_graph/force_guidance_graph.vue'),
        },
        {
          path: 'force2',
          name: 'force2',
          component: () => import(/* webpackChunkName: 'force' */ '@/views/force/force2'),
        },
      ]
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import(/* webpackChunkName: 'tree' */ '@/views/tree'),
      children: [
        {
          path: 'd3Path',
          name: 'd3-path',
          component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/d3_path/d3_path.vue')
        },
        {
          path: 'd3-two-tree',
          name: 'd3_two_tree',
          component: () => import(/* webpackChunkName: 'tree' */ '@/views/tree/d3_two_tree/d3_two_tree.vue'),
        },
        {
          path: 'downTree',
          name: 'downTree',
          component: () => import(/* webpackChunkName: 'tree' */ '@/views/tree/downTree.vue'),
        }
      ]
    },
  ]
})
