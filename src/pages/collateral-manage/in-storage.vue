<template>
  <section class="page in-storage">
    <page-header title="押品入库" hiddenPrint hiddenExport>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshInStorage">
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
    <data-box :columns="inStorageColumns" :data="inStorageDataSet" @onPageChange="refreshInStorage" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import MortgageInStorage from "~/components/finance-detain/mortgage-in-storage.vue";
import PledgeInStorage from "~/components/finance-detain/pledge-in-storage.vue";
import DetainDetails from "~/components/finance-detain/detain-details.vue";
import DetainMortDetails from "~/components/finance-detain/detain-mort-details.vue";
import DetainPoleDetails from "~/components/finance-detain/detain-pole-details.vue";
import { Layout } from "~/core/decorator";
import { namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class InStorage extends Page {
  @Dependencies(FinanceDetainService)
  financeDetainService: FinanceDetainService;
  @Dependencies(PageService) private pageService: PageService;

  private inStorageColumns: any;
  private inStorageDataSet: Array<Object> = [];

  private queryParamsModel = {
    orderNo: "",
    customerName: "",
    mortgageStatus: ""
  };

  created() {
    this.inStorageColumns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 160,
        align: "center",
        render: (h, { row, column, index }) => {
          // 10139 : 未入库 ; 10140 : 已入库 ; 10141 : 已出库
          if (row.mortgageStatus == 10139) {
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
                      // 10054 : 质押 ; 10055 : 抵押
                      if (row.orderMrtgageType === 10055) {
                        this.onMortgageInStorage(row);
                      } else if (row.orderMrtgageType === 10054) {
                        this.onPledgeInStorage(row);
                      }
                    }
                  }
                },
                "入库"
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
                      this.onDetainDetails(row.id);
                    }
                  }
                },
                "查看"
              )
            ]);
          } else {
            // 10054 : 质押 ; 10055 : 抵押
            if (row.orderMrtgageType === 10055) {
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
                        this.onDetainDetails(row.id);
                      }
                    }
                  },
                  "查看"
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
                        this.onDetainMortDetails(row.id);
                      }
                    }
                  },
                  "查看抵押"
                )
              ]);
            } else if (row.orderMrtgageType === 10054) {
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
                        this.onDetainDetails(row.id);
                      }
                    }
                  },
                  "查看"
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
                        this.onDetainPoleDetails(row.id);
                      }
                    }
                  },
                  "查看质押"
                )
              ]);
            }
          }
        }
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
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "车牌号",
        key: "carNo",
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

  mounted() {
    // 加载数据
    this.refreshInStorage();
  }

  /**
   * 刷新列表
   */
  refreshInStorage() {
    this.financeDetainService
      .getFinanceStorageList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.inStorageDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 抵押入库操作
   * @param val
   */
  onMortgageInStorage(val?: Object) {
    this.$dialog.show({
      title: "抵押入库",
      footer: true,
      onOk: mortgageInStorage => {
        return mortgageInStorage.submit().then(v => {
          if (v) this.refreshInStorage();
          return v;
        });
      },
      render: h =>
        h(MortgageInStorage, {
          props: {
            inStorageData: val
          }
        })
    });
  }

  /**
   * 抵押入库操作
   * @param val
   */
  onPledgeInStorage(val?: Object) {
    this.$dialog.show({
      title: "质押入库",
      footer: true,
      onOk: pledgeInStorage => {
        return pledgeInStorage.submit().then(v => {
          if (v) this.refreshInStorage();
          return v;
        });
      },
      render: h =>
        h(PledgeInStorage, {
          props: {
            inStorageData: val
          }
        })
    });
  }

  /**
   * 查看详情
   */
  onDetainDetails(id: number) {
    this.$dialog.show({
      title: "押品详情",
      isView: true,
      footer: true,
      render: h =>
        h(DetainDetails, {
          props: {
            detainId: id
          }
        })
    });
  }

  /**
   * 查看抵押详情
   */
  onDetainMortDetails(id: number) {
    this.$dialog.show({
      title: "低押详情",
      isView: true,
      footer: true,
      render: h =>
        h(DetainMortDetails, {
          props: {
            detainId: id
          }
        })
    });
  }

  /**
   * 查看质押详情
   */
  onDetainPoleDetails(id: number) {
    this.$dialog.show({
      title: "质押详情",
      isView: true,
      footer: true,
      render: h =>
        h(DetainPoleDetails, {
          props: {
            detainId: id
          }
        })
    });
  }
}
</script>

<style lang="less" scoped>
</style>
