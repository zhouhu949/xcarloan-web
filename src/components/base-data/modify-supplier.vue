<!--修改角色-->
<template>
  <section class="component modify-supplier">
    <i-form ref="form" :model="model" :label-width="140" :rules="rules" inline>
      <i-form-item label="名称" prop="supplierName">
        <i-input v-model="model.supplierName"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="supplierPhone">
        <i-input v-model="model.supplierPhone"></i-input>
      </i-form-item>
      <i-form-item label="地址" prop="supplierAddress">
        <i-input v-model="model.supplierAddress"></i-input>
      </i-form-item>
      <i-form-item label="备注" prop="remark">
        <i-input type="textarea" v-model="model.remark" :maxlength="100"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service.ts";
import { Form } from "iview";

@Component({})
export default class ModifySupplier extends Vue {
  @Dependencies(BasicSupplierService) private basicSupplierService: BasicSupplierService;
  @Prop() supplierData;

  private model: any = {
    id: "",
    remark: "",
    supplierAddress: "",
    supplierName: "",
    supplierPhone: ""
  };

  private rules = {
    supplierName: [
      { required: true, message: "请输入供应商名称", trigger: "blur" },
      { validator: this.$validator.nomalStr, trigger: "blur" }
    ],
    supplierPhone: [
      { required: true, message: "请输入供应商电话", trigger: "blur" },
      { validator: this.$validator.phoneNumber, trigger: "blur" }
    ]
  };

  /**
   *
   */
  mounted() {
    if (this.supplierData) {
      this.model.id = this.supplierData.id;
      this.model.supplierPhone = this.supplierData.supplierPhone;
      this.model.supplierName = this.supplierData.supplierName;
      this.model.supplierAddress = this.supplierData.supplierAddress;
      this.model.remark = this.supplierData.remark;
    }
  }

  /**
   * 添加供应商
   */
  private addSupplier() {
    return new Promise((resolve, reject) => {
      this.basicSupplierService
        .addBasicSupplier(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 修改供应商
   */
  private modifySupplier() {
    return new Promise((resolve, reject) => {
      this.basicSupplierService
        .editBasicSupplier(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 提交数据
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise(resolve => {
      form.validate(v => {
        if (!v) return resolve(false);
        let result = this.supplierData ? this.modifySupplier() : this.addSupplier();
        result.then(v => {
          this.$Message.success("操作成功！");
          resolve(true);
        }).catch(err => {
          this.$Message.error(err.msg);
          resolve(false);
        });
      });
    });
  }
}
</script>
<style lang="less">
</style>
