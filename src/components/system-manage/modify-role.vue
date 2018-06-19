<!--修改角色-->
<template>
  <section class="component modify-role">
    <i-form ref="form" :model="model" :label-width="110" :rules="rules">
      <i-form-item label="角色名称" prop="roleName">
        <i-input v-model="model.roleName"></i-input>
      </i-form-item>
      <i-form-item label="所属机构" prop="deptNames">
        <Cascader :data="orgTreeData" :render-format="format" v-model="model.deptNames" change-on-select :disabled="!!orgId"></Cascader>
      </i-form-item>
      <i-form-item label="状态" prop="roleStatus">
        <i-select v-model="model.roleStatus">
          <i-option v-for="{value,label} in $dict.getDictData(10007)" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注" prop="roleRemark">
        <i-input type="textarea" v-model="model.roleRemark" :maxlength="100"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysRoleService } from "~/services/manage-service/sys-role.service";
import { Form } from 'iview';
import { State, Getter, namespace } from "vuex-class";

const OrgMoudle = namespace("orgSpace")

@Component({})
export default class ModifyRole extends Vue {
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService;
  @Prop() roleData

  // 机构数据
  @OrgMoudle.Getter departmentList;
  @OrgMoudle.Getter getOwnerData;

  private orgTreeData: any;

  private model: any = {
    roleName: '',
    roleStatus: 10022, // 启用
    roleRemark: '',
    deptNames: [],
    orgId: ""
  }

  private rules = {
    roleName: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      { validator: this.$validator.nomalStr, trigger: "blur" }
    ],
    roleStatus: { required: true, message: "请输入角色名称", trigger: "blur", type: "number" }
  }


  mounted() {
    // 组织机构树
    let treeSource = this.departmentList.map(v => {
      return {
        id: v.id,
        pid: v.orgPid,
        value: v.id,
        label: v.orgName
      }
    })
    this.orgTreeData = this.$common.departmentData(treeSource)

    if (this.roleData) {
      this.model.id = this.roleData.id
      this.model.orgId = this.roleData.deptId
      this.model.roleName = this.roleData.roleName
      this.model.roleStatus = this.roleData.roleStatus
      this.model.roleRemark = this.roleData.roleRemark
      this.model.deptNames = this.getOwnerData(this.model.orgId)
    }
  }


  /**
   * 级联选择器选择之后显示的内容
   */
  private format(labels, selectedData) {
    const index = labels.length - 1;
    this.model.orgId = selectedData[index];
    return labels[index];
  }


  private addRole() {

  }

  private modifyRole() {

  }


  submit() {
    let form = this.$refs['form'] as Form
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve(false)
        // this.sysRoleService.
      })
    })
  }
}

</script>
<style lang="less" scoped>
</style>
