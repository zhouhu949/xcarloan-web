
const CreateSysOrgService = import("~/services/manage-service/sys-org.service")

export default {
  namespaced: true,
  state: {
    // 当前用户所对应的机构数据
    orgData: []
  },
  getters: {
    /**
     * 组织级联选择器返现的数据
     * @param orgId 机构ID
     */
    getOwnerData: (state) => (orgId) => {
      if (state.orgData.length === 0) {
        return [];
      }
      let getParent = id => {
        let current = state.orgData.find(v => v.id === id);
        if (current) {
          let parent = getParent(current.orgPid);
          return parent.concat(current);
        } else {
          return [];
        }
      };

      return getParent(orgId).map(v => v.id);
    },
    /**
     * 获取机构数据格式化后的数据
     * 用于级联基础数据
     * @param state 
     */
    getOrgFormatData(state) {
      return state.orgData.map(v => {
        return {
          id: v.id,
          pid: v.orgPid,
          value: v.id,
          label: v.orgName
        }
      })
    }
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
    async getOrgData({ commit }) {
      let { SysOrgService } = await CreateSysOrgService;
      let sysOrgService = new SysOrgService()
      sysOrgService.findAllOrganizationByAuth().subscribe(
        data => commit("updateOrgData", data),
        err => console.error(err.msg)
      )
    }
  }
}
