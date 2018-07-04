<!-- 客户银行卡列表 -->
<template>
  <section class="component assessment-report-list">
    <data-box :height="300" :columns="columns" :data="assessmentReportDataSet" :page="pageService" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AssessmentReportDetails from "~/components/finance-detain/assessment-report-details.vue";
import { Prop, Watch } from "vue-property-decorator";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { State, Getter, namespace } from "vuex-class";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { PageService } from "~/utils/page.service";

@Component({})
export default class AssessmentReportList extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerAssessmentCarService)
  private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;

  @Prop({
    default: 0,
    type: Number
  })
  carId: number;

  private columns: any = [];
  private assessmentReportDataSet: Array<any> = [];

  created() {
    this.columns = [
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 80,
        align: "center",
        render: (h, { row, column, index }) => {
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
                  this.onGetAssessmentReportInfo(row.carAssessmentId);
                }
              }
            },
            "评估详情"
          );
        }
      },

      {
        align: "center",
        editable: true,
        title: "客户编码",
        key: "customerCode",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        align: "center",
        editable: true,
        title: "客户性别",
        key: "customerSex",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.customerSex))
      },
      {
        align: "center",
        editable: true,
        title: "车牌号",
        key: "carNo",
        minWidth: this.$common.getColumnWidth(2)
      },
      {
        align: "center",
        editable: true,
        title: "购车价格(元)",
        key: "carPrice",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.toThousands(row.carPrice))
      },
      {
        align: "center",
        editable: true,
        title: "车辆型号",
        key: "carType",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.carType))
      },
      {
        align: "center",
        editable: true,
        title: "申请评估日期",
        key: "assessmentApplyDate",
        minWidth: this.$common.getColumnWidth(2),
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
        minWidth: this.$common.getColumnWidth(2),
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
        minWidth: this.$common.getColumnWidth(2)
      }
    ];
  }

  mounted() {
    // 查看评估报告详情
    this.findAssessmentReportList();
  }

  /**
   * 获取评估报告详情
   */
  findAssessmentReportList() {
    if (this.carId) {
      this.basicCustomerAssessmentCarService
        .findAssessmentReportList(this.carId, this.pageService)
        .subscribe(
          data => {
            this.assessmentReportDataSet = data;
          },
          err => this.$Message.error(err.msg)
        );
    }
  }

  /**
   * 获取评估详情
   * @param assessmentReportId 评估报告Id
   */
  onGetAssessmentReportInfo(assessmentReportId: number) {
    this.$dialog.show({
      title: "评估详情",
      isView: true,
      footer: true,
      render: h =>
        h(AssessmentReportDetails, {
          props: {
            assessmentReportId: assessmentReportId
          }
        })
    });
  }
}
</script>

<style lang="less">
</style>