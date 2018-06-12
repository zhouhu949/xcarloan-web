<!--注册-->
<template>
  <section class="component register">
    <i-form :label-width="70" ref="register-form" :model="registerModel" class="register-form" label-position="left" :rules="rules">
      <i-form-item label="用户名" prop="userUsername">
        <i-input v-model="registerModel.userUsername" style="width:80%;" :maxlength="20"></i-input>
      </i-form-item>
      <i-form-item label="姓名" prop="userRealname">
        <i-input v-model="registerModel.userRealname" style="width:80%;" :maxlength="20"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="userPhone">
        <i-input v-model="registerModel.userPhone" style="width:80%;" :maxlength="11"></i-input>
      </i-form-item>
      <i-form-item label="密码" prop="userPassword">
        <i-input v-model="registerModel.userPassword" :type="inputType" style="width:80%;" :maxlength="20">
          <i-switch slot="append" size="small" @on-change="eyePass"></i-switch>
        </i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="confirmPwd">
        <i-input v-model="registerModel.confirmPwd" :type="inputType" style="width:80%;" :maxlength="20"></i-input>
      </i-form-item>
      <i-form-item label="所属公司" prop="company">
        <i-input v-model="registerModel.company" style="width:80%;"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import md5 from "md5";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { UserService } from "~/services/manage-service/user.service";
import { Form } from "iview";
@Component({
  components: {}
})
export default class Register extends Vue {
  @Dependencies(UserService) private userService: UserService;
  private registerModel: any = {
    userUsername: "",
    userRealname: "",
    userPassword: "",
    confirmPwd: "",
    userPhone: "",
    company: ""
  };
  private inputType: any = "password";
  private rules: any;

  created() {
    this.rules = {
      userUsername: [
        {
          required: true,
          validator: this.checkUserName,
          trigger: "blur"
        }
      ],
      userRealname: [
        {
          required: true,
          validator: this.checkRealname,
          trigger: "blur"
        }
      ],
      userPassword: [
        {
          required: true,
          validator: this.checkPwd,
          trigger: "blur"
        }
      ],
      confirmPwd: [
        {
          required: true,
          validator: this.comfirmPw,
          trigger: "blur"
        }
      ],
      userPhone: [
        {
          required: true,
          validator: this.checkUserPhone,
          trigger: "blur"
        }
      ]
    };
  }
  comfirmPw(rule, value, callback) {
    if (!value) {
      return callback(new Error("密码不能为空"))
    } else if (value.length < 6) {
      return callback(new Error("密码长度为6到20位,请重新输入！"))
    } else {
      callback()
    }
    // if (this.registerModel.confirmPwd.length < 6) {
    //   this.$Message.error("密码长度为6到20位,请重新输入！");
    //   return false;
    // }
    // if (this.registerModel.confirmPwd !== this.registerModel.userPassword) {
    //   this.$Message.error("两次密码输入不一致，请重新输入!");
    //   return false;
    // }
  }
  /**
   * 检查姓名
   */
  checkRealname(rule, value, callback) {
    if (!value) {
      return callback(new Error("姓名不能为空"))
    } else if (!(/^[A-Za-z\u4e00-\u9fa5]+$/).test(value)) {
      return callback(new Error("姓名汉字或者与英文组合,请重新输入！"))
    } else {
      callback()
    }
    // if (!(/^[A-Za-z\u4e00-\u9fa5]+$/).test(this.registerModel.userRealname.toString())) {
    //   this.$Message.error("姓名汉字或者与英文组合,请重新输入！");
    //   this.registerModel.userRealname = "";
    //   return false;
    // }
  }
  /**
   * 检查用户名
   */
  checkUserName(rule, value, callback) {
    if (!value) {
      return callback(new Error("用户名不能为空"))
    } else if (value.length < 6 || !(/^[0-9a-zA-Z]+$/).test(value)) {
      return callback(new Error("用户名为6到20位英文或者与数字组合,请重新输入！"))
    } else {
      callback()
    }
    // if (this.registerModel.userUsername.length < 6 || !(/^[0-9a-zA-Z]+$/).test(this.registerModel.userUsername.toString())) {
    //   this.$Message.error("用户名为6到20位英文或者与数字组合,请重新输入！");
    //   this.registerModel.userUsername = "";
    //   return false;
    // }
  }
  /**
   * 检查密码长度
   */
  checkPwd(rule, value, callback) {
    if (!value) {
      return callback(new Error("密码不能为空"))
    } else if (value.length < 6) {
      return callback(new Error("密码长度为6到20位数字或英文组合,请重新输入！"))
    } else {
      callback()
    }
    // if (this.registerModel.userPassword.length < 6) {
    //   this.$Message.error("密码长度为6到20位,请重新输入！");
    //   this.registerModel.userPassword = "";
    //   return false;
    // }
  }
  /**
   * 检查电话号码
   */
  checkUserPhone(rule, value, callback) {
    if (!value) {
      return callback(new Error("手机号码不能为空"))
    } else if (!(/^1(3|4|5|7|8)\d{9}$/).test(value)) {
      return callback(new Error("手机号码为11位数字,请重新输入！"))
    } else {
      callback()
    }
    //
    // if(!((/^1(3|4|5|7|8)\d{9}$/).test(this.registerModel.userPhone.toString()))){
    //   this.$Message.error("手机号码为11位数字,请重新输入！");
    //   this.registerModel.userPhone = "";
    //   return false;
    // }
  }
  eyePass() {
    if (this.inputType == "password") {
      this.inputType = "text"
    } else {
      this.inputType = "password"
    }
  }
  /**
   * 重置表单
   */
  resetForm() {
    let register: any = this.$refs["register-form"];
    register.resetFields();
  }
  registerClick() {
    let registerForm: any = this.$refs["register-form"];
    registerForm.validate(valid => {
      if (!valid) return false;
      if (this.registerModel.confirmPwd !== this.registerModel.userPassword) {
        this.$Message.error("两次密码输入不一致，请重新输入!");
        return false;
      }
      this.userService.userRegister({
        userUsername: this.registerModel.userUsername,
        userRealname: this.registerModel.userRealname,
        userPassword: md5(this.registerModel.confirmPwd),
        confirmPwd: md5(this.registerModel.confirmPwd),
        userPhone: this.registerModel.userPhone,
        company: this.registerModel.company
      }).subscribe(
        data => {
          this.$Message.success("注册成功!");
          this.$emit("close");
          this.resetForm();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
        );
    });
  }
}
</script>

<style lang="less">
.register {
  .ivu-form {
    position: relative;
    left: 40px;
  }
}
</style>
