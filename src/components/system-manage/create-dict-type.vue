<!--新增用户字典类型-->
<template>
  <section class="component create-dict-type">
    <i-form ref="add-data-type" :model="model" :label-width="60" :rules="rules">
      <i-form-item label="名称" prop="dictName">
        <i-input v-model="model.dictName"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysDictService } from "~/services/manage-service/sys-dict.service";
import { PageService } from "~/utils/page.service";
import { Form } from 'iview';
@Component({
  components: {}
})
export default class CreateDictType extends Vue {
  @Prop() dictData
  @Dependencies(SysDictService) private sysDictService: SysDictService;
  @Dependencies(PageService) private pageService: PageService;
  private model: any = {
    dictName: '',
    dictType: ''
  }

  private rules = {
    dictName: [
      {
        required: true,
        message: "请输入数据字典类型名称",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过20个字符",
        trigger: "blur"
      }
    ]
  }

  /**
 * 添加用户字典类型
 */
  createDictType() {
    return new Promise((resolve) => {
      this.model.dictType = this.dictData.dictType
      if (!this.model.dictName) {
        let formValid = <Form>this.$refs["add-data-type"];
        formValid.validate(valid => {
          if (!valid) return false;
        })
        return
      }
      this.sysDictService.createDataDictType(this.model)
        .subscribe(
          data => {
            this.$Message.success('操作成功!')
            resolve(true)
          },
          err => {
            this.$Message.error(err.msg)
            resolve(false)
          }
        )
    })
  }
}
</script>
<style lang="less">
.component.create-dict-type {
  .ivu-form-item {
    margin: 20px 0;
    .ivu-input-wrapper.ivu-input-type {
      width: 100% !important;
    }
  }
}
</style>
