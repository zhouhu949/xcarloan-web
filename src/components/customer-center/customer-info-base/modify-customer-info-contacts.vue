<!--维护联系人信息-->
<template>
  <section class="component modify-customer-info-contacts">
    <i-form ref="from" inline :model="model" :rules="rules" :label-width="110">
      <i-form-item label="姓名" prop="contactName">
        <i-input v-model="model.contactName"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="contactPhone">
        <i-input v-model="model.contactPhone"></i-input>
      </i-form-item>
      <i-form-item label="性别" prop="contactSex">
        <i-select v-model="model.contactSex" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10008)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="身份关系" prop="contactRelation">
        <i-select v-model="model.contactRelation" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10056)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="电子邮箱" prop="contactEmail">
        <i-input v-model="model.contactEmail"></i-input>
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
import { BasicCustomerContactService } from "~/services/manage-service/basic-customer-contact.service";

@Component({})
export default class ModifyCustomerInfoContacts extends Vue {
  @Dependencies(BasicCustomerContactService) private basicCustomerContactService: BasicCustomerContactService;
 // 客户ID
  @Prop() customerId: Number;
  // 维护数据
  @Prop() data;

  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
      contactName: '', // 姓名
      contactPhone: '', // 电话
      contactSex: 0, // 性别
      contactRelation: 0, // 身份关系
      contactEmail: '', // 电子邮箱
      remark: '' // 备注
    }

    this.rules = {
      contactName: [
        { required: true, message: "请填写姓名", trigger: "blur" },
        { validator: this.$validator.chineseName, trigger: "blur" }
      ],
      contactSex: { required: true, message: "请选择性别", trigger: "blur", type: "number" },
      contactRelation: { required: true, message: "请选择身份关系", trigger: "blur", type: "number" },
      contactPhone: [
        { required: true, message: "请填写电话", trigger: "blur" },
        { validator: this.$validator.phoneNumber, trigger: "blur" }
      ]
    }
  }

  mounted() {
    if (this.data) this.model = this.data
    if (this.customerId) this.model.customerId = this.customerId
  }

  /**
   * 新增联系人
   */
  private addContact() {
    return new Promise((resolve, reject) => {
      this.basicCustomerContactService.addCustomContact(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 修改联系人
   */
  private modifyContact() {
    return new Promise((resolve, reject) => {
      this.basicCustomerContactService.updateCustomContant(this.model).subscribe(
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
        let result = this.customerId ? this.addContact() : this.modifyContact()
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
