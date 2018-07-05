<!--订单记录-->
<template>
  <section class="component customer-info-order-record">
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { namespace } from "vuex-class";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerCenterService } from "~/services/manage-service/basic-customer-center.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({})
export default class CustomerInfoOrderRecord extends Vue {
  @Dependencies(BasicCustomerCenterService) private basicCustomerCenterService: BasicCustomerCenterService;
  @Prop() id: Number;
  @CustomerOrderModule.Action showOrderInfo;

  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        title: "操作",
         width: this.$common.getOperateWidth(1),
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
                  click: () => this.showOrderInfo(row.orderId)
                }
              },
              "查看详情")
          ])
        }
      },
      {
        align: "center",
        title: "订单号",
        key: "orderNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: '订单金额',
        key: 'orderPrice',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.toThousands(row.orderPrice))
      },
      {
        align: "center",
        title: "订单类型",
        key: 'orderType',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderType))
      },
      {
        align: "center",
        title: '还款方式',
        key: 'orderRepayType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderRepayType))
      }, {
        align: "center",
        title: '操作时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.operatorTime))
      }]

  }

  mounted() {
    this.basicCustomerCenterService.findBasicCustomerOrderList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }


}
</script>
<style lang="less" scoped>
</style>
