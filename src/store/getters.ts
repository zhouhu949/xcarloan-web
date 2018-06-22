
import { CommonService } from "~/utils/common.service";

export default {
  /**
   * 获取当前用户名
   * @param param0 
   */
  userName(state) {
    return (state.userData || {}).userName
  },
  /**
   * 获取客户资料信息分类
   */
  customerGroupTreeData() {
    let customerGroupInfo = [
      // 一级目录
      { id: 1, pid: 0, title: "基本资料", component: "CustomerInfoBasedata" },
      { id: 2, pid: 0, title: "资产信息" },
      { id: 3, pid: 0, title: "职业信息", component: "CustomerInfoJob" },
      { id: 4, pid: 0, title: "联系人信息", component: "CustomerInfoContacts" },
      { id: 5, pid: 0, title: "银行卡信息", component: "CustomerInfoBank" },
      { id: 6, pid: 0, title: "附件资料", component: "CustomerInfoMaterials" },
      { id: 7, pid: 0, title: "黑白灰名单记录", component: "CustomerInfoBadRecord" },
      { id: 8, pid: 0, title: "订单记录", component: "CustomerInfoOrderRecord" },
      // 二级目录
      { id: 1021, pid: 2, title: "车产信息", component: "CustomerInfoCar" },
      { id: 1022, pid: 2, title: "房产信息", component: "CustomerInfoHouse" },
    ]
    return CommonService.generateTreeData(customerGroupInfo)
  }
}
