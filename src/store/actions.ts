import router from '~/router'

const creatCompanyService = () => import('~/services/manage-service/company.service')
// const createPrincipalService = () => import('~/services/business-service/principal.service')
// const createDepartmentService = () => import('~/services/business-service/department.service')
// const createOutsourceService = () => import('~/services/business-service/outsource.service')

export default {
  /**
   * 更新用户登录数据
   */
  updateUserLoginData({ state, commit, dispatch }, { token, user, menu, resource }) {
    // 更新用户token
    if (!!token) {
      commit('updateUserToken', token);
    }
    // 更新用户控件资源
    commit('updateUserMenuResource', menu);

    // 更新用户菜单资源
    commit('updateUserControlResource', resource);

    // 更新用户数据
    commit('updateUserData', {
      id: user.id,
      userType: user.userType,
      passwordTime: user.passwordTime,
      deptId: user.deptId,
      username: user.userUsername,
      realname: user.userRealname,
      password: user.userPassword,
      sex: user.userSex,
      Phone: user.userPhone,
      email: user.userEmail,
      status: user.userStatus,
      signature: user.userSignature,
      remark: user.userRemark,
      operator: user.operator,
      operateTime: user.operateTime
    });

    commit('updateTokenExpire', false)
  },
  /**
   * 清除登录数据
   */
  clearUserLoginData({ commit }) {
    // 重置用户token
    commit('updateUserToken', "");
    // 更新用户菜单资源
    commit('updateUserMenuResource', []);
    // 重置用户控件资源
    commit('updateUserControlResource', []);
    // 重置用户数据
    commit('updateUserData', {})
    // 重置token过期标识
    commit('updateTokenExpire', true);
    // 关闭页面
    commit('closeAllPage')
    // 清空数据
    localStorage.removeItem('vuex')
    localStorage.removeItem('userToken')
  },

  /**
   * 获取公司名称
   */
  async getCompanyList({ commit }) {
    let { CompanyService } = await creatCompanyService()
    let companyService = new CompanyService()
    // 获取公司名称
    companyService.getAllCompany().subscribe(data => {
      this.commit('updateCompanyList', data)
    });
  }
}
