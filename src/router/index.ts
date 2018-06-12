import Vue from 'vue'
import Router from 'vue-router'
import store from '~/store'
import storeInit from '~/core/bootstrap/store.init'
// import Login from '~/pages/login.vue'
// import Index from '~/pages/index.vue'
const Login = () => Promise.resolve(require('~/pages/login.vue'))
const Index = () => Promise.resolve(require('~/pages/index.vue'))

Vue.use(Router)

// 生成路由配置
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      store.dispatch('clearUserLoginData')
      next()
    }
  }, {
    path: '/home',
    name: 'index',
    component: Index
  }
]

// 生成路由实体
const router = new Router({
  mode: 'history',
  routes
})


/**
 * 路由守卫
 * 布局检测
 */
// router.beforeResolve(({ matched, path }, from, next) => {
//   // workspaceTab检测
//   // tabsCheck(path, from.path)
//   next()
//   // setTimeout(() => tabsCheck(path, from.path), 100)
// })

router.beforeEach(async ({ matched, path }, from, next) => {
  if (!store.state.ready) {
    await storeInit({
      store,
      router
    })
  }

  if (store.state.tokenExpire && path !== "/") {
    // 重置用户过期状态
    store.commit('updateTokenExpire', false)
    return next("/")
  }

  next()
})
/**
 * 路由后置守卫
 * 布局检测
 */
router.afterEach((to, from) => {
  //  布局检测
  layoutCheck(to.matched)
  // Tab更新检测
  // tabsCheck(to.path, from.path)
})

// 布局监测
function layoutCheck(matched) {
  if (matched && matched.length > 0) {
    let [{ components }] = matched
    let component = components.default
    let targetLayout = component['$layout'] || 'default'
    if (store.state.layout !== targetLayout) {
      store.commit('updateLayout', targetLayout )
    }

  }
}

/**
 * Tabs更新检测
 * @param toPath
 * @param fromPath
 */
function tabsCheck(toPath, fromPath) {
  if (!toPath || toPath == '/') {
    return
  }

  let toItem: any = store.state.userResource.find((x: any) => x.url === toPath);
  let fromItem: any = store.state.userResource.find((x: any) => x.url === fromPath);

  if (!toItem) {
    return
  }

  if (!store.state.workspace.currentTabs || !fromItem) {
    store.dispatch('workspace/updateTabs', toItem.parentId)
  }

  if (toItem.url !== store.state.workspace.currentTab) {
    // 更新当前选中tab
    store.commit('workspace/updateCurrentTab', toItem.url)
  }
}

export default router
