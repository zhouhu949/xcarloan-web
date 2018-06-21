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
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        editable: true,
        title: "证件类型",
        key: "certificateType",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.certificateType))
      },
      {
        align: "center",
        editable: true,
        title: "证件号码",
        key: "certificateNumber",
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        title: '手机号码',
        editable: true,
        key: 'mobileMain',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '所属地区',
        editable: true,
        key: 'city',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$city.getCityName(row.city))
      },
      {
        title: '创建时间',
        editable: true,
        sortable: true,
        key: 'createTime',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center',
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.certificateType, 'yyyy-MM-dd'))
      },
      {
        title: '归属业务员',
        editable: true,
        key: 'operator',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
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
