<!-- 评估详情 -->
<template>
  <section class="component assessment-feport-details">
    <i-card title="客户信息" style="margin-bottom:20px;">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="客户编号" :span="6">{{assessmentReportInfo.customerCode}}</data-grid-item>
        <data-grid-item label="客户姓名" :span="6">{{assessmentReportInfo.customerName }}</data-grid-item>
        <data-grid-item label="客户状态" :span="6">{{assessmentReportInfo.customerStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="客户性别" :span="6">{{assessmentReportInfo.customerSex | dictConvert}}</data-grid-item>
      </data-grid>
    </i-card>
    <i-card title="车辆信息" style="margin-bottom:20px;">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="车牌号" :span="6">{{assessmentReportInfo.carNo}}</data-grid-item>
        <data-grid-item label="购车价格" :span="6">{{assessmentReportInfo.carPrice | toThousands }}</data-grid-item>
        <data-grid-item label="车辆型号" :span="6">{{assessmentReportInfo.carType | dictConvert}}</data-grid-item>
        <data-grid-item label="是否二手车" :span="6">{{assessmentReportInfo.isSecondHand | dictConvert}}</data-grid-item>
        <data-grid-item label="初次登记日期" :span="6">{{assessmentReportInfo.registerTime | dateFormat("yyyy-MM-dd")}}</data-grid-item>
        <data-grid-item label="抵押登记次数" :span="6">{{assessmentReportInfo.mortgageNum}}</data-grid-item>
        <data-grid-item label="购买方式" :span="6">{{assessmentReportInfo.buyType | dictConvert}}</data-grid-item>
        <data-grid-item label="是否贷款已还清" :span="6">{{assessmentReportInfo.isLoanFinished | dictConvert}}</data-grid-item>
        <data-grid-item label="车辆状态" :span="6">{{assessmentReportInfo.carStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="出厂日期" :span="6">{{assessmentReportInfo.factoryTime | dateFormat("yyyy-MM-dd")}}</data-grid-item>
        <data-grid-item label="行驶里程" :span="6">{{assessmentReportInfo.mileAge}}</data-grid-item>
        <data-grid-item label="行驶证号" :span="6">{{assessmentReportInfo.drivingNo}}</data-grid-item>
        <data-grid-item label="过户次数" :span="6">{{assessmentReportInfo.transferNo}}</data-grid-item>
        <data-grid-item label="车辆用途" :span="6">{{assessmentReportInfo.carPurpose}}</data-grid-item>
        <data-grid-item label="变速箱形式" :span="6">{{assessmentReportInfo.transmission}}</data-grid-item>
        <data-grid-item label="驱动形式" :span="6">{{assessmentReportInfo.driver | dictConvert}}</data-grid-item>
        <data-grid-item label="排量" :span="6">{{assessmentReportInfo.displacement}}</data-grid-item>
      </data-grid>
    </i-card>
    <i-card title="评估信息">
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="车况" :span="6">{{assessmentReportInfo.carSituation}}</data-grid-item>
        <data-grid-item label="估价" :span="6">{{assessmentReportInfo.evaluation}}</data-grid-item>
        <data-grid-item label="备注" :span="12">{{assessmentReportInfo.remark}}</data-grid-item>
      </data-grid>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AssessmentReportDetails extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService)
  private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;

  @Prop({
    default: 0,
    type: Number
  })
  assessmentReportId: number;

  private assessmentReportInfo: any = {};

  mounted() {
    if (this.assessmentReportId) {
      this.basicCustomerAssessmentCarService
        .findAssessmentReportInfo(this.assessmentReportId)
        .subscribe(
          data => (this.assessmentReportInfo = data),
          err => this.$Message.error(err.msg)
        );
    }
  }
}
</script>

<style lang="less">
</style>