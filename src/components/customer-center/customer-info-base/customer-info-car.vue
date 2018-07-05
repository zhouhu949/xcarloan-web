<!--车辆信息-->
<template>
  <section class="component customer-info-car">

    <div class="no-data-notice" v-if="dataSet.length === 0" key="no-data">
      暂无数据
    </div>
    <i-card class="car" v-for="item of dataSet" :key="item.id" v-else :title="item.carNo">
      <div slot="extra" v-if="edit">
        <a @click="onDeleteClick(item)">
          <svg-icon iconClass="delete-bold"></svg-icon>
          删除
        </a>
        <a @click="onModifyClick(item)" style="margin-left: 20px;">
          <svg-icon iconClass="tianxie"></svg-icon>
          修改
        </a>
      </div>
      <data-grid class="car-info" :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="车牌号" :span="4">{{item.carNo}}</data-grid-item>
        <data-grid-item label="购车价格" :span="4">{{item.carPrice | toThousands}}</data-grid-item>
        <data-grid-item label="是否二手车" :span="4">{{item.isSecondHand | dictConvert}}</data-grid-item>
        <data-grid-item label="购买方式" :span="4">{{item.buyType | dictConvert}}</data-grid-item>
        <data-grid-item label="抵押状态" :span="4">{{item.carStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="抵押登记次数" :span="4">{{item.mortgageNum}}</data-grid-item>
        <data-grid-item label="备注" :span="12">{{item.remark}}</data-grid-item>
      </data-grid>
    </i-card>

    <div class="add-customer-info" v-if="edit" key="edit">
      <a @click="onAddCarInfo">
        <svg-icon iconClass="add"></svg-icon>
        新增车产信息
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import ModifyCustomerInfoCar from "./modify-customer-info-car.vue";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoCar extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService) private basicCustomerAssessmentCarSerivce: BasicCustomerAssessmentCarService;
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean

  private dataSet: Array<any> = []

  mounted() {
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.basicCustomerAssessmentCarSerivce.getBasicCustomerCarList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
  /**
   * 新增车产信息
   */
  private onAddCarInfo() {
    this.$dialog.show({
      title: '新增车产信息',
      footer: true,
      width: 700,
      onOk: addCustomerInfoCar => {
        return addCustomerInfoCar.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoCar, {
        props: {
          customerId: this.id
        }
      })
    })
  }
  /**
   * 修改车产信息
   */
  private onModifyClick(carInfo) {
    carInfo.customerId = this.id
    let tmpData = Object.assign({}, carInfo)
    this.$dialog.show({
      title: "修改车产信息",
      footer: true,
      width: 700,
      onOk: modifyCustomerInfoCar => {
        return modifyCustomerInfoCar.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      onCancel: () => {
        this.refreshData()
      },
      render: h => h(ModifyCustomerInfoCar, {
        props: {
          data: tmpData
        }
      })
    })
  }
  /**
   * 删除车产信息
   */
  onDeleteClick(carInfo) {
    this.$Modal.confirm({
      title: '提示',
      content: `确定删除车牌号为<b>${carInfo.carNo}</b>的车产信息吗？`,
      onOk: () => {
        this.basicCustomerAssessmentCarSerivce.deleteBasicCustomerCar(carInfo.id)
          .subscribe(val => {
            this.$Message.success(`删除车牌号为<b>${carInfo.carNo}</b>的车产信息成功！`)
            this.refreshData()
          },
            err => this.$Message.error(err.msg)
          )
      }
    })
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-car {
  .car {
    margin-bottom: 20px;
  }
}
</style>
