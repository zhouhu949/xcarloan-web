<!--修改角色-->
<template>
  <section class="component modify-role">
    <i-form class="data-form" :model="modifyModel" :label-width="110">
      <i-form-item label="角色名称" prop="roleName">
        <i-input v-model="modifyModel.roleName"></i-input>
      </i-form-item>
      <i-form-item label="状态" prop="roleStatus">
        <i-select v-model="modifyModel.roleStatus">
          <i-option label="启用" :value="0" :key="0"></i-option>
          <i-option label="停用" :value="1" :key="1"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注" prop="roleRemark">
        <i-input type="textarea" v-model="modifyModel.roleRemark" :maxlength="100"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Form
  } from 'iview';
  @Component({})
  export default class ModifyRole extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    @Prop() modifyRoleModel

    private modifyModel: any = {
      roleName: '',
      roleStatus: '',
      roleRemark: ''
    }

    created() {}

    makeData(row) {
      this.modifyModel.id = row.id
      this.modifyModel.roleName = row.roleName
      this.modifyModel.roleStatus = row.roleStatus
      this.modifyModel.roleRemark = row.roleRemark
    }

    changeRole(){
      if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(this.modifyModel.roleName.toString())){
          this.$Message.warning('角色名称存在特殊字符，请重新输入！')
      }else{
        this.manageService.updateRole(this.modifyModel).subscribe(val => {
          this.$Message.success('修改成功！')
          this.$emit('close')
        }, ({
              msg
            }) => {
          this.$Message.error(msg)
        })
      }
    }
  }

</script>
<style lang="less" scoped>
  .component.modify-role{
      .data-form{
          margin-top:20px;
      }
  }

</style>
