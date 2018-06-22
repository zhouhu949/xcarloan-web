<template>
  <section class="component car-parms-base">
    <i-form :model="model" :rules="rules" ref="form" :label-width="110" inline>
      <i-form-item label="参数名称" prop="name">
        <i-input v-model="model.name" placeholder="请输入参数名称"></i-input>
      </i-form-item>
      <i-form-item label="参数值" prop="comment">
        <i-input v-model="model.comment" placeholder="请输入参数值"></i-input>
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
export default class CarParmsBase extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  @Prop({
    required: true,
    type: Number
  }) carId

  private form: Form

  private model = {
    name: "", // 栏目名称
    comment: "" // 栏目介绍
  }

  private rules = {
    name: { required: true, message: '请输入参数名称', trigger: 'blur' },
    value: { required: true, message: '请输入参数值', trigger: 'blur' }
  }

  /**
    * 确定新增系列
    */
  submit() {
    let model ={
      name : this.model.name,
      comment : this.model.comment,
      id: this.carId,
    }
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        if (!r) return reject()
        this.basicCarManageService.addCarConfigParamInfo(model).subscribe(
          data => {
            this.$Message.success('添加参数成功')
            resolve()
          },
          err => {
            this.$Message.error(err.msg)
            reject()
          }
        )
      })
    })

  }

  mounted() {
    this.form = this.$refs['form']
  }



}
</script>

<style lang="less" scoped>
</style>
