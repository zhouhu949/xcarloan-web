<!--客户信息列表-->
<template>
  <section class="component order-info-customer-list">
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { namespace } from "vuex-class";

const CustomerOrderModule = namespace("customerOrderSpace");

@Component({})
export default class OrderInfoCustomerList extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @Prop() id: Number;
  @CustomerOrderModule.Action showCustomerInfo;
  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        align: "center",
        title: "操作",
        width: 90,
        render: (h, { row }) => h('div', {}, [
          h("i-button", {
            props: {
              type: "text"
            },
            style: {
              color: "#265EA2"
            },
            on: {
              click: () => this.showCustomerInfo(row.id)
            }
          }, "查看详情")
        ])
      },
      {
        align: "center",
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: '联系电话',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: '客户性别',
        key: 'customerSex',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.customerSex))
      },
      {
        align: "center",
        title: '身份证号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        title: '客户状态',
        key: 'customerStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.customerStatus))
      }, {
        align: "center",
        title: '创建时间',
        key: 'createTime',
        sortable: true,
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.createTime))
      }
    ]
  }

  mounted() {
    this.basicCustomerOrderService.getCustomerInfoByOrderId(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
</style>
