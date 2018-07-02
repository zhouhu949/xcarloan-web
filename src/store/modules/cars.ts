import { CarPropertyType } from "~/config/enum.config";
const CreateBasicCarManageService = () => import('~/services/manage-service/basic-car-manage.service')

export default {
  namespaced: true,
  state: {
    // 当前用户所对应的机构数据
    carsData: []
  },
  getters: {

    /**
     * 获取车辆树的数据
     * @param state 
     */
    carTreeData(state) {
      let treeData = state.carsData.map(brand => {
        return {
          id: brand.id,
          title: brand.brandName,
          type: CarPropertyType.BRAND,
          children: brand.carBrandSeries.map(series => {
            return {
              id: series.id,
              name: series.seriesName,
              title: series.seriesName,
              type: CarPropertyType.SERIES,
              children: series.carModel.map(model => {
                return {
                  id: model.id,
                  name: model.modelName,
                  type: CarPropertyType.MODEL,
                  title: model.modelName
                }
              })
            }
          })
        }
      })

      return [
        {
          id: 0,
          title: "所有车辆",
          children: treeData
        }
      ]
    }
  },
  mutations: {
    /**
     * 更新车辆数据
     * @param state 
     * @param data 
     */
    updateCarData(state, data) {
      state.carsData = data
    }
  },
  actions: {
    /**
     * 获取所有车辆数据
     * @param param0 
     */
    async getAllCar({ commit }) {
      let { BasicCarManageService } = await CreateBasicCarManageService()
      let basicCarManageService = new BasicCarManageService()
      basicCarManageService.getAllCarTreeList().subscribe(
        data => commit("updateCarData", data),
        err => console.error(err.msg)
      )
    }
  }
}
