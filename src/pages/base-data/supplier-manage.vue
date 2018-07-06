<template>
  <section class="page supplier-manage">
    <page-header title="供应商管理" hidden-print hidden-export>
      <command-button label="新增供应商" @click="modifySupplier()"></command-button>
    </page-header>
    <data-form :model="model" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="供应商：">
          <i-input placeholder="请输入供应商名称" v-model="model.name"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="20" :columns="columns" :page="pageService" :data="dataSet" ref="databox"></data-box>
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import ModifySupplier from "~/components/base-data/modify-supplier.vue";
import { Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { PageService } from '~/utils/page.service'
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class SupplierManage extends Page {
  @Dependencies(BasicSupplierService) private basicSupplierService: BasicSupplierService;
  @Dependencies(PageService) private pageService: PageService;

  private columns: any;
  private dataSet: any = [];

  private model = {
    name: ""
  }


  mounted() {
    this.refreshData();
  }

  created() {
    this.columns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(2),
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
                class: {
                  'row-command-button': true
                },
                on: {
                  click: () => {
                    this.modifySupplier(row);
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
                    this.deleteSupplier(row);
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
   * 维护
   * @param val 新增不传，修改传维护的数据
   */
  private modifySupplier(val?: Object) {
    this.$dialog.show({
      title: val ? "修改供应商" : "新增供应商",
      footer: true,
      onOk: modifySupplier => {
        return modifySupplier.submit().then(v => {
          if (v) this.refreshData();
          return v;
        });
      },
      render: h =>
        h(ModifySupplier, {
          props: {
            supplierData: val
          }
        })
    });
  }


  /**
   * 删除
   */
  deleteSupplier(row) {
    let supplierName = row.supplierName
    this.$Modal.confirm({
      title: "提示",
      content: `确定删除供应商 <b>${supplierName}</b> 吗？`,
      onOk: () => {
        this.basicSupplierService.deleteBasicSupplier(row.id).subscribe(
          val => {
            this.$Message.success("删除成功！");
            this.refreshData();
          },
          err => this.$Message.error(err.msg)
        );
      }
    });
  }

  /**
   * 查询供应商数据
   */
  private refreshData() {
    this.basicSupplierService.queryBasicSupplierPage(this.model, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

}
</script>

<style lang="less" scoped>
</style>