<template>
  <section class="page potential-clients">
    <page-header title="意向客户" hidden-print hidden-export>
    </page-header>
    <data-form :model="model" :page="pageService" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="客户姓名：">
          <i-input placeholder="请输入客户姓名：" v-model="model.name"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { PageService } from "~/utils/page.service";
import { BasicCustomerCenterService } from "~/services/manage-service/basic-customer-center.service";

@Layout('workspace')
@Component({
  components: {}
})
export default class PotentialClients extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerCenterService) private basicCustomerCenterService: BasicCustomerCenterService;

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
        minWidth: this.$common.getColumnWidth(4),
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h("i-button",
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
              "查看")
          ])
        }
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
   * 获取意向客户列表
   */
  private refreshData() {
    this.basicCustomerCenterService.findPotentialCustomerList(this.model, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

}
</script>


<style lang="less" scoped>
</style>
