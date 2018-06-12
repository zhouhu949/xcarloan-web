import Vue from 'vue'

export default ({ store }): Object => ({
  /**
   * 资源认证
   */
  auth: {
    bind(el, binding, vnode) {
      // 获取权限编码
      let authCode = Number(binding.expression)
      // 验证权限码
      if (!authCode) {
        console.error('未传入权限')
        return
      }

      let hasAuth: boolean = (store.state.controlResource || []).includes(authCode)

      // 验证权限
      if (!hasAuth) {
        el.style.display = 'none'
      }

      // try {
      //   authCode = String.padStart(parseInt(roleCode).toString(16), 6, '0').toUpperCase()
      // } catch (ex) {
      //   console.log('权限码格式错误')
      //   return
      // }

      // // 初始化权限列表
      // if (!roleData) {
      //   let userRoleData = storage.getItem('user_role_data', storage.type.session)
      //   if (userRoleData) {
      //     roleData = userRoleData
      //   } else {
      //     // TODO:待完善日志系统
      //     console.error('用户权限异常')
      //     return
      //   }
      // }

      // // 验证权限
      // if (!roleData.includes(roleCode)) {
      //   el.style.display = 'none'
      // }
    }
  }
})
