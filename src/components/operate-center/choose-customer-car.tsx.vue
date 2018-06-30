<!--选择客户抵押车辆-->
<template>
  <section class="component choose-customer-car">
    <data-box :show-config-column="false" :height="400" :columns="columns" :data="dataSet" ref="databox" @on-selection-change="onSelectionChange"></data-box>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { PageService } from "~/utils/page.service";
import CarParams from "~/components/base-data/car-params.vue";
import { Button } from "iview";

@Component({
  components: {}
})
export default class ChooseCustomerCar extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService) private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;
  // 选中的车辆ID
  @Prop() carIds: Array<Number>;
  @Prop() customerId: Number;
  @Watch('customerId')
  onCustomerIdChange(val) {
    if (!val) return
    this.refreshData()
  }

  /**
   * 当前选中行的数据
   */
  public selectData: {
    carIds: Array<Number>,
    carsName: String
  } = null;

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        align: "center",
        type: "selection",
        width: 60
      },
      {
        align: "center",
        title: "车牌号",
        key: "carNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "购买方式",
        key: 'buyType',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<p>{this.$filter.dictConvert(row.buyType)}</p>)
      },
      {
        align: "center",
        title: "购车价格",
        key: 'carPrice',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<div class="col-decimal">{this.$filter.toThousands(row.carPrice)}</div>)
      },
      {
        align: "center",
        title: "是否二手车",
        key: 'isSecondHand',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<p>{this.$filter.dictConvert(row.isSecondHand)}</p>)
      },
      {
        align: "center",
        title: "初次登记时间",
        key: 'registerTime',
        render: (h, { row }) => (<p>{this.$filter.dateFormat(row.registerTime, "yyyy-MM-dd")}</p>)
      }
    ]
  }

  /**
   * 勾选的车辆发生改变
   */
  private onSelectionChange(selection: Array<any>) {
    this.selectData = {
      carIds: selection.map(v => v.id),
      carsName: selection.map(v => v.carNo).join(';')
    }
  }

  /**
   * 更新数据
   */
  private refreshData() {
    this.basicCustomerAssessmentCarService.getCustomerCarList(this.customerId).subscribe(
      data => {
        data.forEach(v => { v._checked = this.carIds && this.carIds.includes(v.id) })
        this.dataSet = data
      },
      err => this.$Message.error(err.msg)
    )
  }
}
</script>

<style lang="less">
.component.choose-vehicle-model {
  .money-align {
    text-align: right;
    padding-right: 5%;
  }
}
</style>
