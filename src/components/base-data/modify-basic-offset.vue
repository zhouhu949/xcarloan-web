<!-- 修改冲抵配置 -->
<template>
  <i-form :label-width="80" style="margin-top:20px;" :model="model" :rules="rules" ref="form">
    <i-form-item label="冲抵名称" prop="offsetName">
      <i-input v-model="model.offsetName"></i-input>
    </i-form-item>
    <i-form-item label="冲抵类型" prop="offsetType">
      <i-select v-model="model.offsetType">
        <i-option v-for="{value,label} in $dict.getDictData(10025)" :key="value" :label="label" :value="value"></i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="备注" prop="remark">
      <i-input type="textarea" v-model="model.remark" :maxlength="100"></i-input>
    </i-form-item>
  </i-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicOffsetService } from "~/services/base-service/basic-offset.service";
import { Form } from "iview";
import { State, Getter, namespace } from "vuex-class";

@Component({})
export default class ModifyBasicOffset extends Vue {
  @Dependencies(BasicOffsetService)
  private basicOffsetService: BasicOffsetService;

  @Prop() offsetData;

  private model: any = {
    id: 0,
    offsetName: "",
    offsetType: "",
    orgId: 0,
    remark: ""
  };

  private rules = {
    offsetName: [
      {
        required: true,
        message: "请输入冲抵配置名称",
        trigger: "change"
      },
      {
        max: 20,
        message: "长度不能超过20个字符",
        trigger: "blur"
      }
    ],
    offsetType: {
      required: true,
      message: "请选择冲抵类型",
      trigger: "blur",
      type: "number"
    }
  };

  /**
   *
   */
  mounted() {
    if (this.offsetData) {
      this.model.id = this.offsetData.id;
      this.model.offsetName = this.offsetData.offsetName;
      this.model.offsetType =
        this.offsetData.offsetType > 0 ? this.offsetData.offsetType : "";
      this.model.orgId = this.offsetData.orgId;
      this.model.remark = this.offsetData.remark;
    }
  }

  /**
   * 添加冲抵策略
   */
  private addBasicOffset() {
    return new Promise((resolve, reject) => {
      this.basicOffsetService
        .addBasicOffset(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 修改冲抵策略
   */
  private modifyBasicOffset() {
    return new Promise((resolve, reject) => {
      this.basicOffsetService
        .updateBasicOffset(this.model)
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 提交冲抵策略数据
   */
  submit() {
    let form = this.$refs["form"] as Form;
    return new Promise(resolve => {
      form.validate(v => {
        if (!v) return resolve(false);

        let result = this.offsetData
          ? this.modifyBasicOffset()
          : this.addBasicOffset();
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