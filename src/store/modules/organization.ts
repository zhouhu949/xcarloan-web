import { SysOrgService } from "~/services/manage-service/sys-org.service";

export default {
  namespaced: true,
  state: {
    // 当前用户所对应的机构数据
    orgData: []
  },
  mutations: {
    /**
     * 更新机构数据
     * @param state 
     * @param orgData 
     */
    updateOrgData(state, orgData) {
      state.orgData = orgData
    }
  },
  actions: {
    /**
     * 获取机构数据
     * @param param0 
     */
    getOrgData({ commit }) {
      let sysOrgService = new SysOrgService()
      sysOrgService.findAllOrganizationByAuth().subscribe(
        data => commit("updateOrgData", data),
        err => console.error(err.msg)
      )
    }
  }
}
