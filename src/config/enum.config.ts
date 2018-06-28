export const requestType = {
  Delete: "DELETE",
  Get: "GET",
  Post: "POST",
  Put: "PUT"
}

/**
 * 车辆主要参数类型
 */
export enum CarPropertyType {
  /**
   * 品牌
   */
  BRAND,
  /**
   * 系列
   */
  SERIES,
  /**
   * 车型
   */
  MODEL
}

/**
 * 客户详情 | 订单详情
 */
export enum InfoCompontentType {
  /**
   * 客户详情
   */
  CUSTOMER,
  /**
   * 订单详情
   */
  ORDER
}

/**
 * 编辑类型
 */
export enum EditType{
  /**
   * 增加
   */
  ADD,
  /**
   * 编辑
   */
  MODIFY,
  /**
   * 删除
   */
  DELETE
}