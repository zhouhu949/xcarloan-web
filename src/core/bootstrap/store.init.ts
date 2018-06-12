import Vue from 'vue'

const creatDataDictService = () => import('~/services/manage-service/data-dict.service')
const createLoginService = () => import('~/services/manage-service/login.service')

export default async function ({ store, router }) {
  let { DataDictService } = await creatDataDictService()
  let { LoginService } = await createLoginService()

  let dataDictService = new DataDictService()
  let loginService = new LoginService()

  // 启动数据初始化
  let flag = await Promise.all([
    updateDictData(),
    updateUserData()
  ]).then(() => {
    return true
  }).catch(ex => {
    // 基础数据初始化失败
    return false
  })

  // 初始化业务数据
  if (flag) {
    await updateBusinessData()
  }

  store.commit('ready', true)

  /**
   * 检测用户数据
   */
  async function updateUserData() {
    return new Promise((reslove, reject) => {
      // 登录页面不更新用户数据
      if (!store.state.userToken && window.location.pathname == "/") {
        reslove()
        return
      }

      // 不存在token不更新用户数据
      if (!store.state.userToken && window.location.pathname != "/") {
        store.commit("updateTokenExpire", true)
        reject()
        return
      }

      // 更新用户数据
      loginService.getUserByToken().subscribe((data) => {
        // 更新用户控件资源
        store.dispatch('updateUserLoginData', data)
        reslove()
      }, () => {
        // 用户数据获取异常
        store.commit("updateTokenExpire", true)
        reject()
      })
    })
  }

  /**
   * 检查数据字典
   * @param reslove
   */
  function updateDictData() {
    return new Promise((reslove, reject) => {
      dataDictService.getAll().subscribe((data) => {
        store.commit('updateDictData', data)
        reslove()
      }, () => {
        reject()
      })
    })
  }

  /**
   * 全局业务数据
   */
  function updateBusinessData() {
    return new Promise(async (reslove, reject) => {
      if (!store.state.userData || !store.state.userToken) {
        reslove()
        return
      }
      // 全局业务数据 - 与用户无关

      reslove()
    })
  }
}
