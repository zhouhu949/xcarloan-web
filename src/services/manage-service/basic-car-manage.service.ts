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
  findAllCarTreeList() {
    return this.netService.send({
      server: manageService.basicCarManagecontroller.findAllCarTreeList,
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
      data:data,
      server: manageService.basicCarManagecontroller.addCarModel,
    })
  }





}