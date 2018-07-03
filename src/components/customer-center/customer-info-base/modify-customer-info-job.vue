<!--维护职业信息-->
<template>
  <section class="component modify-customer-info-job">
    <i-form ref="form" inline :model="model" :rules="rules" :label-width="140">
      <i-form-item label="单位名称" prop="companyName">
        <i-input v-model="model.companyName"></i-input>
      </i-form-item>
      <i-form-item label="单位性质" prop="companyNature">
        <i-select v-model="model.companyNature" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10053)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="所属行业" prop="industry">
        <i-select v-model="model.industry" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10055)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="职业类型" prop="jobType">
        <i-select v-model="model.jobType" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10054)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="基本月薪" prop="basicSalary">
        <i-input-number v-model="model.basicSalary" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
      <i-form-item label="单位地址" prop="companyAddress">
        <i-input v-model="model.companyAddress"></i-input>
      </i-form-item>
      <i-form-item label="单位详细地址" prop="companyAddressDetail">
        <i-input v-model="model.companyAddressDetail"></i-input>
      </i-form-item>
      <i-form-item label="入职时间" prop="accessCompanyTime">
        <i-date-picker v-model="model.accessCompanyTime" clearable></i-date-picker>
      </i-form-item>
      <i-form-item label="部门" prop="department">
        <i-input v-model="model.department"></i-input>
      </i-form-item>
      <i-form-item label="职务" prop="duty">
        <i-input v-model="model.duty"></i-input>
      </i-form-item>
      <i-form-item label="职级" prop="rank">
        <i-input v-model="model.rank"></i-input>
      </i-form-item>
      <i-form-item label="单位固定电话" prop="companyPhone">
        <i-input v-model="model.companyPhone"></i-input>
      </i-form-item>
      <i-form-item label="每月发薪日" prop="payDay">
        <i-input v-model="model.payDay"></i-input>
      </i-form-item>
      <i-form-item label="发薪方式" prop="payWay">
        <i-input v-model="model.payWay"></i-input>
      </i-form-item>
      <i-form-item label="单位省份" prop="province">
        <i-select placeholder="选择省" v-model="model.province" clearable>
          <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="单位城市" prop="city">
        <i-select placeholder="选择市" v-model="model.city" :disabled="!model.province" clearable>
          <i-option v-for="{value,label} in this.model.province ? this.$city.getCityData({ level: 1, id: this.model.province }) : []" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="注册资本" prop="registeredCapital">
        <i-input-number v-model="model.registeredCapital" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
      <i-form-item label="股占比(%)" prop="stockScale">
        <i-input-number v-model="model.stockScale" :min="0"></i-input-number>
      </i-form-item>
      <i-form-item label="员工人数" prop="employeesNumber">
        <i-input-number v-model="model.employeesNumber" :min="0"></i-input-number>
      </i-form-item>
      <i-form-item label="过去一年营业收入" prop="pastyearIncome">
        <i-input-number v-model="model.pastyearIncome" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
      <i-form-item label="过去一年利润" prop="pastyearProfit">
        <i-input-number v-model="model.pastyearProfit" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
      <i-form-item label="经营归属地" prop="enterpriseManageBelong">
        <i-input v-model="model.enterpriseManageBelong"></i-input>
      </i-form-item>
      <i-form-item label="企业经营年限" prop="enterpriseManageYears">
        <i-input v-model="model.enterpriseManageYears"></i-input>
      </i-form-item>
      <i-form-item label="身份" prop="identity">
        <i-input v-model="model.identity"></i-input>
      </i-form-item>
      <i-form-item label="每月其它收入" prop="monthOtherIncome">
        <i-input-number v-model="model.monthOtherIncome" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
      <i-form-item label="其它收入来源" prop="otherIncomeSource">
        <i-input v-model="model.otherIncomeSource"></i-input>
      </i-form-item>
      <i-form-item label="年收入" prop="yearlySalaries">
        <i-input-number v-model="model.yearlySalaries" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerJobService } from "~/services/manage-service/basic-customer-job.service";

@Component({})
export default class ModifyCustomerInfoJob extends Vue {
  @Dependencies(BasicCustomerJobService) private basicCustomerJobService: BasicCustomerJobService;
  // 客户ID
  @Prop() customerId: Number;
  // 维护数据
  @Prop() data;

  private model: any = null;
  private rules: any = null;


  created() {
    this.model = {
      companyName: '', // 单位名称
      companyNature: '', // 单位性质
      industry: '', // 所属行业
      jobType: '', // 职业类型
      basicSalary: 0, // 基本月薪
      companyAddress: '', // 单位地址
      companyAddressDetail: '', // 单位地址详细
      accessCompanyTime: '', // 入职时间
      department: '', // 部门
      duty: '', // 职务
      rank: '', // 职级
      payDay: '', // 每月发薪日
      payWay: '', // 发薪方式
      city: '', // 单位城市
      province: '', // 单位省份
      companyPhone: '', // 单位固定电话
      registeredCapital: 0, // 注册资本
      stockScale: 0, // 股占比
      employeesNumber: 0, // 员工人数
      pastyearIncome: 0, // 过去一年营业收入
      pastyearProfit: 0, // 过去一年利润
      enterpriseManageBelong: '', // 经营归属地
      enterpriseManageYears: '', // 企业经营年限
      identity: '', // 身份
      monthOtherIncome: 0, // 每月其它收入
      otherIncomeSource: '', // 其它收入来源
      yearlySalaries: 0 // 年收入
    }

    this.rules = {
      companyName: { required: true, message: "请填写单位名称", trigger: "blur" },
      companyNature: { required: true, message: "请选择单位性质", trigger: "blur", type: "number" },
      industry: { required: true, message: "请选择所属行业", trigger: "blur", type: "number" },
      jobType: { required: true, message: "请选择职业类型", trigger: "blur", type: "number" },
      basicSalary: { required: true, message: "请填写基本月薪", trigger: "blur", type: "number" },
      companyAddress: { required: true, message: "请填写单位地址", trigger: "blur" },
      companyAddressDetail: { required: true, message: "请填写单位地址详细", trigger: "blur" }
    }
  }

  mounted() {
    if (this.data) {
      this.data.accessCompanyTime = new Date(this.data.accessCompanyTime)
      this.model = this.data
    }
    if (this.customerId) this.model.customerId = this.customerId
  }

  /**
   * 新增职业信息
   */
  private addJob() {
    return new Promise((resolve, reject) => {
      this.basicCustomerJobService.addPersonalJob(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 修改职业信息
   */
  private modifyJob() {
    return new Promise((resolve, reject) => {
      this.basicCustomerJobService.updatePersonalJob(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  private submit() {
    let form: any = this.$refs.form
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve()
        let result = this.customerId ? this.addJob() : this.modifyJob()
        result.then(() => {
          this.$Message.success("操作成功")
          resolve(true)
        }).catch(e => {
          this.$Message.error(e.msg)
          resolve()
        })
      })
    })
  }
}
</script>
<style lang="less">
</style>
