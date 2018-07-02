<template>
  <section class="page open-account">
    <page-header title="客户开户" hidden-print hidden-export>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshOpenAccount">
      <template slot="input">
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="20" :columns="openAccountColumns" :data="openAccountDataSet" @on-page-change="refreshOpenAccount" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import CustomerBankList from "~/components/customer-center/customer-bank-list.vue";
import { Form, Model } from "iview";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";
import { BasicCustomerAccountService } from "~/services/manage-service/basic-customer-account.service";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class OpenAccount extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerService)
  private basicCustomerService: BasicCustomerService;
  @Dependencies(BasicCustomerAccountService)
  private basicCustomerAccountService: BasicCustomerAccountService;

  private openAccountColumns: any = [];
  private openAccountDataSet: Array<Object> = [];

  private queryParamsModel = {
    customerName: ""
  };

  created() {
    this.openAccountColumns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 80,
        align: "center",
        fixed: "left",
        render: (h, { row, column, index }) => {
          //10093:已开户；10094:未开户
          if (row.accountStatus === 10094) {
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
                      this.onOpenAccount(row);
                    }
                  }
                },
                "开户"
              )
            ]);
          } else if (row.accountStatus === 10093) {
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
                      this.onOpenAccount(row);
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
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "客户电话",
        key: "customerPhone",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "客户状态",
        key: "customerStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.customerStatus))
      },
      {
        align: "center",
        editable: true,
        title: "教育程度",
        key: "education",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.education))
      },
      {
        align: "center",
        editable: true,
        title: "居住状况",
        key: "homeStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.homeStatus))
      },
      {
        align: "center",
        editable: true,
        title: "是否接受勘查",
        key: "houseProspecting",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.houseProspecting))
      },
      {
        align: "center",
        editable: true,
        title: "身份证",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "身份证有效期类型",
        key: "idCardValidityPeriodType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.idCardValidityPeriodType))
      },
      {
        align: "center",
        editable: true,
        title: "现居住地址",
        key: "localHomeAddr",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "通讯地址",
        key: "messageAddr",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "开户状态",
        key: "accountStatus",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.accountStatus))
      }
    ];
  }

  mounted() {
    // 加载列表数据
    this.refreshOpenAccount();
  }
  
  /**
   * keep-alive生命周期钩子函数
   */
  activated(){
    // 加载列表数据
    this.refreshOpenAccount();
  }

  /**
   * 刷新列表
   */
  refreshOpenAccount() {
    this.basicCustomerService
      .findAllCustomerList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.openAccountDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 开户
   * @param data
   */
  onOpenAccount(data) {
    this.$dialog.show({
      title: "开户",
      okText: "开户",
      footer: true,
      isView: data.accountStatus === 10093,
      onOk: customerBankList => {
        return customerBankList
          .submit()
          .then(v => {
            if (v) this.refreshOpenAccount();
            else this.$Message.warning("请选择一行数据！");
            return v;
          })
          .catch(err => {
            this.$Message.error(err.msg);
          });
      },
      render: h =>
        h(CustomerBankList, {
          props: {
            customerId: data.id,
            // 未开户
            isView: data.accountStatus === 10093
          }
        })
    });
  }
}
</script>

<style lang="less" scoped>
</style>
