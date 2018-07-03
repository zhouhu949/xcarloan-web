<!--意向记录-->
<template>
  <section class="component customer-info-intention-record">
    <div class="add-intention" v-if="!edit">
      <a @click="addIntentionRecord">
        <svg-icon iconClass="tianxie"></svg-icon>
        新增意向记录
      </a>
    </div>
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Vue from 'vue';
import Component from 'vue-class-component'
import CustomerInfoFollowRecord from "~/components/customer-center/customer-info-base/customer-info-follow-record.vue"
import ModifyCustomerInfoFollow from "~/components/customer-center/customer-info-base/modify-customer-info-follow.vue"
import ModifyCustomerInfoIntention from "~/components/customer-center/customer-info-base/modify-customer-info-intention.vue"
import { Button } from "iview";
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({})
export default class CustomerInfoIntentionRecord extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number;
  @CustomerOrderModule.Action showOrderInfo;

  // 是否可编辑
  @Prop() edit;

  private dataSet: Array<any> = [];
  private columns: Array<any> = [];

  created() {

    this.columns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(2),
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          let arrayButton = [(<i-button type="text" class="row-command-button" onClick={() => this.checkFollowRecord(row.id)}>查看跟进记录</i-button>)]
          if (!this.edit) {
            arrayButton.unshift((<i-button type="text" class="row-command-button" onClick={() => this.addFollowRecord(row.id)}>新增跟进记录</i-button>))
          }
          return h('div', {}, arrayButton)
        }
      },
      {
        align: "center",
        title: "意向类型",
        key: "intentionType",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.intentionType))
      },
      {
        align: "center",
        title: '意向状态',
        key: 'intentionStatus',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.intentionStatus))
      },
      {
        align: "center",
        title: "意向等级",
        key: 'intentionLevel',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('Rate', { props: { value: row.intentionLevel, disabled: true } })
      },
      {
        align: "center",
        title: '备注',
        key: 'remark',
        minWidth: this.$common.getColumnWidth(4)
      }, {
        align: "center",
        title: '操作时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.operatorTime))
      }]

  }

  mounted() {
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  refreshData() {
    this.basicCustomerService.findCustomerIntentionList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 查看跟进记录
   */
  checkFollowRecord(intentionId) {
    this.$dialog.show({
      title: '查看跟进记录',
      width: 700,
      render: h => h(CustomerInfoFollowRecord, {
        props: {
          intentionId: intentionId
        }
      })
    })
  }

  /**
   * 新增跟进记录
   */
  addFollowRecord(intentionId) {
    this.$dialog.show({
      title: "新增跟进记录",
      footer: true,
      width: 700,
      onOk: add => {
        return add.addFollowRecord().then(v => {
          if (v) this.refreshData()
          return v
        })
      },
      render: h => h(ModifyCustomerInfoFollow, {
        props: {
          intentionId: intentionId
        }
      })
    })
  }

  /**
   * 新增意向记录
   */
  addIntentionRecord() {
    this.$dialog.show({
      title: "新增意向记录",
      footer: true,
      width: 700,
      onOk: add => {
        return add.addFollowRecord().then(v => {
          if (v) this.refreshData()
          return v
        })
      },
      render: h => h(ModifyCustomerInfoIntention, {
        props: {
          customerId: this.id
        }
      })
    })
  }
}
</script>
<style lang="less" scoped>
.component.customer-info-intention-record {
  .add-intention {
    text-align: right;
    margin: 10px 30px 0px auto;
  }
}
</style>
