<template>
  <section class="page potential-clients">
    <page-header title="意向客户" hidden-print hidden-export>
      <command-button label="添加意向客户" @click="onCreatePotentialClick"></command-button>
    </page-header>
    <data-form :model="model" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="姓名：">
          <i-input placeholder="请输入客户姓名" v-model="model.name"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号：">
          <i-input placeholder="请输入客户身份证号" v-model="model.idCard"></i-input>
        </i-form-item>
        <i-form-item prop="phoneNumber" label="手机号：">
          <i-input placeholder="请输入客户手机号" v-model="model.phoneNumber"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" :page="pageService" ref="databox" @on-page-change="refreshData"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import ModifyCustomerInfoBasedata from "~/components/customer-center/customer-info-base/modify-customer-info-basedata.vue";
import CustomerInfoIntentionRecord from "~/components/customer-center/customer-info-base/customer-info-intention-record.tsx.vue";
import { namespace } from "vuex-class";
import { PageService } from "~/utils/page.service";
import { Layout, Dependencies } from "~/core/decorator";
import { BasicCustomerCenterService } from "~/services/manage-service/basic-customer-center.service";

const CustomerOrderModule = namespace("customerOrderSpace");

@Layout("workspace")
@Component({
  components: {}
})
export default class PotentialClients extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerCenterService)
  private basicCustomerCenterService: BasicCustomerCenterService;
  @CustomerOrderModule.Action showCustomerInfo;

  private columns: any;
  private dataSet: any = [];

  private model = {
    name: "",
    phoneNumber: "",
    idCard: ""
  };

  activated() {
    this.refreshData();
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
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => this.viewCustomerInfo(row.id)
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
                  click: () => this.followCustomer(row.id)
                }
              },
              "跟进"
            )
          ]);
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
        title: "性别",
        key: "customerSex",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) =>
          h("p", {}, this.$filter.dictConvert(row.customerSex))
      },
      {
        align: "center",
        title: "证件号码",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        align: "center",
        title: "客户电话",
        key: "customerPhone",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        title: "意向类型",
        key: "intentionType",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) =>
          h("p", {}, this.$filter.dictConvert(row.intentionType))
      },
      {
        align: "center",
        title: "意向等级",
        key: "intentionLevel",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) =>
          h("Rate", { props: { value: row.intentionLevel, disabled: true } })
      },
      {
        align: "center",
        title: "跟进结果",
        key: "followResult",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) =>
          h("p", {}, this.$filter.dictConvert(row.followResult))
      }
    ];
  }

  /**
   * 查看客户详情
   */
  private viewCustomerInfo(id) {
    this.showCustomerInfo({ id, enabledEdit: true });
  }

  /**
   * 跟进
   */
  followCustomer(customerId) {
    this.$dialog.show({
      title: "意向记录",
      width: 1050,
      render: h =>
        h(CustomerInfoIntentionRecord, {
          props: {
            id: customerId,
            modifyRecord: true
          }
        })
    });
  }

  /**
   * 获取意向客户列表
   */
  private refreshData() {
    this.basicCustomerCenterService
      .findPotentialCustomerList(this.model, this.pageService)
      .subscribe(
        data => (this.dataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  private onCreatePotentialClick() {
    this.$dialog.show({
      title: "新增意向客户",
      footer: true,
      width: 1050,
      onOk: addCustomerInfoBasedata => {
        return addCustomerInfoBasedata.submit().then(v => {
          if (v) this.refreshData();
          return !!v;
        });
      },
      render: h => h(ModifyCustomerInfoBasedata)
    });
  }
}
</script>


<style lang="less" scoped>
</style>
