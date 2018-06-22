<!-- 修改库存车辆 -->
<template>
  <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
    <i-form-item label="供应商" prop="supplierId">
      <i-select v-model="model.supplierId">
        <i-option v-for="{id,supplierName} in supplierDataSet" :key="id" :label="supplierName" :value="id"></i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="车架号" prop="stockCarNo">
      <i-input v-model="model.stockCarNo"></i-input>
    </i-form-item>
    <i-form-item label="发动机号" prop="stockEngineNo">
      <i-input v-model="model.stockEngineNo"></i-input>
    </i-form-item>
    <i-form-item label="车辆颜色" prop="stockCarColor">
      <i-input v-model="model.stockCarColor"></i-input>
    </i-form-item>
    <i-form-item label="备注" prop="remark">
      <i-input type="textarea" v-model="model.remark" :maxlength="200"></i-input>
    </i-form-item>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { BasicStockCarService } from "~/services/manage-service/basic-stock-car.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class ModifyBasicStockCar extends Vue {
  @Dependencies(BasicStockCarService)
  private basicStockCarService: BasicStockCarService;
  @Dependencies(BasicSupplierService)
  private basicSupplierService: BasicSupplierService;

  @Prop() stockCarData;
  @Prop({
    default: 0
  })
  modelId;

  private supplierDataSet: Array<Object> = [];

  private model: any = {
    id: 0,
    modelId: 0,
    remark: "",
    stockCarColor: "",
    stockCarNo: "",
    stockEngineNo: "",
    supplierId: ""
  };

  private rules = {
    stockCarNo: [
      {
        required: true,
        message: "请输入车架号",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过200个字符",
        trigger: "blur"
      }
    ],
    stockEngineNo: [
      {
        required: true,
        message: "请输入发动机号",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过200个字符",
        trigger: "blur"
      }
    ],
    supplierId: {
      required: true,
      message: "请选择供应商",
      trigger: "blur",
      type: "number"
    }
  };

  /**
   *
   */
  mounted() {
    this.getBasicSupplier().then(val => {
      //回调初始化编辑数据
      if (this.stockCarData) {
        this.model.id = this.stockCarData.id;
        this.model.modelId = this.stockCarData.modelId;
        this.model.remark = this.stockCarData.remark;
        this.model.stockCarColor = this.stockCarData.stockCarColor;
        this.model.stockCarNo = this.stockCarData.stockCarNo;
        this.model.stockEngineNo = this.stockCarData.stockEngineNo;
        this.model.supplierId =
          this.stockCarData.supplierId > 0 ? this.stockCarData.supplierId : "";
      } else {
        //车型
        this.model.modelId = this.modelId;
      }
    });
  }

  /**
   * 获取供应商信息
   */
  private getBasicSupplier() {
    return new Promise((resolve, reject) => {
      this.basicSupplierService.getBasicSupplierList().subscribe(
        data => {
          this.supplierDataSet = data;
          resolve(true);
        },
        err => reject(err)
      );
    });
  }

  /**
   * 添加冲抵策略
   */
  private addBasicStock() {
    return new Promise((resolve, reject) => {
      this.basicStockCarService
        .addBasicStock(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 修改冲抵策略
   */
  private modifyBasicStock() {
    return new Promise((resolve, reject) => {});
  }

  /**
   * 提交冲抵策略数据
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise(resolve => {
      form.validate(v => {
        if (!v) return resolve(false);

        let result = this.stockCarData
          ? this.modifyBasicStock()
          : this.addBasicStock();
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