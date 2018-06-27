<template>
  <section class="page order-review">
    <data-form hidden-date-search :model="model" @on-search="refreshData" :page="pageService">
      <template slot="input">
        <i-form-item prop="name" label="姓名">
          <i-input v-model="model.name" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="orderNo" label="订单号">
          <i-input v-model="model.orderNo" placeholder="请输入订单号"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input v-model="model.idCard" placeholder="请输入身份证号"></i-input>
        </i-form-item>
        <i-form-item prop="phone" label="联系方式">
          <i-input v-model="model.phone" placeholder="请输入联系方式"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns" :data="dataSet" @onPageChange="refreshData" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout, Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { PageService } from "~/utils/page.service";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";
import { namespace } from "vuex-class";
import OrderCustomerInfo from "~/components/base-data/order-customer-info.vue";

const CustomerOrderModule = namespace("customerOrderSpace")

@Layout('workspace')
@Component({
  components: {}
})
export default class OrderReview extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  @CustomerOrderModule.Action showOrderInfo;

  private model: any = {
    name: "",
    orderNo: "",
    idCard: "",
    phone: ""
  };

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          return h('div', [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.showOrderInfo(row.orderId)
                    this.$dialog.show({
                      width: 1050,
                      render: h => h(OrderCustomerInfo)
                    })
                  }
                }
              },
              '查看详情'
            )
          ])
        }
      },
      {
        align: 'center',
        title: ' 订单号',
        key: 'orderNo',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 订单状态',
        key: 'orderStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.orderStatus))
      },
      {
        align: 'center',
        title: ' 订单期数',
        key: 'orderPeriods',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 订单金额',
        key: 'orderPrice',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 客户姓名',
        key: 'customerName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 电话号码',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: ' 身份证号',
        key: 'idCard',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }

  mounted() {
    this.refreshData()
  }

  private refreshData() {
    this.basicCustomerOrderService.query(this.model, this.pageService).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>


<style lang="less" scoped>
</style>
