<!-- 押品评估-->
<template>
  <section class="page assessment">
    <page-header title="押品评估" hidden-print hidden-export></page-header>
    <data-form hidden-date-search :model="queryParamsModel" @on-search="refreshCustomerAssessmentCar">
      <template slot="input">
        <i-form-item prop="carNo" label="车牌号：">
          <i-input placeholder="请输入车牌号" v-model="queryParamsModel.carNo"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="客户姓名：">
          <i-input placeholder="请输入客户姓名" v-model="queryParamsModel.customerName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="customerAssessmentCarColumns" :data="customerAssessmentCarDataSet" @on-page-change="refreshCustomerAssessmentCar" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import ModifyCustomerAssessment from "~/components/finance-detain/modify-customer-assessment.vue";
import AssessmentReportList from "~/components/finance-detain/assessment-report-list.vue";
import { Layout } from "~/core/decorator";
import { namespace } from "vuex-class";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {}
})
export default class Assessment extends Page {
  @Dependencies(BasicCustomerAssessmentCarService)
  basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;
  @Dependencies(PageService) private pageService: PageService;

  private customerAssessmentCarColumns: any;
  private customerAssessmentCarDataSet: Array<any> = [];

  private queryParamsModel = {
    carNo: "",
    customerName: ""
  };

  created() {
    this.customerAssessmentCarColumns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(1),
        align: "center",
        render: (h, { row, column, index }) => {
          //评估状态[10021] 10062 : 待评估 ; 10061 : 已评估
          if (!row.assessmentStatus || row.assessmentStatus == 10062) {
            return h(
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
                    this.onModifyCustomerAssessment(row);
                  }
                }
              },
              "评估"
            );
          } else {
            return h(
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
                    this.onGetAssessmentReportList(row.carId);
                  }
                }
              },
              "详情"
            );
          }
        }
      },

      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "评估编号",
        key: "assessmentNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      
      {
        align: "center",
        editable: true,
        title: "车辆编号",
        key: "carNo",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "申请评估日期",
        key: "assessmentApplyDate",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h(
            "span",
            {},
            this.$filter.dateFormat(row.assessmentApplyDate)
          )
      },
      {
        align: "center",
        editable: true,
        title: "评估日期",
        key: "assessmentDate",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h(
            "span",
            {},
            this.$filter.dateFormat(row.assessmentDate)
          )
      },
      {
        align: "center",
        editable: true,
        title: "评估结果",
        key: "assessmentResult",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        editable: true,
        title: "评估状态",
        key: "assessmentStatus",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) =>
          h("p", {}, row.assessmentStatus?this.$filter.dictConvert(row.assessmentStatus):"待评估")
      }
    ];
  }

  mounted() {
    // 加载数据
    this.refreshCustomerAssessmentCar();
  }

  /**
   * keep-alive生命周期钩子函数
   */
  activated() {
    // 加载数据
    this.refreshCustomerAssessmentCar();
  }

  /**
   * 刷新列表
   */
  refreshCustomerAssessmentCar() {
    this.basicCustomerAssessmentCarService
      .findCustomerAssessmentList(this.queryParamsModel, this.pageService)
      .subscribe(
        data => (this.customerAssessmentCarDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 评估
   * @param val
   */
  onModifyCustomerAssessment(val?: any) {
    this.$dialog.show({
      title: "评估",
      width: 800,
      footer: true,
      onOk: modifyCustomerAssessment => {
        return modifyCustomerAssessment.submit().then(v => {
          if (v) this.refreshCustomerAssessmentCar();
          return v;
        });
      },
      render: h =>
        h(ModifyCustomerAssessment, {
          props: {
            customerId: val.customerId,
            carId: val.carId,
            assessmentReportId: val.assessmentReportId
          }
        })
    });
  }

  /**
   * 查看评估列表
   * @param carId 车辆Id
   */
  onGetAssessmentReportList(carId: number) {
    this.$dialog.show({
      title: "评估列表",
      isView: true,
      width: 1000,
      footer: true,
      render: h =>
        h(AssessmentReportList, {
          props: {
            carId: carId
          }
        })
    });
  }
}
</script>

<style lang="less" scoped>
</style>
