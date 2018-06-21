<template>
  <section class="component car-series">
    <i-form :model="model" :rules="rules" ref="form" :label-width="110">
      <i-form-item label="系列名称" prop="name">
        <i-input v-model="model.name"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
import { Form } from "iview";

@Component({
  components: {}
})
export default class CarSeries extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  // 车辆品牌ID
  @Prop() brandId:Number

  // 系列ID
  @Prop({
    type: Object,
    default: () => { }
  }) series

  private form: Form

  private model = {
    name: '' // 系列名称
  }

  private rules = {
    name: { required: true, message: '请输入系列名称', trigger: 'blur' }
  }

  /**
    * 确定新增系列
    */
  confirmAddSeries() {
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        this.basicCarManageService.addCarSeries({ seriesName: this.model.name, brandId: this.brandId })
          .subscribe(
            data => {
              this.$Message.success("新增车辆系列成功！");
              resolve()
            },
            ({ msg }) => {
              this.$Message.error(msg);
              reject()
            }
          );
      })
    })
  }


/**
 * 修改车系
 */
  confirmSeriesRepair() {
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        this.basicCarManageService.editCarSeries({
            id: this.series.id,
            seriesName : this.model.name
          })
          .subscribe(data => {
            this.$Message.success('修改成功')
            resolve()
          }, err => {
            this.$Message.err(err.msg)
            reject()
          })
      })
    })
  }

  mounted() {
    this.form = this.$refs['form']

    if (this.series.id) {
      this.basicCarManageService.getCarSeriesById(this.series.id).subscribe(
        data => {
         this.model.name = data.seriesName

        },
        err => this.$Message.error(err.msg)
      )
    }


  }

}
</script>

<style lang="less" scoped>
</style>
