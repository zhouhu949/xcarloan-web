<!--提前结清/收回-->
<template>
  <section class="component early-settlement-detail">
    <data-box :columns="columns" :data="dataSet"></data-box>
    <i-form v-if="isRecover" :model="model" :label-width="110" :rules="rules" ref="form">
      <i-form-item label="提前收回金额：" prop="recoverMoney">
        <i-input-number v-model="model.recoverMoney" :min="0" :max="maxRecoryMoney" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";

@Component({
  components: {
  }
})
export default class ModifyOrderStatus extends Vue {
  @Dependencies(FinancialQueryService) private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService) private financialManagementService: FinancialManagementService;

  /**
   * 订单id
   */
  @Prop({
    required: true,
    type: Number
  })
  orderId: Number;

  @Prop({
    type: Boolean,
    default: false
  })
  isRecover: boolean


  private columns: Array<any> = [];
  private dataSet: Array<any> = [];


  private model = {
    orderId: this.orderId,
    recoverMoney: 0
  }

  get maxRecoryMoney() {
    if (this.dataSet.length !== 0) return this.dataSet[this.dataSet.length - 1].money
  }

  private rules = {
    recoverMoney: [
      { trigger: "blur", message: "请输入收回金额", required: true, type: "number" }
    ]
  }

  created() {
    this.columns = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        align: 'center',
        title: '费用项',
        key: 'expenseName',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: 'center',
        title: ' 已还金额',
        key: 'isRepayMoney',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.isRepayMoney)}</div>)
      },
      {
        align: 'center',
        title: ' 应还金额',
        key: 'repayMoney',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.repayMoney)}</div>)
      },
      {
        align: 'center',
        title: ' 剩余未还金额',
        key: 'money',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.money)}</div>)
      }
    ]
  }

  mounted() {
    // 查询订单详情
    this.financialQueryService.findBalanceInfo(this.orderId).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.message)
    )
  }

  /**
   * 提前结清
   */
  private earlyRepayMoney() {
    return new Promise((resolve, reject) => {
      this.financialManagementService.earlyRepayMoney(this.orderId).subscribe(
        data => {
          this.$Message.success('操作成功！')
          resolve(true)
        },
        err => {
          this.$Message.error(err.msg)
          resolve()
        }
      )
    })
  }

  /**
   * 提前收回
   */
  private earlyRecover() {
    let form: any = this.$refs.form
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve()
        this.financialManagementService.earlyRecycle(this.model).subscribe(
          data => {
            this.$Message.success('操作成功！')
            resolve(true)
          },
          err => {
            this.$Message.error(err.msg)
            resolve()
          }
        )
      })
    })
  }
}
</script>

<style lang="less">
</style>