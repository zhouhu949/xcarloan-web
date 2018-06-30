<template>
  <section class="page inventory-manage">
    <page-header title="库存车辆管理" hiddenPrint hiddenExport>
      <command-button label="新增库存车辆" @click="onStockCarOperate()"></command-button>
    </page-header>
    <i-row class="form" :gutter="16">
      <i-col class="data-form" :span="6">
        <i-row class="data-form-item">
          <div class="data-form-item-icon"></div>
          <span>车辆品牌</span>
        </i-row>
        <div class="data-form-tree">
          <data-tree ref="data-tree" :data="carTreeData" @on-select-change="onStockCarSelectChange"></data-tree>
        </div>
      </i-col>
      <i-col class="command" :span="18">
        <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshStockCarByModel">
          <template slot="input">
            <i-form-item prop="supplierId" label="供应商：">
              <i-select v-model="queryParamsModel.supplierId" clearable filterable>
                <i-option v-for="{id,supplierName} in supplierDataSet" :key="id" :label="supplierName" :value="id"></i-option>
              </i-select>
            </i-form-item>
          </template>
        </data-form>
        <data-box :columns="inventoryColumns" :data="inventoryDataSet" @on-page-change="refreshStockCarByModel" :page="pageService" ref="databox"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataTree from "~/components/common/data-tree.vue";
import CarParams from "~/components/base-data/car-params.vue";
import ModifyBasicStockCar from "~/components/purchase-sales-inventory/modify-basic-stock-car.vue";
import { Layout } from "~/core/decorator";
import { Action, Getter, namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { BasicStockCarService } from "~/services/manage-service/basic-stock-car.service";
import { PageService } from "~/utils/page.service";
import { CarPropertyType } from "~/config/enum.config";

const CarModule = namespace("carSpace");

@Layout("workspace")
@Component({
  components: {
    DataTree
  }
})
export default class InventoryQuery extends Page {
  @Dependencies(BasicStockCarService)
  basicStockCarService: BasicStockCarService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicSupplierService)
  private basicSupplierService: BasicSupplierService;

  @CarModule.Action getAllCar;
  @CarModule.Getter carTreeData;

  private inventoryColumns: any;
  private inventoryDataSet: Array<Object> = [];
  private dataTree: DataTree;
  private modelId: number = 0;
  private supplierDataSet: Array<Object> = [];
  // 查询参数实体
  private queryParamsModel = {
    modelId: 0,
    supplierId: ""
  };

  created() {
    //当前
    this.dataTree = this.$refs["data-tree"] as DataTree;
    //
    this.inventoryColumns = [
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
                    this.onGetCarParams(row);
                  }
                }
              },
              "详情"
            )
          ]);
        }
      },

      {
        align: "center",
        editable: true,
        title: "供应商名称",
        key: "supplierName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "车架号",
        key: "stockCarNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "发动机号",
        key: "stockEngineNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "车辆颜色",
        key: "stockCarColor",
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
        title: "库存状态",
        key: "stockStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.stockStatus))
      },
      {
        align: "center",
        editable: true,
        title: "是否供应商放款",
        key: "hasSupplierLoan",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.hasSupplierLoan))
      }
    ];
  }

  mounted() {
    //加载供应商信息
    this.getBasicSupplier();
  }
  
  /**
   * 车型选中改变事件
   */
  onStockCarSelectChange(data) {
    //判断选中节点是否为叶子节点
    if (data.type === CarPropertyType.MODEL) {
      //
      this.modelId = data.id;
      //
      this.queryParamsModel.modelId = data.id;
      //刷新数据
      this.refreshStockCarByModel();
    }
  }

  /**
   * 库存操作
   * @param val
   */
  onStockCarOperate(val?: Object) {
    if (!this.modelId) {
      this.$Message.warning("请选择车型！");
      return;
    }
    
    this.$dialog.show({
      title: val ? "维护库存车辆" : "新增库存车辆",
      footer: true,
      onOk: modifyBasicStockCar => {
        return modifyBasicStockCar.submit().then(v => {
          if (v) this.refreshStockCarByModel();
          return v;
        });
      },
      render: h =>
        h(ModifyBasicStockCar, {
          props: {
            modelId: this.modelId,
            stockCarData: val
          }
        })
    });
  }

  /**
   * 获取车型信息
   * @param val 选中行数据
   */
  onGetCarParams(val: Object) {
    this.$dialog.show({
      title: "查看车型信息",
      isView: true,
      footer: true,
      render: h =>
        h(CarParams, {
          props: {
            carId: this.modelId,
            isView: true
          }
        })
    });
  }

  /**
   * 刷新数据
   */
  refreshStockCarByModel() {
    this.basicStockCarService
      .findAllStockCarList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.inventoryDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 获取供应商列表
   */
  private getBasicSupplier() {
    return new Promise((resolve, reject) => {
      this.basicSupplierService.getBasicSupplierList().subscribe(
        data => {
          this.supplierDataSet = data;
          resolve(true);
        },
        err => reject(err)
      );
    });
  }
}
</script>

<style lang="less" scoped>
.page.inventory-manage {
  overflow-x: hidden;
  .data-form {
    margin-top: 10px;
    .data-form-item {
      width: 100%;
      height: 30px;
      border: 1px solid #dddd;
      line-height: 30px;
      font-size: 16px;
      .data-form-item-icon {
        width: 4px;
        height: 15px;
        background: rgb(38, 94, 162);
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
    }
    .command {
      .command-item {
        width: 20%;
      }
      .command-add {
        margin-left: 10px;
        position: absolute;
        right: 13px;
      }
    }
    .data-form-tree {
      width: 100%;
      height: 600px;
      border: 1px solid #dddd;
      border-top: 0;
      overflow: auto;
    }
  }
}
</style>
