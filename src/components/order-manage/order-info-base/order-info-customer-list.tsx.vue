<!--客户信息列表-->
<template>
  <section class="component order-info-customer-list">
    <data-grid class="car-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-if="customerInfo">
      <data-grid-item label="客户姓名" :span="4">
          <i-button type="text" class="row-command-button" @click="showCustomerInfo({id:customerInfo.id})">{{customerInfo.customerName}}</i-button>
      </data-grid-item>
      <data-grid-item label="联系电话" :span="4">{{customerInfo.customerPhone}}</data-grid-item>
      <data-grid-item label="客户性别" :span="4">{{customerInfo.customerSex | dictConvert}}</data-grid-item>
      <data-grid-item label="身份证号" :span="4">{{customerInfo.idCard }}</data-grid-item>
      <data-grid-item label="客户状态" :span="4">{{customerInfo.customerStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="操作日期" :span="4">{{customerInfo.accountStatus | dateFormat}}</data-grid-item>
      <data-grid-item label="创建日期" :span="4">{{customerInfo.createTime | dateFormat}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="tsx">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Button } from "iview";
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
components: {
    DataGrid, DataGridItem
  }
})
export default class OrderInfoCustomerList extends Vue {
  @Dependencies(BasicCustomerOrderService)
  private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number;
  @CustomerOrderModule.Action showCustomerInfo;

  customerInfo: any ={};

  mounted() {
     this.basicCustomerOrderService.getCustomerInfoByOrderId(this.id).subscribe(
      data => this.customerInfo = data,
      err => this.$Message.error(err.msg)
     )
  }
}
</script>
<style lang="less" scoped>
</style>
