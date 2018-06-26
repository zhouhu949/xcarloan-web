<template>
  <section class="page potential-clients">
    <page-header title="意向客户" hidden-print hidden-export>
      <command-button label="添加意向客户" @click="onCreatePotentialClick"></command-button>
    </page-header>
    <data-form :model="model" :page="pageService" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="客户姓名：">
          <i-input placeholder="请输入客户姓名：" v-model="model.name"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { PageService } from "~/utils/page.service";
import { BasicCustomerCenterService } from "~/services/manage-service/basic-customer-center.service";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";
import CustomerInfo from "~/components/customer-center/customer-info.vue";
import { namespace } from "vuex-class";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class PotentialClients extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerCenterService) private basicCustomerCenterService: BasicCustomerCenterService;
  @CustomerOrderModule.Action showCustomerInfo;


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
                  click: () => this.viewCustomerInfo(row.id)
                }
              },
              "查看")
          ])
        }
      },
      {
        align: "center",
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        title: '性别',
        key: 'customerSex',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.customerSex))
      },
      {
        align: "center",
        title: "证件号码",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: "center",
        title: '手机号码',
        editable: true,
        key: 'mobileMain',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        align: "center",
        title: '所属地区',
        key: 'city',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$city.getCityName(row.city))
      },
      {
        align: "center",
        title: '创建时间',
        sortable: true,
        key: 'createTime',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.certificateType, 'yyyy-MM-dd'))
      },
      {
        align: "center",
        title: '归属业务员',
        key: 'operator',
        minWidth: this.$common.getColumnWidth(3),
      }
    ];
  }

  /**
   * 查看客户详情
   */
  private viewCustomerInfo(id) {
    this.showCustomerInfo(id)
    this.$dialog.show({
      width: 1050,
      render: h => h(OrderCustomerInfo)
    })
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

  private onCreatePotentialClick() {
    this.$dialog.show({
      title: "新增意向客户",
      width: 1050,
      render: h => h(CustomerInfo, {
        props: {
          edit: true
        }
      })
    })
  }

}
</script>


<style lang="less" scoped>
</style>
