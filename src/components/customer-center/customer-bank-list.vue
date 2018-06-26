<!-- 客户银行卡列表 -->
<template>
  <section class="page">
    <data-box :height="300" :columns="cutomerBankColumns" :data="cutomerBankDataSet" :highlightRow="true" @on-current-change="onCurrentCutomerBankChange" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { State, Getter, namespace } from "vuex-class";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";
import { BasicCustomerAccountService } from "~/services/manage-service/basic-customer-account.service";

@Component({})
export default class CutomerBankList extends Vue {
  @Dependencies(BasicCustomerService)
  private basicCustomerService: BasicCustomerService;
  @Dependencies(BasicCustomerAccountService)
  private basicCustomerAccountService: BasicCustomerAccountService;

  @Prop() customerId;
  @Prop({
    default: true
  })
  isView;

  mounted() {
    // 客户银行卡列表信息
    this.getCustomerBankInfo();
  }

  private currentCustomerBankRow: any;

  private cutomerBankColumns: any = [];
  private cutomerBankDataSet: Array<any> = [];

  created() {
    this.cutomerBankColumns = [
      {
        align: "center",
        editable: true,
        title: "卡号",
        key: "cardNo",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "银行",
        key: "bankName",
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

  /**
   * 获取客户银行卡信息
   */
  getCustomerBankInfo() {
    this.basicCustomerService.findCustomerBankInfo(this.customerId).subscribe(
      data => {
        this.cutomerBankDataSet = data.map(v =>
          // 10093:已开户;10094:未开户
          Object.assign({ _highlight: v.accountStatus === 10093 }, v)
        );
      },
      err => this.$Message.error(err.msg)
    );
  }

  /**
   * 选中行改变触发事件
   */
  onCurrentCutomerBankChange(currentRow, oldRow) {
    this.currentCustomerBankRow = currentRow;
  }

  /**
   * 开户操作
   */
  submit() {
    return new Promise((resolve, reject) => {
      if (!this.currentCustomerBankRow) return resolve(false);

      this.basicCustomerAccountService
        .customerOpenAccount(this.currentCustomerBankRow)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }
}
</script>
<style lang="less">
</style>