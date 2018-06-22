<!--新增或修改还款方案比例详情-->
<template>
  <section class="component add-modify-scheme-detail">
    <i-form :label-width="100" :model="model" class="repay-scheme-detail-form" :rules="rules" ref="repay-scheme-detail-form">
      <i-row>
        <i-col :span="12">
          <i-form-item label="收取总额比例" prop="repayProportion">
            <i-input-number v-model="model.repayProportion"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="是否首付款" prop="isFirst">
            <i-select v-model="model.isFirst">
              <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="固定费用" prop="fixedCost">
            <i-input-number v-model="model.fixedCost"></i-input-number>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="还款方式" prop="repayType">
            <i-select v-model="model.repayType">
              <i-option v-for="{value,label} in $dict.getDictData(10022)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="是否尾款" prop="isLast">
            <i-select v-model="model.isLast">
              <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="是否退款" prop="isRefund">
            <i-select v-model="model.isRefund">
              <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注" prop="remark">
            <i-input type="textarea" v-model="model.remark"></i-input>
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
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service';
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service';
import { Form } from "iview";

@Component({
  components: {}
})
export default class AddModifySchemeDetail extends Vue {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService
  @Prop() data

  private form: Form
  private accountDay: Array<Number> = []

  private model:any = {
    isFirst: '', // 是否首付款
    repayProportion: 0, // 收取总额比例
    fixedCost: 0, // 固定费用
    repayType: '', // 还款方式
    isLast: '', // 是否尾款
    isRefund: '', //是否退款
    expenseId: 65 // 费用项id
  }

  private rules = {
    isFirst: { required: true, message: '请选择是否首付款', trigger: 'blur',type: 'number' },
    repayType: { required: true, message: '请选择还款方式', trigger: 'blur',type: 'number' },
    isLast: { required: true, message: '请选择是否尾款', trigger: 'blur',type: 'number' },
    isRefund: { required: true, message: '请选择是否退款', trigger: 'blur',type: 'number' },
  }

  created () {
    if(Object.keys(this.data).length != 0){
      this.model = this.data
    }
  }
  mounted () {
    this.form = this.$refs['repay-scheme-detail-form']
  }
  /**
    * 确定新增还款方案详情
    */
  addOrModifySchemeDetail() {
    return new Promise((resolve, reject) => {
      this.form.validate(valid => {
        if (!valid) return reject()
        this.repaySchemeService.addBasicSchemeExpense(this.model)
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
