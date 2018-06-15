<!--新增组织-->
<template>
  <section class="component modify-org">
    <i-form :label-width="110" ref="form" :model="orgModel" :rules="rules">
      <i-form-item label="机构名称" prop="orgName">
        <i-input v-model="orgModel.orgName"></i-input>
      </i-form-item>
      <i-form-item label="机构性质" prop="orgType">
        <i-select v-model="orgModel.orgType">
          <i-option v-for="{value,label} in $dict.getDictData(10002)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="是否启用" prop="orgStatus">
        <i-select v-model="orgModel.orgStatus">
          <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注" prop="orgRemark">
        <i-input v-model="orgModel.orgRemark" type="textarea"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SysOrgService } from "~/services/manage-service/sys-org.service";
import { Dependencies } from "~/core/decorator";
import { Form } from "iview";

@Component({
  components: {}
})
export default class ModifyOrg extends Vue {
  @Dependencies(SysOrgService) private sysOrgService: SysOrgService;
  // 修改机构时候传过来的数据
  @Prop() orgData
  // 增加机构时候的pid
  @Prop() pid

  private form: Form
  private rules = {
    orgName: { required: true, message: "请输入机构名称", trigger: "blur" },
    orgType: { required: true, message: "请选择机构性质", trigger: "blur", type: "number" }
  }

  private orgModel = {
    id: '',
    orgPid: '',
    orgName: '',
    orgRemark: '',
    orgStatus: 10002,
    orgType: 10006
  }

  update() {
    return new Promise((resolve) => {
      this.form.validate(v => {
        if (!v) return resolve(false)
        this.sysOrgService.editOrganization(this.orgModel)
          .subscribe(
            data => {
              this.$Message.success('修改成功')
              resolve(true)
            },
            err => {
              this.$Message.error(err.msg)
              resolve(false)
            }
          )
      })
    })
  }


  create() {
    return new Promise((resolve) => {
      this.orgModel.orgPid = this.pid

      this.form.validate(v => {
        if (!v) return resolve(false)
        this.sysOrgService.addOrganization(this.orgModel)
          .subscribe(
            data => {
              this.$Message.success('修改成功')
              resolve(true)
            },
            err => {
              this.$Message.error(err.msg)
              resolve(false)
            }
          )
      })
    })
  }

  mounted() {
    console.log(this.pid)
    this.form = this.$refs.form
    if (this.orgData) this.orgModel = this.orgData
  }

}
</script>
<style lang="less" scoped>
.component .modify-org {
}
</style>
