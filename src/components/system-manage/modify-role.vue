<!--修改角色-->
<template>
  <section class="component modify-role">
    <i-form ref="form" :model="model" :label-width="110" :rules="rules">
      <i-form-item label="角色名称" prop="roleName">
        <i-input v-model="model.roleName"></i-input>
      </i-form-item>
      <i-form-item label="所属机构" prop="deptNames">
        <Cascader :data="orgTreeData" :render-format="format" v-model="model.deptNames" change-on-select @on-change="onChange"></Cascader>
      </i-form-item>
      <i-form-item label="状态" prop="roleStatus">
        <i-select v-model="model.roleStatus">
          <i-option v-for="{value,label} in $dict.getDictData(10009)" :key="value" :label="label" :value="value"></i-option>
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
  @OrgMoudle.State orgData;
  @OrgMoudle.Getter getOwnerData;

  private orgTreeData: any = [];

  private model: any = {
    roleName: '',
    roleStatus: 10026, // 启用
    roleRemark: '',
    deptNames: [],
    orgId: ""
  }

  private rules = {
    roleName: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      { validator: this.$validator.nomalStr, trigger: "blur" }
    ],
    roleStatus: { required: true, message: "请选择状态", trigger: "blur", type: "number" },
    deptNames: { required: true, message: "请选择角色所属机构", trigger: "blur", type: "array" }
  }


  mounted() {
    // 组织机构树
    let treeSource = this.orgData.map(v => {
      return {
        id: v.id,
        pid: v.orgPid,
        value: v.id,
        label: v.orgName
      }
    })
    this.orgTreeData = this.$common.departmentData(treeSource)

    if (this.roleData) {
      console.log(this.roleData)
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
  private format(labels) {
    return labels[labels.length - 1];
  }

  /**
   * 获取选择的结果
   */
  private onChange(value) {
    this.model.orgId = value[value.length - 1]
  }


  /**
   * 添加权限
   */
  private addRole() {
    return new Promise((resolve, reject) => {
      this.sysRoleService.addRole(this.model).subscribe(
        data => resolve(true),
        err => reject(err)
      )
    })

  }

  /**
   * 修改权限
   */
  private modifyRole() {
    return new Promise((resolve, reject) => {
      this.sysRoleService.updateRole(this.model).subscribe(
        data => resolve(true),
        err => reject(err)
      )
    })
  }

  /**
   * 提交权限数据
   */
  submit() {
    let form = this.$refs['form'] as Form
    return new Promise((resolve) => {
      form.validate(v => {
        if (!v) return resolve(false)
        let result = this.roleData ? this.modifyRole() : this.addRole()
        result.then(v => {
          this.$Message.success("操作成功")
          resolve(true)
        }).catch(err => {
          this.$Message.error(err.msg)
          resolve(false)
        })
      })
    })
  }
}

</script>
<style lang="less">
.component.modify-role {
  .ivu-cascader-rel {
    width: auto;
  }
}
</style>
