// 库存管理
import { requestType } from '~/config/enum.config'

const SERVICE = "service-manage";
const CONTROLLER = "basicStockCarManageController";

export default {
  /**
   * 车辆库存列表
   */
  findAllStockCarList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "findAllStockCarList",
    type: requestType.Get
  },
  /**
   * 新增库存
   */
  addBasicStock: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "addBasicStock",
    type: requestType.Post
  },
  /**
   * 修改库存状态
   */
  editCsrStockStatus: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "editCsrStockStatus",
    type: requestType.Put
  },
  /**
   * 修改供应商是否放款
   */
  editCsrSupplierLoan: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "editCsrSupplierLoan",
    type: requestType.Put
  },
  /**
   * 根据库存ID查找库存
   */
  findBasicStockById: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "findBasicStockById",
    type: requestType.Get
  },
  /**
   * 修改库存状态
   */
  updateCarStockStatus: {
    service: SERVICE,
    controller: CONTROLLER,
    action: "updateCarStockStatus",
    type: requestType.Put
  }
}