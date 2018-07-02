export enum requestType {
  /**
   * 删除
   */
  Delete = "DELETE",
  /**
   * 获取
   */
  Get = "GET",
  /**
   * 修改
   */
  Post = "POST",
  /**
   * 修改
   */
  Put = "PUT"
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
export enum EditType {
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

/**
 * 产品方案/计算详情类型
 */
export enum ProdSchemeDetailType {
  /**
   * 产品配置
   */
  PRODUCT,
  /**
   * 融资租赁
   */
  FINANCE = 10049,
  /**
   * 抵押贷款
   */
  MORTGAGE = 10050
}