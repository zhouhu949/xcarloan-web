import { StorageService } from '~/utils/storage.service'

export default {
  /**
  * 更新用户资源信息
  * @param state
  * @param rescource
  */
  updateUserMenuResource(state, rescource) {
    state.menuResource = rescource
  },
  /**
  * 更新用户资源信息
  * @param state
  * @param rescource
  */
  updateUserControlResource(state, rescource) {
    state.controlResource = rescource
  },
  /**
   * 更新布局
   * @param state 
   * @param layout 
   */
  updateLayout(state, layout) {
    state.layout = layout || 'default'
  },
  /**
   * 更新数据字典
   * @param state/
   * @param data 
   */
  updateDictData(state, data) {
    state.dictData = data
  },
  /**
   * 更新用户token
   * @param state 
   * @param token 
   */
  updateUserToken(state, token) {
    state.userToken = token
    StorageService.setItem("userToken", token)
  },
  /**
   * 更新用户数据
   * @param state 
   * @param user 
   */
  updateUserData(state, user) {
    state.userData = user
  },
  /**
   * 打开页面
   * @param state 
   * @param page 
   */
  openPage(state, target) {
    let page, resourceUrl, params
    if (typeof target === "string") {
      resourceUrl = target
    } else {
      resourceUrl = target.resourceUrl
      params = target.params
    }

    // 获取是否是显示中的页面
    page = state.pageList.find(x => x.resourceUrl === resourceUrl)
    if (page) {
      // 当前页面已经打开
      page.params = params
    } else {
      // 查找未打开的页面信息
      let findResult = state.menuResource.find(x => x.resourceUrl === resourceUrl)
      // 当前页面未打开
      page = Object.assign({}, findResult)
      // 添加新页面
      state.pageList.push(Object.assign({
        params
      }, page))
    }

    // 切换显示页面
    state.currentPage = page.resourceUrl
  },
  /**
   * 关闭页面
   * @param state 
   * @param path 
   */
  closePage(state, path) {
    let page = state.pageList.find(x => x.resourceUrl === path)

    if (!page) {
      return
    }

    let index = state.pageList.indexOf(page)
    state.currentPage = state.pageList[index - 1].resourceUrl

    if (index > 0) {
      state.pageList.splice(index, 1)
    }
  },
  /**
   * 关闭所有
   * @param state 
   */
  closeAllPage(state) {
    state.pageList = [{
      resourceUrl: 'home',
      resourceName: '主页'
    }]
    state.currentPage = 'home'
  },
  /**
   * 更新主题
   * @param state 
   * @param theme 
   */
  updateTheme(state, theme) {
    state.theme = theme
  },
  /**
   * 修改token过期标识
   * @param state
   * @param data
   */
  updateTokenExpire(state, data) {
    state.tokenExpire = data
  },
  /**
   * 更新初始化状态
   * @param state
   */
  ready(state) {
    state.ready = true
  },
  /**
   * 更新公司数据
   * @param state 
   * @param data 
   */
  updateCompanyList(state, data) {
    state.companyList = data
  }
}


