<!--新增用户字典项-->
<template>
  <section class="component create-modify-dict">
    <i-form ref="add-data-item" :model="model" :label-width="60" :rules="rules">
      <i-form-item label="名称" prop="dictItemName">
        <i-input v-model="model.dictItemName"></i-input>
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
export default class CreateModifyDict extends Vue {
  @Prop() dictData
  @Prop() checked
  @Dependencies(SysDictService) private sysDictService: SysDictService;
  @Dependencies(PageService) private pageService: PageService;
  private model: any = {
    dictCode: '',
    dictId: '',
    dictItemName: '',
    dictItemCode: '',
    dictItemStatus: '',
    id: ''
  }

  private rules = {
    dictItemName: [
      {
        required: true,
        message: "请输入数据名称",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过20个字符",
        trigger: "blur"
      }
    ]
  }
  created() {
    this.model.dictItemCode = this.dictData.dictItemCode;
    this.model.dictItemName = this.dictData.dictItemName;
    this.model.dictItemStatus = this.dictData.dictItemStatus;
    this.model.dictCode = this.dictData.dictCode;
    this.model.dictId = this.dictData.dictId;
    this.model.id = this.dictData.id;
  }
  /**
 * 添加用户字典项
 */
  createDictItem() {
    this.model.dictId = this.checked.id;
    return new Promise((resolve) => {
      if (!this.model.dictItemName) {
        let form = <Form>this.$refs["add-data-item"];
        form.validate(valid => {
          if (!valid) return false;
        })
      } else {
        this.sysDictService.createUserDataDict(this.model).subscribe(
          val => {
            this.$Message.success("操作成功！");
            resolve(true)
          },
          ({ msg }) => {
            this.$Message.error(msg);
            resolve(false)
          });
      }
    });
  }
  /**
   * 编辑数据
   */
  editDataItem() {
    return new Promise((resolve) => {
      if (!this.model.dictItemName) {
        let form = <Form>this.$refs["add-data-item"];
        form.validate(valid => {
          if (!valid) return false;
        })
      } else {
        this.sysDictService.updateDataDict(this.model).subscribe(
          val => {
            this.$Message.success("操作成功！");
            resolve(true)
          },
          ({ msg }) => {
            this.$Message.error(msg);
            resolve(false)
          });
      }
    });
  }
}
</script>

<style lang="less">
.component.create-modify-dict {
  .ivu-form-item {
    margin: 20px 0;
    .ivu-input-wrapper.ivu-input-type {
      width: 100% !important;
    }
  }
}
</style>

