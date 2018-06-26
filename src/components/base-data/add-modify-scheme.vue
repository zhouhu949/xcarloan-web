<!--新增或修改还款方案-->
<template>
  <section class="component add-modify-scheme">
    <i-form :label-width="100" :model="model" class="repay-scheme-form" :rules="rules" ref="repay-scheme-form">
      <i-row>
        <i-col :span="12">
          <i-form-item label="方案名称" prop="schemeName">
            <i-input v-model="model.schemeName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="方案类型" prop="schemeType">
            <i-select v-model="model.schemeType">
              <i-option v-for="{value,label} in $dict.getDictData(10015)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="征信保护天数" prop="creditDays">
            <i-input-number v-model="model.creditDays" :min="0"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="还款方式" prop="repayType">
            <i-select v-model="model.repayType">
              <i-option v-for="{value,label} in $dict.getDictData(10016)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="逾期保护天数" prop="overdueDays">
            <i-input-number v-model="model.overdueDays" :min="0"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="抵押方式" prop="mortgageType">
            <i-select v-model="model.mortgageType">
              <i-option v-for="{value,label} in $dict.getDictData(10017)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="期数" prop="periods">
            <i-input-number v-model="model.periods" :min="0"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="周期类型" prop="cycleType">
            <i-select v-model="model.cycleType">
              <i-option v-for="{value,label} in $dict.getDictData(10019)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="融资最小金额" prop="moneyMin">
            <i-input-number v-model="model.moneyMin" :min="0"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="账期类型" prop="accountPeriodType">
            <i-select v-model="model.accountPeriodType">
              <i-option v-for="{value,label} in $dict.getDictData(10020)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="融资最大金额" prop="moneyMax">
            <i-input-number v-model="model.moneyMax" :min="0"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="还款日" prop="accountDay">
            <i-select v-model="model.accountDay">
              <i-option v-for="val in accountDay" :key="val" :label="val" :value="val"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="利率" prop="interestRate">
            <i-input-number v-model="model.interestRate" :min="0" :max="100" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="冲抵策略" prop="offsetId">
            <i-select v-model="model.offsetId">
              <i-option v-for="item in offsetArr" :key="item.id" :label="item.offsetName" :value="item.id"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注" prop="remark">
            <i-input type="textarea" v-model="model.remark" style="width: 100%;padding-right: 34px;"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service';
import { BasicOffsetService } from '~/services/manage-service/basic-offset.service'
import { Form } from "iview";

@Component({
  components: {}
})
export default class AddModifyScheme extends Vue {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService
  @Dependencies(BasicOffsetService) private basicOffsetService: BasicOffsetService
  @Prop() data
  @Prop() id

  private form: Form
  private accountDay: Array<Number> = []
  private offsetArr: Array<any> = [];

  private model:any = {
    schemeType: '', // 方案类型
    schemeName: '', // 方案名称
    repayType: '', // 还款方式
    mortgageType: '', // 抵押方式
    creditDays: null, // 征信保护天数
    overdueDays: null, // 逾期保护天数
    periods: null, // 期数
    interestRate: null, // 利率
    cycleType: '', // 周期类型
    moneyMin: null, // 融资最小金额
    moneyMax: null, // 融资最大金额
    accountPeriodType: '', // 账期类型
    accountDay: '', // 还款日
    offsetId: '', // 冲抵策略
    remark: '' // 备注
  }

  private rules = {
    schemeType: { required: true, message: '请选择方案类型', trigger: 'blur',type: 'number' },
    schemeName: { required: true, message: '请输入方案名称', trigger: 'blur' },
    repayType: { required: true, message: '请选择还款方式', trigger: 'blur',type: 'number' },
    mortgageType: { required: true, message: '请选择抵押方式', trigger: 'blur',type: 'number' },
    creditDays: { required: true, message: '请输入征信保护天数', trigger: 'blur',type: 'number' },
    overdueDays: { required: true, message: '请输入逾期保护天数', trigger: 'blur',type: 'number' },
    periods: { required: true, message: '请输入期数', trigger: 'blur',type: 'number' },
    interestRate: { required: true, message: '请输入利率', trigger: 'blur',type: 'number' },
    cycleType: { required: true, message: '请选择周期类型', trigger: 'blur',type: 'number' },
    moneyMin: { required: true, message: '请输入融资最小金额', trigger: 'blur',type: 'number' },
    moneyMax: { required: true, message: '请输入融资最大金额', trigger: 'blur',type: 'number' },
    accountPeriodType: { required: true, message: '请选择账期类型', trigger: 'blur',type: 'number' },
    accountDay: { required: true, message: '请选择还款日', trigger: 'blur',type: 'number' },
    offsetId: { required: true, message: '请选择冲抵策略', trigger: 'blur',type: 'number' }
  }

  created () {
    for(let i = 1;i <= 31;i++){
      this.accountDay.push(i)
    }
    this.basicOffsetService.findBasicOffsetByOrg().subscribe(val => {
      this.offsetArr = val
    })
    if(this.id) {
      this.model.id = this.id
    }
    if(Object.keys(this.data).length != 0){
      this.model.schemeType = this.data.schemeType
      this.model.schemeName = this.data.schemeName
      this.model.repayType = this.data.repayType
      this.model.mortgageType = this.data.mortgageType
      this.model.creditDays = this.data.creditDays
      this.model.overdueDays = this.data.overdueDays
      this.model.periods = this.data.periods
      this.model.interestRate = this.data.interestRate * 100
      this.model.cycleType = this.data.cycleType
      this.model.moneyMin = this.data.moneyMin
      this.model.moneyMax = this.data.moneyMax
      this.model.accountPeriodType = this.data.accountPeriodType
      this.model.accountDay = this.data.accountDay
      this.model.offsetId = this.data.offsetId
    }
  }
  mounted () {
    this.form = this.$refs['repay-scheme-form']
  }
  /**
    * 确定新增还款方案
    */
  addOrModifyScheme() {
    return new Promise((resolve, reject) => {
      this.form.validate(valid => {
        if (!valid) return reject()
        this.repaySchemeService.repayScheme(this.model)
          .subscribe(
            data => {
              this.$Message.success("操作成功！");
              resolve(true)
            },
            ({ msg }) => {
              this.$Message.error(msg);
              resolve(false)
            }
          );
      })
    })
  }

}
</script>

<style lang="less" scoped>
</style>
