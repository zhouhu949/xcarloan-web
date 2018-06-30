<!-- 抵押入库 -->
<template>
  <section class="component modify-customer-assessment">
    <i-card title="押品信息">
      <data-grid :labelWidth="110" labelAlign="right" contentAlign="left">
        <data-grid-item label="客户姓名" :span="6">{{customerCarInfo.customerName }}</data-grid-item>
        <data-grid-item label="客户电话" :span="6">{{customerCarInfo.customerPhone}}</data-grid-item>
        <data-grid-item label="身份证" :span="6">{{customerCarInfo.idCard}}</data-grid-item>
        <data-grid-item label="车牌号" :span="6">{{customerCarInfo.carNo }}</data-grid-item>
        <data-grid-item label="车辆型号" :span="6">{{customerCarInfo.carType | dictConvert }}</data-grid-item>
        <data-grid-item label="购买方式" :span="6">{{customerCarInfo.buyType | dictConvert }}</data-grid-item>
      </data-grid>
    </i-card>

    <i-form :label-width="110" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
      <i-card title="选购信息" style="margin-bottom:20px;">
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="车辆用途" prop="carPurpose">
              <i-select v-model="model.carPurpose" placeholder="请选择车辆用途" :disabled="isView">
                <i-option v-for="{value,label} in $dict.getDictData(10047)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="排量" prop="displacement" :readonly="$parent.$parent.isView">
              <i-input v-model="model.displacement" placeholder="请输入排量"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="驱动形式" prop="driver">
              <i-select v-model="model.driver" placeholder="请选择驱动形式" :disabled="isView">
                <i-option v-for="{value,label} in $dict.getDictData(10049)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="行驶证号" prop="drivingNo" :readonly="isView">
              <i-input v-model="model.drivingNo" placeholder="请输入行驶证号"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="行驶里程" prop="mileAge">
              <i-input-number v-model="model.mileAge" placeholder="请输入行驶里程" :precision="0" :step="1"></i-input-number>
              <span>公里</span>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="变速箱形式" prop="transmission">
              <i-select v-model="model.transmission" placeholder="请选择变速箱形式" :disabled="isView">
                <i-option v-for="{value,label} in $dict.getDictData(10048)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="过户次数" prop="transferNo">
              <i-input-number v-model="model.transferNo" placeholder="请输入过户次数" :precision="0"></i-input-number>
              <span>次</span>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="出厂日期" prop="factoryTime" :readonly="isView">
              <i-date-picker type="date" placeholder="请选择出厂日期" v-model="model.factoryTime" :readonly="isView"></i-date-picker>
            </i-form-item>
          </i-col>
        </i-row>

        <i-collapse>
          <i-panel v-for="item in model.carAttributeModelList" :name="item.configType" :key="item.configType">
            {{ $filter.dictConvert(item.configType) }}
            <data-grid slot="content" :labelWidth="110" labelAlign="right" contentAlign="left" style="margin:-16px;">
              <data-grid-item v-for="item in item.data" :label="item.attrValue" :span="6" :key="item.attrName">
                <i-radio-group v-model="item.attrCode">
                  <i-radio v-for="{value,label} in $dict.getDictData(10057)" :key="value" :label="value" :true-value="value">{{label}}</i-radio>
                </i-radio-group>
              </data-grid-item>
            </data-grid>
          </i-panel>
        </i-collapse>
      </i-card>

      <i-card title="评估信息">
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="申请评估日期" prop="assessmentApplyDate">
              <i-date-picker type="date" placeholder="选择申请评估日期" v-model="model.assessmentApplyDate" :readonly="isView"></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="评估日期" prop="assessmentDate">
              <i-date-picker type="date" placeholder="选择评估日期" v-model="model.assessmentDate" :readonly="isView"></i-date-picker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="估价" prop="evaluation">
              <i-input-number v-model="model.evaluation" placeholder="请选输入估价" :readonly="isView" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
              <span>元</span>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="车况" prop="carSituation">
              <i-select v-model="model.carSituation" placeholder="请选择车况" :disabled="isView">
                <i-option v-for="{value,label} in $dict.getDictData(10046)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="评估状态" prop="assessmentStatus">
              <i-select v-model="model.assessmentStatus" placeholder="请选择评估状态" :disabled="isView">
                <i-option v-for="{value,label} in $dict.getDictData(10021)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="15">
          <i-col :span="12">
            <i-form-item label="评估结果" prop="assessmentResult">
              <i-input type="textarea" v-model="model.assessmentResult" placeholder="请输入评估结果"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="备注" prop="remark">
              <i-input type="textarea" v-model="model.remark"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-card>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Form } from "iview";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerAssessmentCarService } from "~/services/manage-service/basic-customer-assessment-car.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Object } from "core-js";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ModifyCustomerAssessment extends Vue {
  @Dependencies(BasicCustomerAssessmentCarService)
  private basicCustomerAssessmentCarService: BasicCustomerAssessmentCarService;

  @Prop({
    default: 0,
    type: Number
  })
  id: number;
  @Prop({
    default: 0,
    type: Number
  })
  carId: number;

  @Prop({
    default: 0,
    type: Number
  })
  customerId: number;
  @Prop({
    default: 0,
    type: Number
  })
  assessmentReportId: number;

  @Prop({
    default: false,
    type: Boolean
  })
  isView: boolean;

  isLtRegisterTime = (rule, value, callback) => {
    if (
      new Date(value).getTime() > new Date(this.model.assessmentDate).getTime()
    ) {
      // 拼接:000是因为时间戳算到毫秒，根据自己拿到的值的实际情况来
      callback(new Error());
    } else {
      callback();
    }
  };

  private customerCarInfo: any = {
    buyType: "",
    carNo: "",
    carType: "",
    customerName: "",
    customerPhone: "",
    idCard: ""
  };
  private model: any = {
    // 申请评估日期
    assessmentApplyDate: "",
    // 评估日期
    assessmentDate: "",
    // 评估结果
    assessmentResult: "",
    // 评估状态
    assessmentStatus: "",
    // 车辆id
    carId: this.carId,
    // 车辆用途
    carPurpose: "",
    // 车况
    carSituation: "",
    // 客户id
    customerId: this.customerId,
    // 排量
    displacement: "",
    // 驱动形式
    driver: "",
    // 行驶证号
    drivingNo: "",
    // 估价
    evaluation: 0,
    // 出厂日期
    factoryTime: "",
    // 行驶里程
    mileAge: 0,
    // 备注
    remark: "",
    // 过户次数
    transferNo: 0,
    // 变速箱形式
    transmission: "",
    // 配置
    carAttributeModelList: []
  };

  private rules = {
    // 出厂日期
    factoryTime: [
      {
        required: true,
        message: "请选择出厂日期",
        trigger: "blur",
        type: "date"
      },
      {
        trigger: "change",
        message: "出厂日期要小于评估日期",
        validator: this.isLtRegisterTime
      }
    ],
    mileAge: {
      required: true,
      type: "number",
      message: "请输入行驶里程",
      trigger: "change"
    },
    drivingNo: {
      required: true,
      message: "请输入行驶证号",
      trigger: "change"
    },
    transferNo: {
      required: true,
      type: "number",
      message: "请输入过户次数",
      trigger: "change"
    },
    carPurpose: {
      required: true,
      type: "number",
      message: "请选择车辆用途",
      trigger: "blur"
    },
    transmission: {
      required: true,
      type: "number",
      message: "请选择变速箱形式",
      trigger: "blur"
    },
    driver: {
      required: true,
      type: "number",
      message: "请选择驱动形式",
      trigger: "blur"
    },
    displacement: {
      required: true,
      message: "请输入排量",
      trigger: "blur"
    },
    carSituation: {
      required: true,
      type: "number",
      message: "请选择车况",
      trigger: "blur"
    },
    evaluation: {
      required: true,
      type: "number",
      message: "请输入估价",
      trigger: "blur"
    },
    assessmentResult: [
      {
        required: true,
        message: "请输入评估结果",
        trigger: "blur"
      }
    ]
  };

  /**
   *
   */
  mounted() {
    //回调初始化编辑数据
    if (this.carId) {
      this.basicCustomerAssessmentCarService
        .findCustomerCarInfo(this.carId)
        .subscribe(
          data => {
            if (data) this.customerCarInfo = data;
          },
          err => this.$Message.error(err.msg)
        );
    }

    // 获取配置项列表
    this.refreshCustomerBankInfo();
  }

  configChange(item, index) {
    console.log(item);

    this.model.config[index] = {
      attrType: item.attrType,
      attrName: item.attrName,
      attrValue: item.attrValue
    };
  }

  /**
   * 获取评估车型列表
   */
  refreshCustomerBankInfo() {
    this.basicCustomerAssessmentCarService.getAssessmentConfigList().subscribe(
      data => {
        this.model.carAttributeModelList = Object.assign(
          {},
          data.map(val => Object.assign({ attrCode: "" }, val))
        );

        console.log(this.model.carAttributeModelList);
      },
      err => this.$Message.error(err.msg)
    );
  }

  /**
   * 提交评估
   */
  submit() {
    let form = this.$refs["form"] as Form;

    return new Promise((resolve, reject) => {
      form.validate(v => {
        console.log("提交表单11111111111");

        // if (!v) return resolve(false);

        console.log("提交表单222222222");

        console.log(this.model);

        // 临时数据
        let tempCarAttributeModelList: Array<any> = [];
        // 数据解析
        //var data = Object.assign({}, this.model);

        console.log("提交表单33333333333");

        // let { carAttributeModelList: [{ data }] } = this.model;

        this.model.carAttributeModelList.forEach(element => {
          console.log("提交表单33333333000000000000");
          element.data.forEach(item => {
            console.log("提交表单3333333311111111111111");
            tempCarAttributeModelList.push(Object.assign({}, item));
          });
        });

        console.log("提交表单44444444444");

        // data.carAttributeModelList = tempCarAttributeModelList;

        console.log("提交表单555555555555");
        //console.log(data);
        console.log("提交表单66666666666");

        // this.basicCustomerAssessmentCarService
        // .addBasicCustomerAssessment(data)
        // .subscribe(data => resolve(true), err => reject(err));
      });
    });
  }
}
</script>

<style lang="less">
</style>
