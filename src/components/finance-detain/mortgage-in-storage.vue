<!-- 抵押入库 -->
<template>
  <section class="component mortgage-in-storage">
    <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="设备号" prop="gpsNo">
            <i-input v-model="model.gpsNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="设备厂商" prop="gpsManufactor">
            <i-select v-model="model.gpsManufactor" clearable>
              <i-option v-for="{value,label} in $dict.getDictData(10045)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="入库时间" prop="stockDate">
            <i-date-picker type="datetime" placeholder="选择入库时间" v-model="model.stockDate"></i-date-picker>
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
export default class MortgageInStorage extends Vue {
  @Dependencies(FinanceDetainService)
  private financeDetainService: FinanceDetainService;

  @Prop() inStorageData;
  @Prop({
    default: 0
  })
  id;

  private model: any = {
    // 押品出入库id
    id: this.id,
    gpsNo: "",
    gpsManufactor: "",
    stockDate: ""
  };

  private rules = {
    gpsNo: [
      {
        required: true,
        message: "请输入设备号",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过200个字符",
        trigger: "blur"
      }
    ],
    gpsManufactor: [
      {
        required: true,
        type:"number",
        message: "请选择设备厂商",
        trigger: "blur"
      }
    ],
    stockDate: {
      required: true,
      type: "date",
      message: "请输入入库时间",
      trigger: "blur"
    }
  };

  /**
   *
   */
  mounted() {
    //回调初始化编辑数据
    if (this.inStorageData) {
      this.model.id = this.inStorageData.id;
      this.model.gpsManufactor = this.inStorageData.gpsManufactor;
      this.model.gpsNo = this.inStorageData.gpsNo;
      this.model.stockDate = this.inStorageData.stockDate;
    } else {
      //车型
      this.model.id = this.id;
    }
  }

  /**
   * 提交抵押入库
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise((resolve, reject) => {
      form.validate(v => {
        if (!v) return resolve(false);

        this.financeDetainService
          .financeMortgageInStorage(this.model)
          .subscribe(data => resolve(true), err => reject(err));
      });
    });
  }
}
</script>
<style lang="less">
</style>
