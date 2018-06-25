<!--订单 / 客户信息 详情页面-->
<template>
  <section class="component order-customer-info">
    <div class="title">{{title}}</div>
    <component :is="currentComponent" :customerId="customerId" :orderId="orderId"></component>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import CustomerInfo from "~/components/customer-center/customer-info.vue";
import OrderInfo from "~/components/order-manage/order-info.vue";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
  components: {
    CustomerInfo,
    OrderInfo
  }
})
export default class OrderCustomerInfo extends Vue {
  @CustomerOrderModule.State currentComponent;
  @CustomerOrderModule.State customerId;
  @CustomerOrderModule.State orderId;
  @CustomerOrderModule.Getter componentNameList;

  /**
   * 获取标题
   */
  get title() {
    let current = this.componentNameList.find(x => x.name === this.currentComponent)
    return current.title || ""
  }
}
</script>
<style lang="less">
.component.order-customer-info {
  .title {
    font-size: 20px;
    font-weight: bold;
    padding-left: 20px;
    margin-bottom: 5px;
  }
}
</style>
