<!--新增角色--> 
<template>
    <i-form :label-width="110" class="data-form role-maintenance" ref="add-role" :model="addRoleModel" :rules="rules">
      <i-form-item label="角色名称" prop="roleName">
        <i-input class="form-input" v-model="addRoleModel.roleName"></i-input>
      </i-form-item>
      <i-form-item label="状态" prop="roleStatus">
        <i-select class="form-input" v-model="addRoleModel.roleStatus">
          <i-option label="启用" :value="0" :key="0"></i-option>
          <i-option label="停用" :value="1" :key="1"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注" prop="roleRemark">
        <i-input type="textarea" class="form-input" v-model="addRoleModel.roleRemark"></i-input>
      </i-form-item>
    </i-form>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Form
  } from "iview"

  @Component({
    components: {
      DataBox
    }
  })
  export default class AddRole extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    private addRoleModel = {
      roleName: '',
      roleStatus: '',
      roleRemark: ''
    };
    private rules: any;
    @Prop()
    row: Object;

    created() {
      this.rules = {
        //  roleName: [    在输入框里面的验证
        //   { required: true, message: '请输入角色名称', trigger: 'blur' },
        //   { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/g, message: '角色名称存在特殊字符，请重新输入！', trigger: 'blur' }
        // ],
        roleName: [{
          trigger: 'blur',
          message: '请输入角色名称',
          required: true,
        }],
        roleStatus: [{
          trigger: 'change',
          message: '请选择角色状态',
          required: true,
          type: 'number'
        }]
      }
    }

    addRole() {
      let registerForm = < Form > this.$refs['add-role']
      registerForm.validate(valid => {
        if (valid) {
          this.manageService.createRole(this.addRoleModel).subscribe(val => {
            this.$Message.success('新增成功')
            this.$emit('refreshRoleList')
            this.reset()
          }, ({msg}) => {
            this.$Message.error(msg);
          })
        }
      })
    }
    // 新增角色 点击确定
      addChangeRole(){
        if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(this.addRoleModel.roleName.toString())){
            this.$Message.warning('角色名称存在特殊字符，请重新输入！')
        }else{
           this.addRole()
        }
      }
    reset() {
      let _addRole = < Form > this.$refs['add-role']
      _addRole.resetFields()
    }
  }

</script>
 <style lang="less" scoped>
    .data-form.role-maintenance{
        margin-top:20px;
        .form-input{
            width:260px;
        }
    }


 </style>
