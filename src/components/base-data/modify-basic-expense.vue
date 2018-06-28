<!--修改角色-->
<template>
  <section class="component modify-basic-expense">
    <i-form ref="form" :model="model" :label-width="90" :rules="rules">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="费用项编码" prop="expenseCode">
            <i-input v-model="model.expenseCode" :readonly="model.id"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="费用项名称" prop="expenseName">
            <i-input v-model="model.expenseName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="24">
          <i-form-item label="备注" prop="remark">
            <i-input type="textarea" v-model="model.remark" :maxlength="100"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicExpenseService } from "~/services/manage-service/basic-expense.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class ModifyBasicExpense extends Vue {
  @Dependencies(BasicExpenseService)
  private basicExpenseService: BasicExpenseService;
  @Prop() expenseData;

  private model: any = {
    expenseCode: "",
    expenseName: "",
    isSystem: 10003, // 10002：是；10003：否
    remark: ""
  };

  private rules = {
    expenseCode: [
      { required: true, message: "请输入费用项编码", trigger: "blur" },
      { validator: this.$validator.nomalStr, trigger: "blur" }
    ],
    expenseName: [
      { required: true, message: "请输入费用项名称", trigger: "blur" },
      { validator: this.$validator.nomalStr, trigger: "blur" }
    ]
  };

  /**
   *
   */
  mounted() {
    if (this.expenseData) {
      // console.log(this.expenseData)
      this.model.id = this.expenseData.id;
      this.model.expenseCode = this.expenseData.expenseCode;
      this.model.expenseName = this.expenseData.expenseName;
      this.model.isSystem = this.expenseData.isSystem;
      this.model.remark = this.expenseData.remark;
    }
  }

  /**
   * 添加费用项
   */
  private addBasicExpense() {
    return new Promise((resolve, reject) => {
      this.basicExpenseService
        .addBasicExpense(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 修改费用项
   */
  private modifyBasicExpense() {
    return new Promise((resolve, reject) => {
      this.basicExpenseService
        .editBasicExpense(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 提交费用项数据
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise(resolve => {
      form.validate(v => {
        if (!v) return resolve(false);
        let result = this.expenseData
          ? this.modifyBasicExpense()
          : this.addBasicExpense();
        result
          .then(v => {
            this.$Message.success("操作成功！");

            resolve(true);
          })
          .catch(err => {
            this.$Message.error(err.msg);
            resolve(false);
          });
      });
    });
  }
}
</script>
<style lang="less">
.component.modify-basic-expense {
  .ivu-cascader-rel {
    width: auto;
  }
}
</style>
