<!--银行卡信息-->
<template>
  <section class="component modify-customer-info-bank">
    <i-form ref="from" inline :model="model" :rules="rules" label-width="110">
      <i-form-item label="账号" prop="cardNo">
        <i-input v-model="model.cardNo" clearable></i-input>
      </i-form-item>
      <i-form-item label="开户状态" prop="accountStatus">
        <i-select v-model="model.accountStatus" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10030)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="账户类型" prop="accountType">
        <i-select v-model="model.accountType" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10044)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="银行名称" prop="bankName">
        <i-input v-model="model.bankName" clearable></i-input>
      </i-form-item>
      <i-form-item label="开户行" prop="bankBranch">
        <i-input v-model="model.bankBranch" clearable></i-input>
      </i-form-item>
      <i-form-item label="客户号" prop="clientNumber">
        <i-input v-model="model.clientNumber" clearable></i-input>
      </i-form-item>
      <i-form-item label="备注" prop="remark">
        <i-input type="textarea" v-model="model.remark" clearable></i-input>
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
export default class ModifyCustomerInfoBank extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  // 客户ID
  @Prop() customerId: Number;
  // 维护数据
  @Prop() data: any;


  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
      accountStatus: "",
      accountType: "",
      bankBranch: "",
      bankName: "",
      cardNo: "",
      clientNumber: "",
      customerId: "",
      id: 0,
      remark: ""
    }
  }

  /**
   * 增加银行卡
   */
  private addBankInfo() {
    return new Promise((resolve, reject) => {
      this.basicCustomerService.addBasicCustomerBank(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 维护银行卡
   */
  private modifyBankInfo() {
    return new Promise((resolve, reject) => {
      this.basicCustomerService.updateCustomerBank(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 提交 新增 / 修改
   */
  submit() {
    return new Promise((resolve) => {
      let form = this.$refs.form as any
      form.validate(v => {
        if (!v) return resolve()
        // 根据customerId 判断新增 修改
        let result = this.customerId ? this.addBankInfo() : this.modifyBankInfo()
        result.then(() => {
          this.$Message.success('操作成功')
          resolve(true)
        }).catch(e => {
          this.$Message.error(e.msg)
          resolve()
        })
      })
    })
  }

  mounted() {
    if (this.data) this.model = this.data
    if (this.customerId) this.model.customerId = this.customerId
  }

}
</script>
<style lang="less" scoped>
</style>
