<!-- 修改库存车辆 -->
<template>
  <section class="component modify-basic-stock-car">
    <i-form :label-width="120" :model="model" :rules="rules" ref="form" inline>
      <i-form-item label="供应商" prop="supplierId">
        <i-select v-model="model.supplierId">
          <i-option v-for="{id,supplierName} in supplierDataSet" placeholder="请选择供应商" :key="id" :label="supplierName" :value="id"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="车架号" prop="stockCarNo">
        <i-input :maxlength="17" v-model="model.stockCarNo" placeholder="请输入车架号"></i-input>
      </i-form-item>
      <i-form-item label="发动机号" prop="stockEngineNo">
        <i-input :maxlength="20" v-model="model.stockEngineNo" placeholder="请输入发动机号"></i-input>
      </i-form-item>
      <i-form-item label="车辆颜色" prop="stockCarColor">
        <i-input v-model="model.stockCarColor" placeholder="请输入车辆颜色"></i-input>
      </i-form-item>
      <i-form-item label="采购价格" prop="stockPrice">
        <i-input-number v-model="model.stockPrice" placeholder="请输入采购价格" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse">
        </i-input-number>
      </i-form-item>
      <i-form-item label="备注" prop="remark">
        <i-input type="textarea" v-model="model.remark" placeholder="请输入备注" :maxlength="200"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicSupplierService } from "~/services/manage-service/basic-supplier.service";
import { BasicStockCarService } from "~/services/manage-service/basic-stock-car.service";
import { BasicEnterShellSaveService } from "~/services/manage-service/basic-enter-shell-save.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class ModifyBasicStockCar extends Vue {
  @Dependencies(BasicStockCarService)
  private basicStockCarService: BasicStockCarService;
  @Dependencies(BasicSupplierService)
  private basicSupplierService: BasicSupplierService;
  @Dependencies(BasicEnterShellSaveService)
  private basicEnterShellSaveService: BasicEnterShellSaveService;

  @Prop() stockCarData;
  @Prop({
    default: 0,
    type: Number
  })
  modelId: number;

  private supplierDataSet: Array<any> = [];

  private model: any = {
    _stockCarNo: "",
    id: 0,
    modelId: 0,
    remark: "",
    stockPrice: 0,
    stockCarColor: "",
    get stockCarNo(): String {
      return this._stockCarNo
    },
    set stockCarNo(val: String) {
      this._stockCarNo = val.toUpperCase()
    },
    stockEngineNo: "",
    supplierId: ""
  };

  private rules = {
    stockPrice: { required: true, message: "请输入采购价格", trigger: "change", type: "number" },
    stockCarNo: [
      { required: true, message: "请输入车架号", trigger: "blur" },
      { validator: this.$validator.carVIN, trigger: "blur" }
    ],
    stockEngineNo: [
      { required: true, message: "请输入发动机号", trigger: "blur" }
    ],
    supplierId: { required: true, message: "请选择供应商", trigger: "blur", type: "number" }
  };

  /**
   *
   */
  mounted() {
    this.getBasicSupplier();
    //车型
    this.model.modelId = this.modelId;
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
   * 
   */
  private addBasicStock() {
    return new Promise((resolve, reject) => {
      this.basicStockCarService
        .addBasicStock(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 
   */
  private modifyBasicStock() {
    return new Promise((resolve, reject) => {
      // 参数
      let model = {
        stockId: this.stockCarData.stockId,
        supplierId: this.model.supplierId,
        stockCarNo: this.model.stockCarNo,
        stockEngineNo: this.model.stockEngineNo,
        stockCarColor: this.model.stockCarColor,
        stockPrice: this.model.stockPrice,
        remark: this.model.remark
      };

      this.basicEnterShellSaveService
        .addOrderCarStock(model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 
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