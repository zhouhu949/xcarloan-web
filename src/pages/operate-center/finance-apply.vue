<!--融资租赁申请-->
<template>
  <section class="page finance-apply">
    <page-header title="融资租赁申请" hiddenPrint hiddenExport></page-header>
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
      <i-card title="融资方案" v-show="!!basicModel.customerId">
        <i-form-item label="融资车辆" prop="carName">
          <i-input v-model="basicModel.carName" readonly @on-focus="dialog.selectedCar = true" placeholder="请选择融资车辆"></i-input>
        </i-form-item>
        <i-form-item label="车型产品" prop="productName">
          <i-input v-model="basicModel.productName" :disabled="!basicModel.carId" @on-focus="dialog.selectedProduct = true" readonly placeholder="请选择对应产品"></i-input>
        </i-form-item>
      </i-card>
    </i-form>
    <i-card title="还款详情" v-show="!!basicModel.productId">
      <product-scheme-detail :queryParams="{productId:basicModel.productId}" :productType="detailType"></product-scheme-detail>
    </i-card>

    <div v-show="!!basicModel.productId" class="fixed-container">
      <i-button class="highButton" @click="submit">提交</i-button>
    </div>

    <template>
      <i-modal title="车辆选择" v-model="dialog.selectedCar" :width="1000" cancel-text="" @on-ok="onCarSelectedClick">
        <choose-vehicle-model :carId="basicModel.carId" ref="chooseCar"></choose-vehicle-model>
      </i-modal>
      <i-modal title="客户选择" v-model="dialog.selectedCustomer" :width="1000" cancel-text="" @on-ok="onCustomerSelectedClick">
        <choose-customer :customerId="basicModel.customerId" ref="chooseCustomer"></choose-customer>
      </i-modal>
      <i-modal title="产品选择" v-model="dialog.selectedProduct" :width="1000" cancel-text="" @on-ok="onProductSelectedClick">
        <choose-product :carId="basicModel.carId" ref="chooseProduct"></choose-product>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import ChooseVehicleModel from "~/components/operate-center/choose-vehicle-model.tsx.vue";
import ChooseCustomer from "~/components/operate-center/choose-customer.vue";
import ChooseProduct from "~/components/operate-center/choose-product.vue";
import ProductSchemeDetail from "~/components/base-data/product-scheme-detail.vue";
import { ProdSchemeDetailType } from "~/config/enum.config";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";

@Layout('workspace')
@Component({
  components: {
    ChooseVehicleModel,
    ChooseCustomer,
    ChooseProduct,
    ProductSchemeDetail
  }
})
export default class FinanceApply extends Page {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService
  private detailType = ProdSchemeDetailType.FINANCE
  private basicModel: any = null;
  private columns: Array<any> = null;
  private dialog = {
    selectedCar: false,
    selectedCustomer: false,
    selectedProduct: false
  }

  created() {
    this.basicModel = {
      customerId: null,
      name: "",
      phone: "",
      idCard: "",
      productName: "",
      productId: null,
      carName: "",
      carId: null
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

  /**
   * 车辆选择项改变
   */
  private onCarSelectedClick() {
    let data = (this.$refs.chooseCar as ChooseVehicleModel).selectData
    if (!data) return
    if (this.basicModel.carId !== data.carId) {
      // 如果选择的车型变更了，需要重新加载方案
      this.basicModel.productName = ""
      this.basicModel.productId = null
    }
    this.basicModel.carId = data.carId
    this.basicModel.carName = data.carName
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
   * 产品选择
   */
  private onProductSelectedClick() {
    let data = (this.$refs.chooseProduct as ChooseProduct).selecedData
    if (!data) return
    this.basicModel.productId = data.productId
    this.basicModel.productName = data.productName
  }

  /**
   * 提交
   */
  private submit() {
    this.basicCustomerOrderService.createFinancingOrder(
      this.basicModel.customerId,
      this.basicModel.carId,
      this.basicModel.productId
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
    this.basicModel.productId = null
  }

}
</script>


<style lang="less" scoped>
.page.finance-apply {
  .base-form {
    margin-top: 20px;
  }
  margin-bottom: 80px;
}
</style>
