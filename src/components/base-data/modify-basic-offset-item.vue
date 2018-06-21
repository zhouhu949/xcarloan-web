<!-- 新增冲抵项 -->
<template>
  <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
    <i-form-item label="费用项" prop="expenseId">
      <i-select v-model="model.expenseId">
        <i-option v-for="item in expenseData" :key="item.id" :label="item.expenseName" :value="item.id"></i-option>
      </i-select>
    </i-form-item>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicOffsetService } from "~/services/base-service/basic-offset.service";
import { BasicExpenseService } from "~/services/manage-service/basic-expense.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class ModifyBasicExpense extends Vue {
  @Dependencies(BasicOffsetService)
  private basicOffsetService: BasicOffsetService;
  @Dependencies(BasicExpenseService)
  private basicExpenseService: BasicExpenseService;
  @Prop() expenseData;
  @Prop() offsetItemData;
  @Prop() offsetId;

  private model: any = {
    expenseId: "",
    offsetId: this.offsetId
  };

  private rules = {
    expenseId: {
      required: true,
      message: "请选择费用项",
      trigger: "blur",
      type: "number"
    }
  };

  /**
   *
   */
  mounted() {
    if (this.offsetItemData) {
      this.model.expenseId = this.offsetItemData.expenseId;
      this.model.offsetId = this.offsetItemData.offsetId;
    }
  }

  /**
   * 添加冲抵项
   */
  private addBasicOffsetItem() {
    return new Promise((resolve, reject) => {
      this.basicOffsetService
        .addBasicOffsetItem(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 修改冲抵项
   */
  private modifyBasicOffsetItem() {
    return new Promise((resolve, reject) => { 

    });
  }

  /**
   * 提交冲抵项数据
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise(resolve => {
      form.validate(v => {
        if (!v) return resolve(false);
        let result = this.offsetItemData
          ? this.modifyBasicOffsetItem()
          : this.addBasicOffsetItem();
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

</style>
