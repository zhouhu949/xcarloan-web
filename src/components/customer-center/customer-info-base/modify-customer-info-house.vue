<!--维护房产信息-->
<template>
  <section class="component modify-customer-info-house">
    <i-form ref="from" inline :model="model" :rules="rules" :label-width="110">
      <i-form-item label="户型" prop="houseType">
        <i-select v-model="model.houseType" clearable>
          <i-option v-for="{value,label} in $dict.getDictData(10034)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="房产面积(m²)" prop="houseArea">
        <i-input-number v-model="model.houseArea" :min="0"></i-input-number>
      </i-form-item>
      <i-form-item label="房屋地址" prop="houseAddress">
        <i-input v-model="model.houseAddress"></i-input>
      </i-form-item>
      <i-form-item label="备注" prop="remark">
        <i-input v-model="model.remark"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerHouseService } from "~/services/manage-service/basic-customer-house.service";

@Component({})
export default class ModifyCustomerInfoHouse extends Vue {
  @Dependencies(BasicCustomerHouseService) private basicCustomerHouseService: BasicCustomerHouseService;
  // 客户ID
  @Prop() customerId: Number;
  // 维护数据
  @Prop() data;

  private model: any = null;
  private rules: any = null;

  created() {
    this.model = {
      houseType: 0, // 户型
      houseArea: 0, // 房产面积
      houseAddress: '', // 房屋地址
      // houseId: 0, // 房产id
      remark: '' // 备注
    }

    this.rules = {
      houseType: { required: true, message: "请选择户型", trigger: "blur", type: "number" },
      houseArea: { required: true, message: "请填写房产面积", trigger: "blur",type: "number" },
      houseAddress: { required: true, message: "请填写房屋地址", trigger: "blur" }
    }
  }

  mounted() {
    if (this.data) this.model = this.data
    if (this.customerId) this.model.customerId = this.customerId
  }

  /**
   * 新增房产信息
   */
  private addHouse() {
    return new Promise((resolve, reject) => {
      this.basicCustomerHouseService.addCustomHouse(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  /**
   * 修改房产信息
   */
  private modifyHouse() {
    return new Promise((resolve, reject) => {
      this.basicCustomerHouseService.updateCustomHouse(this.model).subscribe(
        data => resolve(),
        err => reject(err)
      )
    })
  }

  private submit() {
    let form: any = this.$refs.from
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve()
        let result = this.customerId ? this.addHouse() : this.modifyHouse()
        result.then(() => {
          this.$Message.success("操作成功")
          resolve(true)
        }).catch(e => {
          this.$Message.error(e.msg)
          resolve()
        })
      })
    })
  }
}
</script>
<style lang="less">
</style>
