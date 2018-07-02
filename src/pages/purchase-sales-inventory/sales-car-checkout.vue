<!-- 客户提车 -->
<template>
  <section class="page sales-car-checkout">
    <page-header title="客户提车" hidden-print hidden-export>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshEnterShellSave">
      <template slot="input">
        <i-form-item prop="orderNo" label="订单编号：">
          <i-input placeholder="请输入订单编号" v-model="queryParamsModel.orderNo"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
        <i-form-item prop="stockStatus" label="状态：">
          <i-select v-model="queryParamsModel.stockStatus" clearable>
            <i-option v-for="{value,label} in $dict.getDictData(10014)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>

    </data-form>
    <data-box :id="20" :columns="enterShellSaveColumns" :data="enterShellSaveDataSet" @onPageChange="refreshEnterShellSave" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import { Layout } from "~/core/decorator";
import Component from "vue-class-component";
import OrderCarDetails from "~/components/purchase-sales-inventory/order-car-details.vue";
import CarParams from "~/components/base-data/car-params.vue";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { BasicEnterShellSaveService } from "~/services/manage-service/basic-enter-shell-save.service";
import { BasicStockCarService } from "~/services/manage-service/basic-stock-car.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class SalesCarCheckout extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicEnterShellSaveService)
  private basicEnterShellSaveService: BasicEnterShellSaveService;
  @Dependencies(BasicStockCarService)
  private basicStockCarService: BasicStockCarService;

  private enterShellSaveColumns: any = [];
  private enterShellSaveDataSet: Array<any> = [];

  private queryParamsModel = {
    orderNo: "",
    customerName: "",
    stockStatus: 10047
  };

  created() {
    this.enterShellSaveColumns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(1),
        align: "center",
        render: (h, { row, column, index }) => {
          // 根据状态执行不同的操作 10123 : 待采购 ; 10046 : 整备中 ; 10047 : 整备完成 ; 10048 : 已提车
          switch (row.stockStatus) {
            // 待采购
            case 10123:
              break;
            // 整备完成
            case 10047:
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
                        this.onGetVehicleInfo(row);
                      }
                    }
                  },
                  "详情"
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
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确定执行提车操作吗？",
                          transfer: false,
                          onOk: () => {
                            this.onPickUp(row);
                          }
                        });
                      }
                    }
                  },
                  "提车"
                )
              ]);
            default:
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
                        this.onGetVehicleInfo(row);
                      }
                    }
                  },
                  "详情"
                )
              ]);
          }
        }
      },

      {
        align: "center",
        editable: true,
        title: "订单编号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(5)
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
        title: "车型名称",
        key: "modelName",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h(
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
                  this.onGetCarParams(row.modelId);
                }
              }
            },
            row.modelName
          );
        }
      },
      {
        align: "center",
        editable: true,
        title: "车辆颜色",
        key: "modelColors",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "采购价格（元）",
        key: "stockPrice",
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
      }
    ];
  }

  mounted() {
    // 加载数据
    this.refreshEnterShellSave();
  }

  /**
   * keep-alive生命周期钩子函数
   */
  activated() {
    // 加载数据
    this.refreshEnterShellSave();
  }

  /**
   * 刷新列表
   */
  refreshEnterShellSave() {
    this.basicEnterShellSaveService
      .queryOutSideList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.enterShellSaveDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 提车操作
   */
  onPickUp(data) {
    this.basicStockCarService.updateCarStockStatus(data.stockId).subscribe(
      data => {
        this.$Message.success("操作成功！");
        this.refreshEnterShellSave();
      },
      err => this.$Message.error(err.msg)
    );
  }

  /**
   *获取车辆信息
   */
  onGetVehicleInfo(row) {
    this.$dialog.show({
      title: "详情",
      isView: true,
      footer: true,
      render: h =>
        h(OrderCarDetails, {
          props: {
            orderId: row.orderId
          }
        })
    });
  }

  /**
   * 查看车型信息
   */
  onGetCarParams(modelId) {
    this.$dialog.show({
      title: "车型信息",
      isView: true,
      footer: true,
      render: h =>
        h(CarParams, {
          props: {
            carId: modelId,
            isView: true
          }
        })
    });
  }
}
</script>

<style lang="less" scoped>
</style>
