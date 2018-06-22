import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'international', noCache: true }
    }]
  },

];

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表，通过meta标签来标示改页面能访问的权限有哪些
export const asyncRouterMap = [
  {
    path: '/permission',
    hidden: true,
    component: Layout,
    redirect: '/permission/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/lines1000',
    name: 'lines1000',
    component: Layout,
    redirect: 'noredirect',
    meta: {
      icon: 'check',
      title: 'lines1000.root',
      roles: ['admin']
    }, // you can set roles in root nav
    children: [
      {
        path: '/lines1000/repository',
        name: 'repository',
        redirect: '/lines1000/repository/list',
        component: _import('lines1000/index'),
        meta: {
          icon: 'code',
          title: 'lines1000.repository.root',
          roles: ['admin']
        }, // you can set roles in root nav
        children: [
          {
            path: 'list',
            name: 'repository-list',
            component: _import('lines1000/repository/list'),
            onlyShow: true, // 设置只显示此菜单项，左侧菜单icon和title优先显示上一级的。修改：Sidebar/SidebarItem.vue
            meta: {
              title: 'lines1000.repository.list',
              active: '/lines1000/repository/list', // 设置左侧菜单active效果，要与$route.path一致。修改：Sidebar/index.vue
              roles: ['admin'] // or you can only set roles in sub nav
            },
          },
          {
            path: 'add',
            name: 'repository-add',
            hidden: true,
            component: _import('lines1000/repository/view'),
            meta: {
              title: 'lines1000.repository.add',
              active: '/lines1000/repository/list', // 设置左侧菜单active效果，要与$route.path一致。修改：Sidebar/index.vue
              roles: ['admin'] // or you can only set roles in sub nav
            }
          },
          {
            path: 'edit/:id',
            name: 'repository-edit',
            hidden: true,
            component: _import('lines1000/repository/view'),
            meta: {
              isEdit: true, // set edit, so we can judge it on 'view' component
              title: 'lines1000.repository.edit',
              active: '/lines1000/repository/list', // 设置左侧菜单active效果，要与$route.path一致。修改：Sidebar/index.vue
              roles: ['admin'] // or you can only set roles in sub nav
            }
          }
        ]
      },
      {
        path: '/lines1000/person',
        name: 'person',
        redirect: '/lines1000/person/list',
        component: _import('lines1000/index'),
        meta: {
          title: 'lines1000.person.root',
          icon: 'peoples',
          roles: ['admin']
        },
        children: [
          {
            path: 'list',
            name: 'person-list',
            component: _import('lines1000/person/list'),
            onlyShow: true, // 设置只显示此菜单项
            meta: {
              title: 'lines1000.person.list',
              icon: 'peoples',
              roles: ['admin']
            },
          },
          {
            path: 'add',
            name: 'person-add',
            hidden: true,
            component: _import('lines1000/person/view'),
            meta: {
              title: 'lines1000.person.add',
              active: '/lines1000/person/list',
              roles: ['admin']
            }
          },
          {
            path: 'edit/:id',
            name: 'person-edit',
            hidden: true,
            component: _import('lines1000/person/view'),
            meta: {
              isEdit: true,
              title: 'lines1000.person.edit',
              active: '/lines1000/person/list',
              roles: ['admin']
            }
          }
        ]
      },
      {
        path: '/lines1000/staturls',
        name: 'staturls',
        redirect: '/lines1000/staturls/list',
        component: _import('lines1000/index'),
        meta: {
          title: 'lines1000.staturls.root',
          icon: 'component',
          roles: ['admin']
        },
        children: [
          {
            path: 'list',
            name: 'staturls-list',
            component: _import('lines1000/staturls/list'),
            onlyShow: true,
            meta: {
              title: 'lines1000.staturls.list',
              icon: 'peoples',
              roles: ['admin']
            },
          },
          {
            path: 'edit/:id',
            name: 'staturls-edit',
            hidden: true,
            component: _import('lines1000/staturls/view'),
            meta: {
              isEdit: true,
              title: 'lines1000.staturls.edit',
              active: '/lines1000/staturls/list',
              roles: ['admin']
            }
          }
        ]
      },
      {
        path: '/lines1000/bugcalc',
        name: 'bugcalc',
        redirect: '/lines1000/bugcalc/list',
        component: _import('lines1000/index'),
        meta: {
          title: 'lines1000.bugcalc.root',
          icon: 'bug',
          roles: ['admin']
        },
        children: [
          {
            path: 'list',
            name: 'bugcalc-list',
            component: _import('lines1000/bugcalc/list'),
            onlyShow: true,
            meta: {
              title: 'lines1000.bugcalc.list',
              icon: 'peoples',
              roles: ['admin']
            },
          },
          {
            path: 'calc/:type',
            name: 'bugcalc-calc',
            hidden: true,
            component: _import('lines1000/bugcalc/view'),
            meta: {
              title: 'lines1000.bugcalc.calc',
              active: '/lines1000/bugcalc/list',
              roles: ['admin']
            }
          }
        ]
      },
    ]
  },

  {
    path: '/passport',
    name: 'passport',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      icon: 'peoples',
      title: 'passport.root',
      roles: ['admin', 'export']
    },
    children: [
      {
        path: 'exportActivateDevice',
        name: 'export-active-device',
        component: _import('passport/exportActivateDevice'),
        meta: {
          icon: 'table',
          title: 'passport.exportActivateDevice',
          roles: ['admin', 'export']
        },
      },
    ]
  },

  {
    path: '/mis',
    name: 'mis',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      icon: 'star',
      title: 'mis.root',
      roles: ['admin', 'statistics']
    },
    children: [
      {
        path: 'updateStatistics',
        name: 'update-statistics',
        component: _import('mis/updateStatistics'),
        meta: {
          icon: 'pie_chart',
          title: 'mis.updateStatistics',
          roles: ['admin', 'statistics']
        },
      },
    ]
  },

  {
    path: '/practices',
    name: 'practices',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: {
      icon: 'practices',
      title: 'practices.root',
      roles: ['admin']
    },
    children: [
      {
        path: 'base',
        name: 'base-practices',
        component: _import('practices/base'),
        meta: {
          icon: 'base',
          title: 'practices.base',
          roles: ['admin']
        },
      },
      {
        path: 'echart',
        name: 'echart-practices',
        component: _import('practices/echarts'),
        meta: {
          icon: 'chart',
          title: 'practices.echart',
          roles: ['admin']
        },
      },
      {
        path: 'vuecomponent',
        name: 'vuecomponent-practices',
        component: _import('practices/vueComponent'),
        meta: {
          icon: 'vuejs',
          title: 'practices.vueComponent',
          roles: ['admin']
        },
      },
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/error',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
];
