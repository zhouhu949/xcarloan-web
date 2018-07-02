<!--职业信息-->
<template>
  <section class="component customer-info-job">
    <i-row :gutter="16">
      <i-col v-if="dataSet.length === 0">
        <div class="no-data-notice">
          暂无数据
        </div>
      </i-col>
      <i-col class="col-job" v-for="item of dataSet" :key="item.id" :span="24" v-else>
        <i-card class="job" :title="item.companyName">
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
          <data-grid class="job-info" :labelWidth="120" labelAlign="right" contentAlign="left">
            <data-grid-item label="单位名称 " :span="4">{{item.companyName }}</data-grid-item>
            <data-grid-item label="单位性质" :span="4">{{item.companyNature | dictConvert}}</data-grid-item>
            <data-grid-item label="所属行业" :span="4">{{item.industry | dictConvert}}</data-grid-item>
            <data-grid-item label="职业类型" :span="4">{{item.jobType | dictConvert}}</data-grid-item>
            <data-grid-item label="基本月薪" :span="4">{{item.basicSalary | toThousands}}</data-grid-item>
            <data-grid-item label="职级 " :span="4">{{item.rank}}</data-grid-item>
            <data-grid-item label="入职时间" :span="4">{{item.accessCompanyTime | dateFormat("yyyy-MM-dd")}}</data-grid-item>
            <data-grid-item label="注册资本" :span="4">{{item.registeredCapital | toThousands}}</data-grid-item>
            <data-grid-item label="员工人数" :span="4">{{item.employeesNumber }}</data-grid-item>
            <data-grid-item label="经营归属地" :span="4">{{item.enterpriseManageBelong }}</data-grid-item>
            <data-grid-item label="企业经营年限" :span="4">{{item.enterpriseManageYears }}</data-grid-item>
            <data-grid-item label="每月发薪日" :span="4">{{item.payDay}}</data-grid-item>
            <data-grid-item label="发薪方式" :span="4">{{item.payWay}}</data-grid-item>
            <data-grid-item label="单位地址" :span="4">{{item.companyAddress}}</data-grid-item>
            <data-grid-item label="单位地址详细" :span="4">{{item.companyAddressDetail }}</data-grid-item>
            <data-grid-item label="备注" :span="12">{{item.remark}}</data-grid-item>
          </data-grid>
        </i-card>
      </i-col>
    </i-row>
    <div class="add-customer-info" v-if="edit">
      <a @click="onAddJobInfo">
        <svg-icon iconClass="add"></svg-icon>
        新增职业信息
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerJobService } from "~/services/manage-service/basic-customer-job.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import ModifyCustomerInfoJob from "./modify-customer-info-job.vue";


@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class CustomerInfoJob extends Vue {
  @Dependencies(BasicCustomerJobService) private basicCustomerJobService: BasicCustomerJobService;
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean

  private dataSet: Array<any> = [];

  mounted() {
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.basicCustomerJobService.findCustomPersonalJob(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
  /**
   * 新增职业信息
   */
  private onAddJobInfo() {
    this.$dialog.show({
      title: '新增职业信息',
      footer: true,
      width: 700,
      onOk: addCustomerInfoJob => {
        return addCustomerInfoJob.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoJob, {
        props: {
          customerId: this.id
        }
      })
    })
  }
  /**
   * 修改职业信息
   */
  private onModifyClick(jobInfo) {
    jobInfo.customerId = this.id
    this.$dialog.show({
      title: "修改职业信息",
      footer: true,
      width: 700,
      onOk: modifyCustomerInfoJob => {
        return modifyCustomerInfoJob.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      onCancel: () => {
        this.refreshData()
      },
      render: h => h(ModifyCustomerInfoJob, {
        props: {
          data: jobInfo
        }
      })
    })
  }
  /**
  * 删除职业信息
  */
  onDeleteClick(jobInfo) {
    this.$Modal.confirm({
      title: '提示',
      content: `确定删除该职业信息吗？`,
      onOk: () => {
        this.basicCustomerJobService.deletePersonalJob(jobInfo.id)
          .subscribe(val => {
            this.$Message.success(`删除成功！`)
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
.component.customer-info-job {
  .job {
    margin-bottom: 20px;
  }
}
</style>
