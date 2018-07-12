<!-- 质押出库 -->
<template>
  <section class="component mortgage-out-storage">
    <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="出库日期" prop="stockOutDate">
            <i-date-picker type="date" placeholder="选择出库日期" v-model="model.stockOutDate"></i-date-picker>
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
import { FinanceDetainService } from "~/services/manage-service/finance-detain.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class MortgageOutStorage extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop() outStorageData;

  private model: any = {
    id: 0,
    stockOutDate: "",
    ordeId: ''
  };

  private rules = {
    stockOutDate: {
      required: true,
      type: "date",
      message: "请选择出库时间",
      trigger: "blur"
    }
  };

  /**
   *
   */
  mounted() {
    // 初始化数据
    if (this.outStorageData) {
      this.model.id = this.outStorageData.id;
      this.model.ordeId = this.outStorageData.ordeId;
    }
  }

  /**
   * 提交抵押出库
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise((resolve, reject) => {
      form.validate(v => {
        if (!v) return resolve(false);
        this.financeDetainService
          .financePledgeOutStorage(this.model)
          .subscribe(data => resolve(true), err => reject(err));
      });
    });
  }
}
</script>
<style lang="less">
</style>
