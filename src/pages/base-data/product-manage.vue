<template>
  <section class="page product-manage">
    <page-header title="产品管理" hiddenPrint hiddenExport>
      <command-button label="关联产品"></command-button>
    </page-header>
    <i-row :gutter="16">
      <i-col :span="6" class="product-table-cell">
        <data-tree :data="carTreeData" @on-select-change="onTreeNodeSelectChange"></data-tree>
      </i-col>
      <i-col :span="18" class="product-table-cell">
        <data-box :columns="columns" :data="dataSet" ref="databox"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import DataTree from "~/components/common/data-tree.vue";
import { namespace } from "vuex-class";
import { CarPropertyType } from "~/config/enum.config.ts";
import { BasicProductService } from "~/services/manage-service/basic-product.service";
import { PageService } from "~/utils/page.service";

const CarModule = namespace("carSpace")

@Layout('workspace')
@Component({
  components: {
    DataTree
  }
})
export default class ProductManage extends Page {
  @Dependencies(BasicProductService) private basicProductService: BasicProductService;
  @Dependencies(PageService) private pageService: PageService;
  @CarModule.Getter carTreeData

  private columns: any;
  private dataSet: any = [];


  private model = {
    name: ""
  }

  created() {
    this.columns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(4),
        fixed: "left",
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
                    // this.modifySupplier(row);
                  }
                }
              },
              "修改"
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
                    // this.deleteSupplier(row);
                  }
                }
              },
              "删除"
            )
          ]
          )        }
      },

      {
        align: "center",
        editable: true,
        title: "名称",
        key: "supplierName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "电话",
        key: "supplierPhone",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "地址",
        key: "supplierAddress",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "备注",
        key: "remark",
        minWidth: this.$common.getColumnWidth(6)
      }
    ];
  }

  /**
   * 车辆树节点发生改变时
   */
  private onTreeNodeSelectChange(data) {
    if (data.type !== CarPropertyType.model) return
    let carId = data.id
    this.basicProductService.findBasicProductList(carId, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>


<style lang="less" scoped>
.page.product-manage {
  .product-table-cell {
    border: solid 1px #ddd;
    min-height: 590px;
  }
}
</style>
