<!--查看模块功能-->
<template>
  <section class="component customer-info">
    <div class="left">
      <data-tree :data="customerGroupTreeData" @on-select-change="data => currentNode = data"></data-tree>
    </div>
    <div class="right">
      <div class="component-title" v-show="currentNode.component">{{currentNode.title}}</div>
      <component :is="currentNode.component" :edit="edit" :id="customerId"></component>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import DataTree from "~/components/common/data-tree.vue";
import { namespace } from "vuex-class";
// 页面基础组件
import BaseComponents from "./customer-info-base/index";

const CustomerOrderModule = namespace("customerOrderSpace")
const CUSTOMER_BASE_COMPONENT = [
  // 一级目录
  { id: 1, pid: 0, title: "基本资料", component: "CustomerInfoBasedata", default: true },
  { id: 2, pid: 0, title: "资产信息" },
  { id: 3, pid: 0, title: "职业信息", component: "CustomerInfoJob" },
  { id: 4, pid: 0, title: "联系人信息", component: "CustomerInfoContacts" },
  { id: 5, pid: 0, title: "银行卡信息", component: "CustomerInfoBank" },
  { id: 6, pid: 0, title: "附件资料", component: "CustomerInfoMaterials" },
  { id: 7, pid: 0, title: "黑白灰名单记录", component: "CustomerInfoBadRecord" },
  { id: 8, pid: 0, title: "意向记录", component: "CustomerInfoIntentionRecord" },
  { id: 9, pid: 0, title: "订单记录", component: "CustomerInfoOrderRecord" },
  // 二级目录
  { id: 1021, pid: 2, title: "车产信息", component: "CustomerInfoCar" },
  { id: 1022, pid: 2, title: "房产信息", component: "CustomerInfoHouse" },
]


@Component({
  components: {
    DataTree,
    ...BaseComponents
  }
})
export default class CustomerInfo extends Vue {
  /**
   * 客户ID
   */
  @Prop() customerId: Number
  @CustomerOrderModule.State edit;


  /**
   * 生成树数据
   */
  get customerGroupTreeData() {
    return this.$common.generateTreeData(CUSTOMER_BASE_COMPONENT)
  }

  private currentNode: any = {}

  mounted() {
    // 设置默认显示基本信息
    this.currentNode = CUSTOMER_BASE_COMPONENT.find(x => x.default)
  }
}
</script>
<style lang="less" scoped>
.component.customer-info {
  display: inline-flex;
  .left {
    width: 150px;
  }
  .right {
    width: 850px;
    min-height: 500px;
    border-left: solid 1px #ddd;
    padding-left: 10px;
  }
  .component-title {
    text-align: right;
    padding-right: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
</style>
