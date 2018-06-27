<!-- 质押入库 -->
<template>
  <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
    <i-form-item label="质押地点" prop="pledgePlace">
      <i-input v-model="model.pledgePlace"></i-input>
    </i-form-item>
    <i-form-item label="入库时间" prop="stockDate">
      <i-date-picker type="datetime" placeholder="选择入库时间" v-model="model.stockDate"></i-date-picker>
    </i-form-item>
    <i-form-item label="质押位置" prop="pledgePosition">
      <i-input type="textarea" v-model="model.pledgePosition"></i-input>
    </i-form-item>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";
import { Form } from "iview";
import { namespace } from "vuex-class";

@Component({})
export default class ModifyBasicStockCar extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop() inStorageData;
  @Prop({
    default: 0
  })
  id;

  private model: any = {
    // 押品出入库id
    id: 0,
    // 质押地点
    pledgePlace: "",
    // 质押位置
    pledgePosition: "",
    // 入库时间
    stockDate: ""
  };

  private rules = {
    pledgePlace: [
      {
        required: true,
        message: "请输入质押地点",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过200个字符",
        trigger: "blur"
      }
    ],
    stockDate: {
      required: true,
      type: "date",
      message: "请选择入库时间",
      trigger: "blur"
    }
  };

  /**
   *
   */
  mounted() {
    // 初始化
    if (this.inStorageData) {
      this.model.id = this.inStorageData.id;
      this.model.pledgePlace = this.inStorageData.pledgePlace;
      this.model.pledgePosition = this.inStorageData.pledgePosition;
      this.model.stockDate = this.inStorageData.stockDate;
    }
  }

  /**
   * 提交质押入库
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise((resolve, reject) => {
      form.validate(v => {
        if (!v) return resolve(false);

        this.financeDetainService
          .financePledgeInStorage(this.model)
          .subscribe(data => resolve(true), err => reject(err));
      });
    });
  }
}
</script>

<style lang="less">
</style>
