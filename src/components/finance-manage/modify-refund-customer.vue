<!-- 退款 -->
<template>
  <section class="component detain-details">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item v-for="item in dataSet" :label="item.expenseName" :key="item.expenseName" :span="6">{{item.money | toThousands}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Form } from "iview";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { State, Getter, namespace } from "vuex-class";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ModifyRefundCustomer extends Vue {
  @Dependencies(FinancialQueryService)
  private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService)
  private financialManagementService: FinancialManagementService;

  @Prop({
    default: 0,
    type: Number
  })
  orderId: number;
  private dataSet: Array<any> = [];

  /**
   *
   */
  mounted() {
    this.getFinancialRefund();
  }

  /**
   * 获取供应商信息
   */
  private getFinancialRefund() {
    if (this.orderId) {
      this.financialQueryService
        .queryFinancialRefunds(this.orderId)
        .subscribe(
          data => (this.dataSet = data),
          err => this.$Message.error(err)
        );
    }
  }

  submit() {
    return new Promise((resolve, reject) => {
      this.financialManagementService.financialRefund(this.orderId).subscribe(
        data => {
          this.$Message.success("操作成功！");
          resolve(true);
        },
        err => {
          this.$Message.error(err.msg);
          reject(err);
        }
      );
    });
  }
}
</script>

<style lang="less">
</style>