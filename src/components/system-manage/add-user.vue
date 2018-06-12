<!--新增用户-->
<template>
  <section class="component add-user">
    <i-form :label-width="110"  class="add-user-form" :model="addUserModel" ref="add-user" :rules="rules">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名" prop="userUsername">
            <i-input v-model="addUserModel.userUsername" :maxlength="50"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名" prop="userRealname">
            <i-input v-model="addUserModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话" prop="userPhone">
            <i-input v-model="addUserModel.userPhone" :maxlength="11"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱" prop="userEmail">
            <i-input v-model="addUserModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别" prop="userSex">
            <i-select v-model="addUserModel.userSex">
              <i-option v-for="{value,label} in $dict.getDictData('0406')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="数据权限" prop="userManager">
            <i-select v-model="addUserModel.userManager">
              <i-option v-for="{value,label} in $dict.getDictData('0405')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="所属机构" prop="deptName">
            <i-input v-model="addUserModel.deptName" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="公司名称" prop="companyName">
            <i-input v-model="addUserModel.companyName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="状态" prop="userStatus">
            <i-select v-model="addUserModel.userStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12"></i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="userRemark">
            <i-input type="textarea" v-model="addUserModel.userRemark" :maxlength="100"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { ManageService } from "~/services/manage-service/manage.service";

@Component({
  components: {}
})
export default class AddUser extends Vue {
  @Dependencies(ManageService) private manageService: ManageService;
  @Prop() deptObject;
  @Watch("deptObject")
  updateDeptObject() { }
  private addUserModel: any = {
    userPhone: "",
    companyName: "",
    deptId: 1,
    deptName: "",
    userUsername: "",
    userRealname: "",
    userEmail: "",
    userSex: "",
    userManager: "",
    userRemark: "",
    loginDevice: 414,
    loginType: 411,
    userType: 409,
    userStatus: 0
  };
  private rules: any;

  mounted() { }
  created() {
    this.rules = {
      userUsername: [{
        required: true,
        message: "用户名不能为空",
        trigger: "blur"
      },
      {
        message: "用户名为6到50位英文数字组合",
        trigger: "blur",
        pattern: /^[0-9a-zA-Z]{6,50}$/
      }
      ],
      userRealname: [{
        required: true,
        message: "姓名不能为空",
        trigger: "blur"
      },
      {
        message: "姓名为汉字或英文",
        trigger: "blur",
        pattern: /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/
      }
      ],
      userPhone: [{
        required: true,
        message: "电话号码不能为空",
        trigger: "blur"
      },
      {
        message: "请输入正确的电话号码",
        trigger: "blur",
        pattern: /^1(3|4|5|7|8)\d{9}$/
      }
      ],
      userEmail: [{
        required: true,
        message: "邮箱不能为空",
        trigger: "blur"
      },
      {
        message: "请输入正确的邮箱",
        trigger: "blur",
        type: "email"
      }
      ],
      userSex: [{
        required: true,
        message: "请选择性别",
        type: "number",
        trigger: "change"
      }],
      userManager: [{
        required: true,
        type: "number",
        message: "请选择数据权限",
        trigger: "change"
      }]
    };
  }
  // /**
  //  * 检查用户名长度
  //  */
  // checkUserName() {
  //   if (this.addUserModel.userUsername.length < 6) {
  //     this.$Message.error("用户名长度为6到50位,请重新输入！");
  //     this.addUserModel.userUsername = "";
  //     return;
  //   }
  // }
  makeData(obj) {
    this.addUserModel.deptName = obj.deptName;
    this.addUserModel.companyName = obj.companyName;
  }
  confirmAddUser() {
    // 获取相关数据
    this.addUserModel.deptId = this.deptObject.id;
    this.addUserModel.companyName = this.deptObject.companyName;
    this.addUserModel.deptName = this.deptObject.deptName;

    let registerForm = <Form>this.$refs["add-user"];
    registerForm.validate(valid => {
      if (valid) {
        this.manageService.createUser(this.addUserModel).subscribe(
          val => {
            this.$Message.success("新增成功!");
            this.$emit("close");
          },
          ({
              msg
            }) => {
            this.$Message.error(msg);
          }
        );
      }
    });
  }
  /**
   * 取消
   */
  cancelAddUser() { }
  resetForm() {
    let _addUserForm: any = this.$refs["add-user"];
    _addUserForm.resetFields();
  }
}

</script>
<style lang="less">
.component.add-user {
  .add-user-form {
    position: relative;
    right: 30px;
  }
  .ivu-form {
    .ivu-input-type,
    .ivu-input-wrapper,
    .ivu-select,
    .ivu-input-number,
    .ivu-select-single .ivu-select-selection {
      width: 100%;
    }
  }
}
</style>
