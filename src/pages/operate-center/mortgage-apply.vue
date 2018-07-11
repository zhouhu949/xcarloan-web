<!--抵押贷款申请-->
<template>
  <section class="page mortgage-apply">
    <page-header title="抵押贷款申请" hiddenPrint hiddenExport></page-header>
    <i-form ref="form" class="base-form" inline :label-width="110" :model="basicModel">
      <i-card title="客户基本信息">
        <div slot="extra">
          <a @click="dialog.selectedCustomer=true">
            <i-icon type="search"></i-icon>
            选择客户
          </a>
        </div>
        <i-form-item label="客户姓名" prop="name">
          <i-input v-model="basicModel.name" readonly placeholder="请选择客户"></i-input>
        </i-form-item>
        <i-form-item label="联系电话" prop="phone">
          <i-input v-model="basicModel.phone" readonly placeholder="请选择客户"></i-input>
        </i-form-item>
        <i-form-item label="身份证号" prop="idCard">
          <i-input v-model="basicModel.idCard" readonly placeholder="请选择客户"></i-input>
        </i-form-item>
      </i-card>
      <i-card title="贷款资料" v-show="!!basicModel.customerId">
        <i-form-item label="客户车产" prop="carsName">
          <i-input type="textarea" :rows="1" v-model="basicModel.carsName" readonly @on-focus="dialog.selectedCar = true" placeholder="请选择抵押车辆"></i-input>
        </i-form-item>
        <i-form-item label="贷款金额" prop="loanAmt">
          <i-input-number v-model.lazy="basicModel.loanAmt" placeholder="请输入贷款金额" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
        </i-form-item>
        <i-form-item label="还款方案" prop="schemeName">
          <i-input v-model="basicModel.schemeName" :disabled="disableScheme" readonly @on-focus="dialog.selectedScheme = true" placeholder="请选择还款方案"></i-input>
        </i-form-item>
      </i-card>
    </i-form>
    <i-card title="还款详情" v-show="!!basicModel.schemeId">
      <div slot="extra">
        <a @click="onCalcClick">
          <i-icon type="ios-calculator"></i-icon>
          计算详情
        </a>
      </div>
      <product-scheme-detail :queryParams="queryDetailModel" :productType="schemeType"></product-scheme-detail>
    </i-card>

    <div v-show="!!queryDetailModel" class="fixed-container">
      <i-button class="highButton" @click="submit">提交</i-button>
    </div>

    <template>
      <i-modal title="客户选择" v-model="dialog.selectedCustomer" :width="1000" cancel-text="" @on-ok="onCustomerSelectedClick">
        <choose-customer :customerId="basicModel.customerId" ref="chooseCustomer"></choose-customer>
      </i-modal>
      <i-modal title="车辆选择" v-model="dialog.selectedCar" :width="1000" cancel-text="" @on-ok="onCarSelectedClick">
        <choose-customer-car :customerId="basicModel.customerId" :carIds="basicModel.carIds" ref="chooseCar"></choose-customer-car>
      </i-modal>
      <i-modal title="方案选择" v-model="dialog.selectedScheme" :width="1000" cancel-text="" @on-ok="onSchemeSelectedClick">
        <choose-scheme :schemeId="basicModel.schemeId" :schemeType="schemeType" ref="chooseScheme"></choose-scheme>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import ChooseCustomerCar from "~/components/operate-center/choose-customer-car.tsx.vue";
import ChooseCustomer from "~/components/operate-center/choose-customer.vue";
import ChooseScheme from "~/components/base-data/choose-scheme.vue";
import ProductSchemeDetail from "~/components/base-data/product-scheme-detail.vue";
import { ProdSchemeDetailType } from "~/config/enum.config";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";

@Layout('workspace')
@Component({
  components: {
    ChooseCustomerCar,
    ChooseCustomer,
    ChooseScheme,
    ProductSchemeDetail
  }
})
export default class MortgageApply extends Page {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService
  private schemeType = ProdSchemeDetailType.MORTGAGE
  private basicModel: any = null;
  private columns: Array<any> = null;
  private dialog = {
    selectedCar: false,
    selectedCustomer: false,
    selectedScheme: false
  }

  /**
   * 点击查询的时候再赋值触发
   */
  private queryDetailModel: {
    schemeId: Number,
    loanAmt: Number
  } = null;

  created() {
    this.basicModel = {
      customerId: null,
      name: "",
      phone: "",
      idCard: "",
      loanAmt: 0,
      schemeId: null,
      schemeName: "",
      carsName: "",
      carIds: null
    }
    this.columns = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "产品名称",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "productName"
      },
      {
        title: "方案名称",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "schemeName"
      },
      {
        title: "还款方式",
        align: "center",
        minWidth: this.$common.getColumnWidth(4),
        key: "repayType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.repayType));
        }
      },
      {
        title: "期数",
        align: "center",
        minWidth: this.$common.getColumnWidth(2),
        key: "periods"
      },
      {
        title: "利率",
        align: "center",
        minWidth: this.$common.getColumnWidth(2),
        key: "interestRate",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.decimalToPrecent(row.interestRate));
        }
      }
    ]
  }

  get disableScheme() {
    if (!this.basicModel.carIds) return true
    if (this.basicModel.carIds.length < 1) return true
    if (this.basicModel.loanAmt < 1) return true
  }

  /**
   * 车辆选择项改变
   */
  private onCarSelectedClick() {
    let data = (this.$refs.chooseCar as ChooseCustomerCar).selectData
    if (!data) return
    this.basicModel.carIds = data.carIds
    this.basicModel.carsName = data.carsName
  }

  /**
   * 联系人选择项改变
   */
  private onCustomerSelectedClick() {
    let data = (this.$refs.chooseCustomer as ChooseCustomer).selectData
    if (!data) return
    this.basicModel.customerId = data.customerId
    this.basicModel.name = data.name
    this.basicModel.phone = data.phone
    this.basicModel.idCard = data.idCard
  }

  /**
   * 方案选择
   */
  private onSchemeSelectedClick() {
    let data = (this.$refs.chooseScheme as ChooseScheme).selecedData
    if (!data) return
    this.basicModel.schemeId = data.schemeId
    this.basicModel.schemeName = data.schemeName
    this.onCalcClick()
  }

  /**
   * 当点击计算器的时候再触发计算功能
   */
  private onCalcClick() {
    this.queryDetailModel = {
      schemeId: this.basicModel.schemeId,
      loanAmt: this.basicModel.loanAmt
    }
  }

  /**
   * 提交
   */
  private submit() {
    this.basicCustomerOrderService.createMortgageOrder(
      this.basicModel.customerId,
      this.basicModel.carIds,
      // 实用查询还款计划的数据进行提交。防止误触发变更数据
      this.queryDetailModel.schemeId,
      this.queryDetailModel.loanAmt
    ).subscribe(
      data => {
        this.$Message.success('操作成功')
        this.resetPage()
      },
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 重置页面
   */
  private resetPage() {
    let form: any = this.$refs.form
    form.resetFields()
    this.basicModel.customerId = null
    this.basicModel.carIds = null
    this.basicModel.schemeId = null
    this.queryDetailModel = null
  }

}
</script>


<style lang="less" scoped>
.page.mortgage-apply {
  .base-form {
    margin-top: 20px;
  }
  margin-bottom: 80px;
}
</style>
