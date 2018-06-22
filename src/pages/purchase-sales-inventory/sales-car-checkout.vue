<!-- 客户提车 -->
<template>
  <section class="page sales-car-checkout">
    <page-header title="客户提车" hidden-print hidden-export>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshSalesCarCheckout">
      <template slot="input">
        <i-form-item prop="roleName" label="订单号：">
          <i-input placeholder="请输入订单号" v-model="queryParamsModel.roleName"></i-input>
        </i-form-item>
        <i-form-item prop="roleName" label="客户号：">
          <i-input placeholder="请输入客户号" v-model="queryParamsModel.roleName"></i-input>
        </i-form-item>
        <i-form-item prop="roleStatus" label="状态：">
          <i-select v-model="queryParamsModel.roleStatus" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10014)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>

    </data-form>
    <data-box :id="20" :columns="salesCarCheckoutColumns" :data="salesCarCheckoutDataSet" @onPageChange="refreshSalesCarCheckout" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import { Layout } from "~/core/decorator";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class SalesCarCheckout extends Page {
  @Dependencies(PageService) private pageService: PageService;

  private salesCarCheckoutColumns: any = [];
  private salesCarCheckoutDataSet: Array<Object> = [];

  private queryParamsModel = {};

  created() {
    this.salesCarCheckoutColumns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 80,
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.onVehicleInfo(row);
                  }
                }
              },
              "车辆信息"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.onPickUp(row);
                  }
                }
              },
              "提车"
            )
          ]);
        }
      },

      {
        align: "center",
        editable: true,
        title: "订单号",
        key: "roleName",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "客户号",
        key: "orgName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "车型名称",
        key: "deptName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "状态",
        key: "stockStatus",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.stockStatus))
      },
      {
        align: "center",
        editable: true,
        title: "备注",
        key: "remark",
        minWidth: this.$common.getColumnWidth(8)
      }
    ];
  }

  refreshSalesCarCheckout() {}

  /**
   *
   */
  onPickUp(row) {}

  /**
   *
   */
  onVehicleInfo(row) {}
}
</script>


<style lang="less" scoped>
</style>
