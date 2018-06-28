<!-- 抵押入库 -->
<template>
  <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="申请评估日期" prop="assessmentApplyDate">
          <i-date-picker type="datetime" placeholder="选择申请评估日期" v-model="model.assessmentApplyDate" :readonly="isView"></i-date-picker>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="评估日期" prop="assessmentDate">
          <i-date-picker type="datetime" placeholder="选择评估日期" v-model="model.assessmentDate" :readonly="isView"></i-date-picker>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="评估编号" prop="assessmentNo">
          <i-input type="text" v-model="model.assessmentNo" :readonly="isView"></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="评估结果" prop="assessmentResult">
          <i-select v-model="model.assessmentResult" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10046)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="评估状态" prop="assessmentStatus">
          <i-select v-model="model.assessmentStatus" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10021)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="购买方式" prop="buyType">
          <i-select v-model="model.buyType" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10050)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="车牌号" prop="carNo">
          <i-input type="text" v-model="model.carNo" :readonly="isView"></i-input>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="购车价格" prop="carPrice">
          <i-input-number v-model="model.carPrice" :precision="2" :step="1000" :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :parser="value => value.replace(/￥s?|(,*)/g, '')" :readonly="isView"></i-input-number>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="车辆用途" prop="carPurpose">
          <i-select v-model="model.carPurpose" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10047)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="车况" prop="carSituation">
          <i-select v-model="model.carSituation" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10046)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="车辆型号" prop="carType">
          <i-input-number v-model="model.carType"></i-input-number>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="排量" prop="displacement" :readonly="$parent.$parent.isView">
          <i-input v-model="model.displacement"></i-input>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="驱动形式" prop="driver">
          <i-select v-model="model.driver" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10049)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="行驶证号" prop="drivingNo" :readonly="isView">
          <i-input-number v-model="model.drivingNo"></i-input-number>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="估价" prop="evaluation">
          <i-input-number v-model="model.evaluation" :precision="2" :step="1000" :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')" :parser="value => value.replace(/￥s?|(,*)/g, '')" :readonly="isView"></i-input-number>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="出厂日期" prop="factoryTime" :readonly="isView">
          <i-date-picker type="datetime" placeholder="选择出厂日期" v-model="model.factoryTime" :readonly="isView"></i-date-picker>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="是否贷款已还请" prop="isLoanFinished">
          <i-select v-model="model.isLoanFinished" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="是否二手车" prop="isSecondHand">
          <i-select v-model="model.isSecondHand" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="行驶里程" prop="mileAge">
          <i-input-number v-model="model.mileAge" :precision="2" :step="1000"></i-input-number>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="抵押登记次数" prop="mortgageNum">
          <i-input-number v-model="model.mortgageNum" :precision="0"></i-input-number>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="初次登记时间" prop="registerTime">
          <i-date-picker type="datetime" placeholder="选择出厂日期" v-model="model.registerTime" :readonly="isView"></i-date-picker>
        </i-form-item>
      </i-col>
      <i-col :span="12">
        <i-form-item label="过户次数" prop="transferNo">
          <i-input-number v-model="model.transferNo" :precision="0"></i-input-number>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="12">
        <i-form-item label="变速箱形式" prop="transmission">
          <i-select v-model="model.transmission" :disabled="isView">
            <i-option v-for="{value,label} in $dict.getDictData(10048)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </i-col>
    </i-row>
    <i-row :gutter="15">
      <i-col :span="24">
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" v-model="model.remark"></i-input>
        </i-form-item>
      </i-col>
    </i-row>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { Form } from "iview";

@Component({})
export default class ModifyCustomerAssessment extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService)
  private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;

  @Prop({
    default: 0
  })
  id;
  @Prop({
    default: 0
  })
  carId;

  @Prop({
    default: 0
  })
  customerId;

  @Prop({
    default: false
  })
  isView;

  private model: any = {
    // 申请评估日期
    assessmentApplyDate: "",
    // 评估日期
    assessmentDate: "",
    // 评估编号
    assessmentNo: "",
    // 评估结果
    assessmentResult: "",
    // 评估状态
    assessmentStatus: "",
    // 购买方式
    buyType: "",
    // 车辆id
    carId: this.carId,
    // 车牌号
    carNo: "",
    // 购车价格
    carPrice: 0,
    // 车辆用途
    carPurpose: "",
    // 车况
    carSituation: "",
    // 车辆型号
    carType: 0,
    // 客户id
    customerId: this.customerId,
    // 排量
    displacement: "",
    // 驱动形式
    driver: "",
    // 行驶证号
    drivingNo: 0,
    // 估价
    evaluation: 0,
    // 出厂日期
    factoryTime: "",
    // 是否贷款已还请
    isLoanFinished: "",
    // 是否二手车
    isSecondHand: "",
    // 行驶里程
    mileAge: 0,
    // 抵押登记次数
    mortgageNum: 0,
    // 初次登记时间
    registerTime: "",
    // 备注
    remark: "",
    // 过户次数
    transferNo: 0,
    // 变速箱形式
    transmission: ""
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
        message: "请选择设备厂家",
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
    if (this.id) {
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

        this.basicCustomerAssessmentCarService
          .addBasicCustomerAssessment(this.model)
          .subscribe(data => resolve(true), err => reject(err));
      });
    });
  }
}
</script>

<style lang="less">
</style>
