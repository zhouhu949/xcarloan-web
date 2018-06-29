<template>
  <section class="page product-manage">
    <page-header title="产品管理" hiddenPrint hiddenExport>
      <command-button v-show="allowAdd" label="新增产品" @click="addProduct"></command-button>
    </page-header>
    <i-row>
      <i-col :span="6" class="product-table-cell">
        <data-tree :data="carTreeData" @on-select-change="onTreeNodeSelectChange"></data-tree>
      </i-col>
      <i-col :span="18" class="product-table-cell">
        <data-box :columns="columns" :data="dataSet" ref="databox" :page="pageService" :height="520"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="tsx">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { CarPropertyType } from "~/config/enum.config.ts";
import { BasicProductService } from "~/services/manage-service/basic-product.service";
import { PageService } from "~/utils/page.service";
import DataTree from "~/components/common/data-tree.vue";
import AddModifyProduct from '~/components/base-data/add-modify-product.vue';
import productDetail from '~/components/base-data/product-detail.vue';
import ProductSchemeDetail from '~/components/base-data/product-scheme-detail.vue';
import { ProdSchemeDetailType } from "~/config/enum.config";
import { Button } from "iview";

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
  private carId: Number = 0;
  private carName: String = '';
  private allowAdd: Boolean = false;
  private isRelease: Boolean = false;
  private schemeStatus: Number = 10056;

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
          if (row.productStatus === 10056) {
            return (<div>
              <i-button type="text" class="row-command-button" onClick={() => this.publishProduct(row.id)}>发布</i-button>
              <i-button type="text" class="row-command-button" onClick={() => this.editProduct(row)}>编辑</i-button>
              <i-button type="text" class="row-command-button" onClick={() => this.deleteBasicProduct(row.id)}>删除</i-button>
            </div>
            )
          } else {
            return (
              <div>
                <i-button type="text" class="row-command-button" onClick={() => this.canclePublishProduct(row.id)}>取消发布</i-button>
              </div>
            )
          }
        }
      },

      {
        align: "center",
        editable: true,
        title: "产品名称",
        key: "productName",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) => {
          return (
            <i-button type="text" class="row-command-button" onClick={() => this.checkProductDetail(row)}> {row.productName}</i-button>
          )
        }
      },
      {
        align: "center",
        editable: true,
        title: "产品类型",
        key: "productType",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => {
          return h('span', {}, this.$dict.getDictName(row.productType))
        }
      },
      {
        align: "center",
        editable: true,
        title: "产品发布状态",
        key: "productStatus",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => (<span>{this.$filter.dictConvert(row.productStatus)}</span>)
      },
      {
        align: "center",
        editable: true,
        title: "还款方案",
        key: "schemeName",
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, columns, index }) => {
          return (
            <i-button type="text" class="row-command-button" onClick={() => this.checkRepaySchemeDetail(row.schemeName, row.id)}> {row.schemeName}</i-button>
          )
        }
      },
      {
        align: "center",
        editable: true,
        title: "车型名称",
        key: "carModelName",
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        align: "center",
        title: "期数",
        key: "periods",
        minWidth: this.$common.getColumnWidth(2),
      },
      {
        align: "center",
        title: "利率",
        key: "interestRate",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, column, index }) => (<span>{this.$filter.decimalToPrecent(row.interestRate)}</span>)
      }
    ];
  }

  /**
   * 获取当前状态是否已经发布
   */
  private getPublishState(value) {
    return value === 10056
  }

  /**
   * 车辆树节点发生改变时
   */
  private onTreeNodeSelectChange(data) {
    if (data.type !== CarPropertyType.MODEL) {
      this.allowAdd = false
      return
    }
    this.allowAdd = true
    this.carId = data.id
    this.carName = data.name
    this.basicProductService.findBasicProductList(this.carId, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
  /**
   * 新增产品
   */
  addProduct() {
    this.$dialog.show({
      title: '新增产品',
      footer: true,
      width: 700,
      onOk: add => {
        return add.addProduct().then(v => {
          if (v) {
            this.refreshProductList()
          }
          return v
        })
      },
      render: h => (<AddModifyProduct carId={this.carId} carName={this.carName}></AddModifyProduct>)
    })
  }
  /**
   * 编辑产品
   */
  editProduct(productData) {
    this.$dialog.show({
      title: '编辑产品',
      footer: true,
      width: 700,
      onOk: modify => {
        return modify.editProduct().then(v => {
          if (v) {
            this.refreshProductList()
          }
          return v
        })
      },
      render: h => (<AddModifyProduct carId={this.carId} carName={this.carName} productData={productData}></AddModifyProduct>)
    })
  }
  /**
   * 查看产品详情
   */
  checkProductDetail(row) {
    this.$dialog.show({
      title: '查看产品详情',
      isView: true,
      width: 1000,
      render: h => (<productDetail productData={row}></productDetail>)
    })
  }
  /**
   * 查看还款方案详情
   */
  checkRepaySchemeDetail(name: String, productId: Number) {
    let queryParams = { productId: productId }
    let type = ProdSchemeDetailType.PRODUCT
    this.$dialog.show({
      title: name,
      width: 1000,
      render: h => (<ProductSchemeDetail queryParams={queryParams} productType={type}></ProductSchemeDetail>)
    })
  }
  /**
   * 发布车型产品
   */
  publishProduct(productId: Number) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定发布此车型产品吗？',
      onOk: () => {
        this.basicProductService.publishedBasicProduct(productId).subscribe(
          val => {
            this.$Message.success('发布成功！')
            this.refreshProductList()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }
  /**
   * 取消发布车型产品
   */
  canclePublishProduct(productId: Number) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定取消发布此车型产品吗？',
      onOk: () => {
        this.basicProductService.cancelPublishedBasicProduct(productId).subscribe(val => {
          this.$Message.success('取消发布成功！')
          this.refreshProductList()
        },
          err => {
            this.$Message.error(err.msg)
          })
      }
    })
  }
  /**
   * 删除车型产品
   */
  deleteBasicProduct(productId: Number) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此车型产品吗？',
      onOk: () => {
        this.basicProductService.deleteBasicProduct(productId).subscribe(val => {
          this.$Message.success('删除成功！')
          this.refreshProductList()
        },
          err => {
            this.$Message.error(err.msg)
          })
      }
    })
  }
  /**
   * 刷新
   */
  refreshProductList() {
    this.basicProductService.findBasicProductList(this.carId, this.pageService).subscribe(
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
