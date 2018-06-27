<!--维护基础信息-->
<template>
  <section class="component modify-customer-info-basedata">
    <i-form ref="from" inline :model="model" :rules="rules" label-width="110">
      <i-form-item label="客户姓名" prop="customerName">
        <i-input v-model="model.customerName" clearable></i-input>
      </i-form-item>
      <i-form-item label="客户性别" prop="customerSex">
        <i-select v-model="model.customerSex" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10008)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="电话" prop="customerPhone">
        <i-input v-model="model.customerPhone" clearable></i-input>
      </i-form-item>
      <i-form-item label="身份证号" prop="idCard">
        <i-input v-model="model.idCard"></i-input>
      </i-form-item>
      <i-form-item label="出生日期" prop="birthTime">
        <i-date-picker class="form-picker" v-model="model.birthTime" clearable></i-date-picker>
      </i-form-item>
      <i-form-item label="民族" prop="nation">
        <i-input v-model="model.nation" clearable></i-input>
      </i-form-item>
      <i-form-item label="QQ" prop="qq">
        <i-input v-model="model.qq" clearable></i-input>
      </i-form-item>
      <i-form-item label="微信" prop="wechat">
        <i-input v-model="model.wechat" clearable></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="model.email" clearable></i-input>
      </i-form-item>
      <i-form-item label="邮政编码" prop="postalCode">
        <i-input v-model="model.postalCode" clearable></i-input>
      </i-form-item>
      <i-form-item label="发证机关" prop="customerIssuer">
        <i-input v-model="model.customerIssuer" clearable></i-input>
      </i-form-item>
      <i-form-item label="有效期类型" prop="idCardValidityPeriodType">
        <i-select v-model="model.idCardValidityPeriodType" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10041)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="有效期区间" prop="idCardValidityPeriodSection">
        <i-input v-model="model.idCardValidityPeriodSection" clearable></i-input>
      </i-form-item>
      <i-form-item label="身份证地址" prop="idCardAddress">
        <i-input v-model="model.idCardAddress" clearable></i-input>
      </i-form-item>
      <i-form-item label="详细地址" prop="idCardAddressDetail">
        <i-input v-model="model.idCardAddressDetail" clearable></i-input>
      </i-form-item>
      <i-form-item label="教育程度" prop="education">
        <i-select v-model="model.education" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10028)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="毕业院校" prop="school">
        <i-input v-model="model.school" clearable></i-input>
      </i-form-item>
      <i-form-item label="婚姻状况" prop="marital">
        <i-select v-model="model.marital" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10029)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="现居住地址" prop="localHomeAddr">
        <i-input v-model="model.localHomeAddr" clearable></i-input>
      </i-form-item>
      <i-form-item label="地址详细" prop="localHomeAddrDetail">
        <i-input v-model="model.localHomeAddrDetail" clearable></i-input>
      </i-form-item>
      <i-form-item label="家庭座机" prop="localHomePhone">
        <i-input v-model="model.localHomePhone" clearable></i-input>
      </i-form-item>
      <i-form-item label="是否接受勘查" prop="houseProspecting">
        <i-select v-model="model.houseProspecting" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="健康状况" prop="healthStatus">
        <i-select v-model="model.healthStatus" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10042)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="居住状况" prop="homeStatus">
        <i-select v-model="model.homeStatus" clearable>
          <i-option v-for="{label,value} of $dict.getDictData(10043)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="通讯地址" prop="messageAddr">
        <i-input v-model="model.messageAddr" clearable></i-input>
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
export default class ModifyCustomerInfoBasedata extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() data;

  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
      customerName: "",
      customerSex: "",
      customerPhone: "",
      birthTime: "",
      qq: "",
      wechat: "",
      email: "",
      postalCode: "",
      idCard: "",
      customerIssuer: "",
      idCardValidityPeriodType: "",
      idCardValidityPeriodSection: "",
      idCardAddress: "",
      idCardAddressDetail: "",
      education: "",
      school: "",
      marital: "",
      localHomeAddr: "",
      localHomeAddrDetail: "",
      localHomePhone: "",
      houseProspecting: "",
      nation: "",
      healthStatus: "",
      homeStatus: "",
      messageAddr: ""
    }

    this.rules = {
      customerName: [
        { required: true, message: "请填写客户姓名", trigger: "blur" },
        { validator: this.$validator.chineseName, trigger: "blur" }
      ],
      customerSex: { required: true, message: "请选择客户性别", trigger: "blur", type: "number" },
      customerPhone: [
        { required: true, message: "请填写客户电话", trigger: "blur" },
        { validator: this.$validator.phoneNumber, trigger: "blur" }
      ],
      idCard: [
        { required: true, message: "请填写客户身份证号", trigger: "blur" },
        { validator: this.$validator.idCard, trigger: "blur" }
      ],
      postalCode: { validator: this.$validator.zipCode, trigger: "blur" }
    }
  }

  mounted() {
    if (this.data) {
      this.model = this.data
    }
  }

  /**
   * 新增客户
   */
  private addCoustomer() {
    return new Promise((resolve, reject) => {
      this.basicCustomerService.addBasicCustomer(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 修改客户
   */
  private modifyCusomter() {
    return new Promise((resolve, reject) => {
      this.basicCustomerService.addBasicCustomer(this.model).subscribe(
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
        let result = this.data ? this.modifyCusomter() : this.addCoustomer()
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
