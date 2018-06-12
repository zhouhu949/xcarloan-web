<template>
  <section class="login-page theme-defaultaasd">
    <i-row type="flex" justify="center" align="middle" class="full-absolute">
      <div class="login-bg">
      </div>
      <div>
        <div style="position: relative;left: 350px;color:#fff;text-align:center;margin-bottom:28px;">
          <img src="/static/images/common/logo.png" alt="">
          <span style="font-size:12px;margin-left:4px;">v2.0.0</span>
        </div>
        <div class="loginContainer">
          <div style="font-size:20px;color:#1D4F8B;font-weight:bold;margin-bottom:20px;margin-left:56px;font-family:AdobeHeitiStd-Regular">登录</div>
          <div style="display:flex;justify-content:center;">
            <i-form ref="login-form" :model="loginModel" :rules="loginRule" :label-width="0" style="position:relative;">
              <i-form-item prop="username" label="用户名">
                <i-input type="text" size="large" v-model="loginModel.username" placeholder="用户名" @on-keyup.enter="submitForm" @on-change="checkAccount">
                </i-input>
              </i-form-item>
              <i-form-item prop="password" label="密码">
                <i-input type="password" size="large" v-model="loginModel.password" placeholder="密码" @on-keyup.enter="submitForm"></i-input>
              </i-form-item>
              <i-form-item class="remember">
                <i-checkbox v-model="loginModel.remember">
                  <span>记住用户名与密码</span>
                </i-checkbox>
                <i-button type="text" style="float:right;color:#1D4F8B" @click="registerModal = true">注册</i-button>
              </i-form-item>
              <i-form-item :label-width="0" style="text-align:center">
                <i-button class="submit_btn blueButton" @click="submitForm">登录</i-button>
              </i-form-item>
            </i-form>
          </div>
        </div>
      </div>
    </i-row>
    <div style="width:100%;color:#999999;position:absolute;bottom:20px;text-align:center">© 2018 Zhiwang All Rights Reserved. For Internal Use Only</div>

    <template>
      <i-modal title="新用户注册" v-model="registerModal">
        <register @close="registerModal=false" ref="register"></register>
        <div slot="footer">
          <i-button @click="cancelRegister">取消</i-button>
          <i-button @click="confirmRegister" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoginService } from "~/services/manage-service/login.service";
import { Dependencies } from "~/core/decorator";
import { Action } from "vuex-class";
import AppConfig from "~/config/app.config";
import Register from "~/components/common/register.vue";
import { StorageService } from "~/utils/storage.service";

@Component({
  components: {
    Register
  }
})
export default class Login extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  @Action("updateUserLoginData") updateUserLoginData;

  private loginRule: Object = {};
  private loginModel: any = {
    username: "",
    password: "",
    remember: false
  };
  private registerModal: Boolean = false;

  mounted() {
    if (StorageService.getItem("account") !== null) {
      this.loginModel.username = StorageService.getItem("account").username;
      this.loginModel.password = StorageService.getItem("account").password;
      this.loginModel.remember = true;
    }
  }
  created() {
    // 设置表单数据
    // this.loginModel = {};

    // 设置验证规则
    this.loginRule = {
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      ]
    };
  }

  /**
   * 取消注册
   */
  cancelRegister() {
    this.registerModal = false;
    let _register: any = this.$refs["register"];
    _register.resetForm();
  }

  /**
   * 确定注册
   */
  confirmRegister() {
    let _register: any = this.$refs["register"];
    _register.registerClick();
  }
  /**
   * 提交登录表单
   */
  submitForm() {
    let loginForm: any = this.$refs["login-form"];
    loginForm.validate(success => {
      if (!success) {
        return;
      }

      this.loginService
        .login({
          username: this.loginModel.username,
          password: this.loginModel.password,
          loginDevice: 414,
          loginType: 411
        })
        .subscribe(
          async data => {
            // 更新基础数据
            await this.updateUserLoginData(data);
            // 进入首页
            this.$router.push("/home");

            if (this.loginModel.remember) {
              StorageService.setItem("account", {
                username: this.loginModel.username,
                password: this.loginModel.password,
                timing: new Date(
                  +new Date() + 1000 * 60 * 60 * 24 * 7
                ).valueOf() // 默认七天过期
              });
            } else {
              StorageService.removeItem("account");
            }
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    });
  }
  /**
   * 如果账号重新输入，密码清空、验证码刷新、记住账号取消
   */
  checkAccount() {
    if (!this.loginModel.username) {
      console.log(878);
      this.loginModel.password = "";
      this.loginModel.remember = false;
      // this.$refs['verify-code'].reset()
    }
  }
}
</script>
<style lang="less" scoped>
.calculate {
  .ivu-modal-footer {
    display: none !important;
  }
}

.full-absolute {
  background: #265ea3;
}

.login-bg {
  width: 500px;
  height: 500px;
  background: url("/static/images/common/login-bg.png");
  position: absolute;
  left: 140px;
  background-repeat: no-repeat;
  background-size: 500px 500px;
}

// .login-form {
//   width: 270px;
//   position: relative;
//   left: 55px;
//   position: absolute;
// }
.submit_btn {
  width: 270px;
  height: 40px;
  background: #265ea2;
  color: #fff;
}

.submit_btn:hover {
  background: #1d4f8b;
  color: #fff;
}

.loginContainer {
  border: 1px solid #dddddd;
  background: white;
  height: 409px;
  width: 378px;
  padding-top: 50px;
  position: relative;
  left: 350px;
  bottom: 20px;
}
</style>
