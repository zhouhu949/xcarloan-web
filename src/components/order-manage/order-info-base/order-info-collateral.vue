<!--订单押品-->
<template>
  <section class="component order-info-collateral">
    <data-grid class="collateral-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="单位名称 " :span="4">{{dataSet.companyName }}</data-grid-item>
      <data-grid-item label="单位性质" :span="4">{{dataSet.companyNature | dictConvert}}</data-grid-item>
      <data-grid-item label="所属行业" :span="4">{{dataSet.industry | dictConvert}}</data-grid-item>
      <data-grid-item label="职业类型" :span="4">{{dataSet.jobType | dictConvert}}</data-grid-item>
      <data-grid-item label="职级 " :span="4">{{dataSet.rank}}</data-grid-item>
      <data-grid-item label="入职时间" :span="4">{{dataSet.accessCompanyTime}}</data-grid-item>
      <data-grid-item label="注册资本" :span="4">{{dataSet.registeredCapital }}</data-grid-item>
      <data-grid-item label="员工人数" :span="4">{{dataSet.employeesNumber }}</data-grid-item>
      <data-grid-item label="经营归属地" :span="4">{{dataSet.enterpriseManageBelong }}</data-grid-item>
      <data-grid-item label="企业经营年限" :span="4">{{dataSet.enterpriseManageYears }}</data-grid-item>
      <data-grid-item label="身份" :span="4">{{dataSet.identity}}</data-grid-item>
      <data-grid-item label="每月发薪日" :span="4">{{dataSet.payDay}}</data-grid-item>
      <data-grid-item label="发薪方式" :span="4">{{dataSet.payWay}}</data-grid-item>
      <data-grid-item label="单位地址" :span="4">{{dataSet.companyAddress}}</data-grid-item>
      <data-grid-item label="单位地址详细" :span="4">{{dataSet.companyAddressDetail }}</data-grid-item>
      <data-grid-item label="备注" :span="12">{{dataSet.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";


@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class OrderInfoCollateral extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number

  private dataSet: Array<any> = [];

  mounted() {
    /**
     * 获取押品资料
     */
    this.basicCustomerOrderService.findCustomerCollateral(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.order-info-collateral {
  .collateral-info {
    margin: 10px;
  }
}
</style>
