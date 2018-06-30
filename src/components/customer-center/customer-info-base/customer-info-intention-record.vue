<!--意向记录-->
<template>
  <section class="component customer-info-intention-record">
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";
import { namespace } from "vuex-class";
import CustomerInfoFollowRecord from "~/components/customer-center/customer-info-base/customer-info-follow-record.vue"
import ModifyCustomerInfoFollow from "~/components/customer-center/customer-info-base/modify-customer-info-follow.vue"

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({})
export default class CustomerInfoIntentionRecord extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number;
  @CustomerOrderModule.Action showOrderInfo;
  // 是否可新增跟进记录
  @Prop() modifyRecord;

  private dataSet: Array<any> = [];
  private columns: Array<any> = [];

  created() {
    
    this.columns = [
      {
        title: "操作",
        width: 100,
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
                  click: () => this.modifyRecord ? this.addFollowRecord(row.id) : this.checkFollowRecord(row.id)
                }
              },
              this.modifyRecord ? "新增跟进记录" : "查看跟进记录"
            )
          ])
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
        render: (h, { row }) => h('Rate', { props: { value: row.intentionLevel, disabled: true} })
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
          if(v) this.refreshData()
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
}
</script>
<style lang="less" scoped>
</style>
