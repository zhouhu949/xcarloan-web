import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator"; 
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class BasicCarManageService { 
  @Inject(NetService)
  private netService: NetService

  /**
   * 车辆维护树
   */
  getAllCarTreeList() {
    return this.netService.send({
      server: manageService.basicCarManagecontroller.getAllCarTreeList,
    })
  }
  /**
   * 新增品牌
   */
  addCarBrand(brandName, url) {
    return this.netService.send({
      data: {
        brandName: brandName,
        brandPhotoUrl : url,
      },
      loading: true,
      server: manageService.basicCarManagecontroller.addCarBrand,
    })
  }
  /**
   * 修改车辆品牌
   */
  editCarBrand(data) {
    return this.netService.send({
      data:data,
      loading: true,
      server: manageService.basicCarManagecontroller.editCarBrand,
    })
  }
  /**
   * 车辆品牌查看
   */
  getCarBrandById(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.getCarBrandById,
    })
  }
  /**
   * 删除车辆品牌
   */
  deleteCarBrand(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.deleteCarBrand,
    })
  }
  /**
   * 新增车系
   */
  addCarSeries(data) {
    return this.netService.send({
      data:data,
      server: manageService.basicCarManagecontroller.addCarSeries,
    })
  }
  /**
   * 删除车系
   */
  deleteCarSeries(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.deleteCarSeries,
    })
  }
  /**
   * 根据id 查找车系
   */
  getCarSeriesById(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.getCarSeriesById,
    })
  }
  /**
   * 修改车系
   */
  editCarSeries(data) {
    return this.netService.send({
      data:data,
      server: manageService.basicCarManagecontroller.editCarSeries,
    })
  }
  /**
   * 新增车型
   */
  addCarModel(data) {
    return this.netService.send({
      data:{
        displacement: data.carEmissions,
        diveway : data.drivingMode,
        fulyway : data.fuel,
        innerColor :data.interiorColor,
        modelColors :data.carColour,
        modelFuel : data.fuelConsumption,
        modelName : data.modelName,
        modelVolume :data.carSize,
        remark :data.remark,
        seriesId : data.seriesId,
        structure :data.carStructure,
      },
      server: manageService.basicCarManagecontroller.addCarModel,
    })
  }
  /**
   * 删除车型
   */
  deleteCarModel(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.deleteCarModel,
    })
  }
  /**
   * 修改车型
   */
  editCarModel(data) {
    return this.netService.send({
      data:{
        displacement: data.carEmissions,
        diveway : data.drivingMode,
        fulyway : data.fuel,
        innerColor :data.interiorColor,
        modelColors :data.carColour,
        modelFuel : data.fuelConsumption,
        modelName : data.modelName,
        modelVolume :data.carSize,
        remark :data.remark,
        seriesId : data.seriesId,
        structure :data.carStructure,
      },
      server: manageService.basicCarManagecontroller.editCarModel,
    })
  }
  /**
   * 查看车型
   */
  getCarModelById(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.getCarModelById,
    })
  }
  /**
   * 根据车系id查找品牌
   */
  getCarSeriesByCarName(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.getCarSeriesByCarName,
    })
  }
  /**
   * 查找车辆配置参数列表
   */
  findCarConfigParamList(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.findCarConfigParamList,
    })
  }
  /**
   * 添加车辆配置参数
   */
  addCarConfigParamInfo(data) {
    return this.netService.send({
      append:data,
      server: manageService.basicCarManagecontroller.addCarConfigParamInfo,
    })
  }
  /**
   * 新增 车型介绍
   */
  addCarIntenduceInfo(data) {
    return this.netService.send({
      append:data,
      server: manageService.basicCarManagecontroller.addCarIntenduceInfo,
    })
  }


}