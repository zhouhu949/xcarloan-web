<template>
  <section class="page out-storage">
    <page-header title="押品出库" hiddenPrint hiddenExport>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshOutStorage">
      <template slot="input">
        <i-form-item prop="orderNo" label="订单编号：">
          <i-input placeholder="请输入订单编号" v-model="queryParamsModel.orderNo"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
        <i-form-item prop="mortgageStatus" label="押品状态：">
          <i-select v-model="queryParamsModel.mortgageStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData(10037)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="outStorageColumns" :data="outStorageDataSet" @onPageChange="refreshOutStorage" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import MortgageOutStorage from "~/components/finance-detain/mortgage-out-storage.vue";
import PledgeOutStorage from "~/components/finance-detain/pledge-out-storage.vue";
import { Layout } from "~/core/decorator";
import { namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class OutStorage extends Page {
  @Dependencies(FinanceDetainService)
  financeDetainService: FinanceDetainService;
  @Dependencies(PageService) private pageService: PageService;

  private outStorageColumns: any;
  private outStorageDataSet: Array<Object> = [];

  private queryParamsModel = {
    orderNo: "",
    customerName: "",
    mortgageStatus: ""
  };

  created() {
    // 加载数据
    this.refreshOutStorage();

    this.outStorageColumns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 160,
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
                    // this.onGetCarParams(row);
                  }
                }
              },
              "出库"
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
                    // this.onGetCarParams(row);
                  }
                }
              },
              "查看"
            )
          ]);
        }
      },

      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "手机号",
        key: "carNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "订单号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "抵押方式",
        key: "orderMrtgageType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.orderMrtgageType))
      },
      {
        align: "center",
        editable: true,
        title: "入库日期",
        key: "stockInDate",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h(
            "span",
            {},
            this.$filter.dateFormat(row.stockInDate, "yyyy-MM-dd hh:mm:ss")
          )
      },
      {
        align: "center",
        editable: true,
        title: "出库日期",
        key: "stockOutDate",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h(
            "span",
            {},
            this.$filter.dateFormat(row.stockOutDate, "yyyy-MM-dd hh:mm:ss")
          )
      },
      {
        align: "center",
        editable: true,
        title: "抵押状态",
        key: "mortgageStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.mortgageStatus))
      }
    ];
  }

  /**
   * 刷新列表
   */
  refreshOutStorage() {
    this.financeDetainService
      .getFinanceStorageList(this.queryParamsModel,this.pageService)
      .subscribe(
        data => (this.outStorageDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
  
  /**
   * 抵押出库操作
   * @param val
   */
  onMortgageOutStorage(val?: Object) {
    this.$dialog.show({
      title: "抵押出库",
      footer: true,
      onOk: mortgageOutStorage => {
        return mortgageOutStorage.submit().then(v => {
          if (v) this.refreshOutStorage();
          return v;
        });
      },
      render: h =>
        h(MortgageOutStorage, {
          props: {
            outStorageData: val
          }
        })
    });
  }

  /**
   * 质押出库操作
   * @param val
   */
  onPledgeOutStorage(val?: Object) {
    this.$dialog.show({
      title: "质押出库",
      footer: true,
      onOk: pledgeOutStorage => {
        return pledgeOutStorage.submit().then(v => {
          if (v) this.refreshOutStorage();
          return v;
        });
      },
      render: h =>
        h(PledgeOutStorage, {
          props: {
            outStorageData: val
          }
        })
    });
  }
}
</script>

<style lang="less" scoped>
</style>
