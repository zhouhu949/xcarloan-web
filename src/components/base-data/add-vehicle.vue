<!--新增车辆-->
<template> 
  <section class="component add-vehicle">
    <i-form :label-width="90" ref="form" :model="model" :rules="rules">
      <i-row :gutter="15">
        <i-col :span="12">
          <i-form-item label="车辆品牌" prop="brandName">
            <i-input v-model="model.brandName" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆系列" prop="seriesName">
            <i-input v-model="model.seriesName" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车型名称" prop="modelName">
            <i-input v-model="model.modelName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="长/宽/高" prop="carSize">
            <i-input v-model="model.carSize"></i-input>
          </i-form-item>
        </i-col>

        <i-col :span="12">
          <i-form-item label="车身结构" prop="carStructure">
            <i-input v-model="model.carStructure"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="驱动方式" prop="drivingMode">
            <i-input v-model="model.drivingMode"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="燃料形式" prop="fuel">
            <i-input v-model="model.fuel"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="综合油耗" prop="fuelConsumption">
            <i-input v-model="model.fuelConsumption"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆排量" prop="carEmissions">
            <i-input v-model="model.carEmissions"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="车身颜色" prop="carColour">
            <i-input v-model="model.carColour" class="item-full"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="内饰颜色" prop="interiorColor">
            <i-input v-model="model.interiorColor" class="item-full"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <b class="item-span">**车身、内饰颜色参数中存在多个值,则需使用英文状态分号";"隔开。** 例如:</b> 红色;黑色
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
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
import { Form } from "iview";

@Component({
  components: {}
})
export default class AddVehicle extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService;

  // 系列ID
  @Prop({
    type: Object,
    default: () => { }
  }) series

  @Prop() carId: number;

  private model = {
    brandId: "",  // 品牌id
    brandName: "",
    carColour: "",  // 车身颜色
    carEmissions: "", // 车辆排量
    carSize: "",  //  长宽高
    carStructure: "", // 车身结构
    drivingMode: "", // 驱动方式
    fuel: "", // 燃料形式
    fuelConsumption: "", // 综合油耗
    interiorColor: "", // 内饰颜色
    modelName: "", // 车辆型号
    seriesId: "", // 系列号id
    seriesName: "",
    vehicleId: 0
  };

  private rules = {
    brandName: { trigger: "blur", message: "车辆品牌不得为空", required: true },
    seriesName: { trigger: "blur", message: "车辆系列不得为空", required: true },
    modelName: { trigger: "blur", message: "请输入车型名称", required: true },
    carColour: { trigger: "blur", message: "请输入车身颜色", required: true },
    carEmissions: { trigger: "blur", message: "请输入车辆排量", required: true },
    carSize: { trigger: "blur", message: "请输入车辆长/宽/高", required: true },
    carStructure: { trigger: "blur", message: "请输入车身结构", required: true },
    drivingMode: { trigger: "blur", message: "请输入驱动方式", required: true },
    fuel: { trigger: "blur", message: "请输入燃料形式", required: true },
    fuelConsumption: { trigger: "blur", message: "请输入综合油耗", required: true },
    interiorColor: { trigger: "blur", message: "请输入内饰颜色", required: true }
  }

  private form: Form;



/**
 * 新增车辆
 */
  addVehicle() {
    return new Promise((resolve, reject) => {
      this.form.validate(valid => {
        if (!valid) return reject()
        this.basicCarManageService.addCarModel('123').subscribe(
          data => {
            this.$Message.success("新增车辆成功！");
            resolve()
          },
          ({ msg }) => {
            this.$Message.error(msg);
            reject()
          }
        );
      });
    })
  }

  // updateVehicle() {
  //   return new Promise((resolve, reject) => {
  //     this.form.validate(valid => {
  //       if (!valid) return reject()
  //       this.carService.updateCarBaseInfo(this.model).subscribe(
  //         data => {
  //           this.$Message.success("修改车辆成功！");
  //           resolve()
  //         },
  //         ({ msg }) => {
  //           this.$Message.error(msg);
  //           reject()
  //         }
  //       );
  //     });
  //   })
  // }

  /**
   * 获取品牌信息
   */
  // private getBrandInfo() {
  //   this.carService
  //     .getCarBrandBySeriesId(this.series.id)
  //     .subscribe(
  //       data => {
  //         this.model.brandId = data.brandId;
  //         this.model.brandName = data.brandName
  //       },
  //       ({ msg }) => {
  //         this.$Message.error(msg);
  //       }
  //     );
  // }

  mounted() {
    this.form = this.$refs['form']

    // if (this.series) {
    //   this.model.seriesId = this.series.id
    //   this.model.seriesName = this.series.name
    //   this.getBrandInfo()
    // }
    // if (this.carId) {
    //   this.carService.getCarDetail(this.carId).subscribe(
    //     data => {
    //       this.model = data
    //       this.model.vehicleId = this.carId
    //     },
    //     err => this.$Message.error(err.msg)
    //   )
    // }
  }
}
</script>

<style lang="less" scoped>
.add-vehicle {
  .item-full {
    width: 545px !important;
  }
  .item-span {
    color: red;
    padding-left: 90px;
  }
}
</style>
