<template>
  <section class="page sign-contract">
    <page-header title="客户签约" hidden-print hidden-export>
    </page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshCustomerSign">
      <template slot="input">
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="customerSignColumns" :data="customerSignDataSet" @onPageChange="refreshCustomerSign" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import { Layout } from "~/core/decorator";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import ContractUpload from "~/components/customer-center/contract-upload.vue";
import { PageService } from "~/utils/page.service";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class SignContract extends Page {
  @Dependencies(BasicCustomerService)
  basicCustomerService: BasicCustomerService;
  @Dependencies(PageService) pageService: PageService;

  private customerSignColumns: any = [];
  private customerSignDataSet: Array<Object> = [];

  private queryParamsModel = {
    customerName: ""
  };

  created() {
    this.customerSignColumns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 160,
        align: "center",
        fixed: "left",
        render: (h, { row, column, index }) => {
          // 开户状态 10093 : 已开户 ; 10094 : 未开户
          if (row.fileCount <= 0) {
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
                      this.uploadContractOperate(row);
                    }
                  }
                },
                "上传合同"
              )
            ]);
          } else {
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
                      this.showUploadContract(row);
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
        title: "订单编号",
        key: "orderNo",
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
    this.refreshCustomerSign();
  }
  
  /**
   * keep-alive生命周期钩子函数
   */
  activated(){
    // 加载列表数据
    this.refreshCustomerSign();
  }

  /**
   * 刷新列表
   */
  refreshCustomerSign() {
    this.basicCustomerService
      .getCustomerSignList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.customerSignDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 上传合同
   */
  uploadContractOperate(data) {
    let dialog = this.$dialog.show({
      title: "上传合同",
      okText: "确认签约",
      footer: true,
      onOk: contractUpload => {
        return contractUpload
          .submit()
          .then(v => {
            if (v) this.refreshCustomerSign();
            return v;
          })
          .catch(err => {
            this.$Message.error(err.msg);
          });
      },
      render: h => {
        return h(ContractUpload, {
          props: {
            fileNumberLimit: 1000,
            orderId: data.orderId
          }
        });
      }
    });
  }

  /**
   * 查看合同
   */
  showUploadContract(data) {
    let dialog = this.$dialog.show({
      title: "查看合同",
      isView: true,
      footer: true,
      onOk: contractUpload => {
        return contractUpload
          .submit()
          .then(v => {
            if (v) this.refreshCustomerSign();
            return v;
          })
          .catch(err => {
            this.$Message.error(err.msg);
          });
      },
      render: h => {
        return h(ContractUpload, {
          props: {
            orderId: data.orderId,
            isView: true
          }
        });
      }
    });
  }
}
</script>

<style lang="less" scoped>
</style>
