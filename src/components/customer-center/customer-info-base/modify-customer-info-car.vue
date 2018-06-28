<!--维护车产信息-->
<template>
  <section class="component modify-customer-info-car">
    <i-form ref="from" inline :model="model" :rules="rules" :label-width="110">
      <i-form-item label="车牌号" prop="carNo">
        <i-input v-model="model.carNo"></i-input>
      </i-form-item>
      <i-form-item label="购车价格" prop="carPrice">
        <i-input-number v-model="model.carPrice" :min="0"></i-input-number>
      </i-form-item>
      <i-form-item label="是否二手车" prop="isSecondHand">
        <i-select v-model="model.isSecondHand" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="购买方式" prop="buyType">
        <i-select v-model="model.buyType" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10050)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="抵押状态" prop="carStatus">
        <i-select v-model="model.carStatus" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10051)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="抵押登记次数" prop="mortgageNum">
        <i-input-number v-model="model.mortgageNum" :min="0"></i-input-number>
      </i-form-item>
      <i-form-item label="备注" prop="remark">
        <i-input v-model="model.remark"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";

@Component({})
export default class ModifyCustomerInfoCar extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService) private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;
  // 客户ID
  @Prop() customerId: Number;
  // 维护数据
  @Prop() data: any;

  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
      carNo: '', // 车牌号
      carPrice: 0, // 购车价格
      isSecondHand: 0, // 是否二手车
      buyType: 0, // 购买方式
      carStatus: 0, // 抵押状态
      mortgageNum: 0, // 抵押登记次数 
      remark: '', // 备注
      isLoanFinished: 0, // 是否贷款已还清
      registerTime: '', // 初次登记时间
      operator: '', // 操作人
      carType: '', // 车辆型号
      operatorTime: '', // 操作时间
    }

    this.rules = {
      carNo: { required: true, message: "请填写车牌号", trigger: "blur" },
      carPrice: { required: true, message: "请填写购车价格", trigger: "blur", type: "number" },
      isSecondHand: { required: true, message: "请选择是否为二手车", trigger: "blur", type: "number" },
      buyType: { required: true, message: "请选择购买方式", trigger: "blur", type: "number" },
      carStatus: { required: true, message: "请选择抵押状态", trigger: "blur", type: "number" },
      mortgageNum: { required: true, message: "请输入抵押登记次数", trigger: "blur", type: "number" }
    }
  }

  mounted() {
    if (this.data) this.model = this.data
    if (this.customerId) this.model.customerId = this.customerId
  }

  /**
   * 新增车产信息
   */
  private addCar() {
    return new Promise((resolve, reject) => {
      this.basicCustomerAssessmentCarService.addAssessmentApplication(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 修改车产信息
   */
  private modifyCar() {
    return new Promise((resolve, reject) => {
      this.basicCustomerAssessmentCarService.updateBasicCustomerCar(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  private submit() {
    let form: any = this.$refs.from
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve()
        let result = this.customerId ? this.addCar() : this.modifyCar()
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
