<template>
  <section class="page sign-contract">
    <page-header title="客户开户" hidden-print hidden-export>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshOpenAccount">
      <template slot="input">
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="openAccountColumns" :data="openAccountDataSet" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import { Layout } from "~/core/decorator";
import Component from "vue-class-component";

@Layout("workspace")
@Component({
  components: {}
})
export default class SignContract extends Page {
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
                    // this.onOpenAccount(row);
                  }
                }
              },
              "上传合同"
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
                    // this.onOpenAccount(row);
                  }
                }
              },
              "查看"
            )
          ]);
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
        title: "客户类型",
        key: "customerType",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "教育程度",
        key: "education",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "居住状况",
        key: "homeStatus",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "是否接受勘查",
        key: "houseProspecting",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "身份证",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "身份证有效期类型",
        key: "idCardValidityPeriodType",
        minWidth: this.$common.getColumnWidth(4)
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
        title: "客户类别",
        key: "personalProfile",
        minWidth: this.$common.getColumnWidth(3)
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

    // 加载列表数据
    this.refreshOpenAccount();
  }

  /**
   * 刷新列表
   */
  refreshOpenAccount() {
    // this.basicCustomerService
      // .findAllCustomerList(this.queryParamsModel, this.pageService)
      // .subscribe(
        // data => (this.openAccountDataSet = data),
        // err => this.$Message.error(err.msg)
      // );
  }
}
</script>


<style lang="less" scoped>
</style>
