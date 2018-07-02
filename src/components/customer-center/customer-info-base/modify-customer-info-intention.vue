<!--新增意向记录-->
<template>
  <section class="component modify-customer-info-intention">
    <i-form ref="form" inline :model="model" :rules="rules" :label-width="110">
      <i-form-item label="意向类型" prop="intentionType">
        <i-select v-model="model.intentionType" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10015)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="意向状态" prop="intentionStatus">
        <i-select v-model="model.intentionStatus" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10023)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="意向等级" prop="intentionLevel">
        <i-rate v-model="model.intentionLevel"></i-rate>
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
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";

@Component({})
export default class ModifyCustomerInfoIntention extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  // 客户ID
  @Prop() customerId: Number;

  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
     intentionType: '', // 意向类型
     intentionStatus: '', // 意向状态
     intentionLevel: 0, // 意向等级
     remark: '' // 备注
    }

    this.rules = {
      intentionType: { required: true, message: "请选择意向类型", trigger: "blur", type: "number" },
      intentionStatus: { required: true, message: "请选择意向状态", trigger: "blur", type: "number" }
    }
  }
  /**
   * 新增意向记录
   */
  addFollowRecord() {
    let form: any = this.$refs.form
    return new Promise((resolve, reject) => {
      form.validate(valid => {
        if (!valid) return reject()
        this.basicCustomerService.addBasicIntentionalCustomer(this.model, this.customerId)
        .subscribe(
          data => {
            this.$Message.success("新增意向记录成功！");
            resolve(true)
          },
          err => {
            this.$Message.error(err.message);
            resolve(false)
          }
        );
      })
    })
  }
}
</script>
<style lang="less" scoped>
.component.modify-customer-info-intention {
  .ivu-rate{
    margin-right: 72px;
  }
}
</style>
