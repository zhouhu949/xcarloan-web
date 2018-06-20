<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modify-user-form" :model="model" ref="modify-user" :rules="rules">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名" prop="userName">
            <i-input v-model="model.userName" :readonly="!orgId"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名" prop="realName">
            <i-input v-model="model.realName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话" prop="phone">
            <i-input v-model="model.phone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱" prop="email">
            <i-input v-model="model.email"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别" prop="sex">
            <i-select v-model="model.sex">
              <i-option v-for="{value,label} in $dict.getDictData(10008)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="所属机构" prop="deptNames">
            <Cascader :data="orgTreeData" :render-format="format" v-model="model.deptNames" @on-change="onDeptChange" change-on-select :disabled="!!orgId"></Cascader>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="是否启用" prop="state">
            <i-select v-model="model.state">
              <i-option v-for="{value,label} in $dict.getDictData(10007)" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12"></i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="remark">
            <i-input type="textarea" v-model="model.remark" :maxlength="100"></i-input>
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
import { Dependencies } from "~/core/decorator";
import { SysOrgService } from "~/services/manage-service/sys-org.service";
import { CommonService } from "~/utils/common.service";
import { SysUserService } from "~/services/manage-service/sys-user.service";
import { State, namespace } from "vuex-class";
import { Form } from "iview";

const OrgMoudle = namespace("orgSpace")

@Component({
  components: {}
})
export default class ModifyUser extends Vue {
  @Dependencies(SysUserService) private sysUserService: SysUserService;
  @Dependencies(SysOrgService) private sysOrgService: SysOrgService;
  // 机构数据
  @OrgMoudle.State orgData;
  @OrgMoudle.Getter getOwnerData;
  @Prop() userData;
  @Prop() orgId;

  private form: Form;
  private model: any = {
    userName: "",
    realName: "",
    phone: "",
    email: "",
    deptNames: [],
    orgId: "",
    sex: "",
    remark: "",
    state: 10022 // 启用
  };

  private rules: any;
  private orgTreeData: any = [];

  created() {
    this.rules = {
      userName: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { validator: this.$validator.userName, trigger: "blur" }
      ],
      realName: { required: true, message: "姓名不能为空", trigger: "blur" },
      phone: [
        { required: true, message: "电话号码不能为空", trigger: "blur" },
        { validator: this.$validator.phoneNumber, trigger: "blur" }
      ],
      email: { required: true, message: "请输入正确的邮箱", trigger: "blur", type: "email" },
      sex: { required: true, message: "请选择性别", trigger: "blur", type: "number" },
      deptNames: { required: true, message: "用户必须有所属机构", trigger: "blur", type: "array" }
    };
  }


  mounted() {
    this.form = this.$refs["modify-user"] as Form
    // 组织机构树
    let treeSource = this.orgData.map(v => {
      return {
        id: v.id,
        pid: v.orgPid,
        value: v.id,
        label: v.orgName
      }
    })
    this.orgTreeData = this.$common.generateTreeData(treeSource)
    // 判断属性是否传了orgId
    if (this.orgId) {
      this.model.orgId = this.orgId
    } else {
      this.model = {
        orgId: this.userData.deptId,
        id: this.userData.id,
        userName: this.userData.userUsername,
        realName: this.userData.userRealname,
        phone: this.userData.userPhone,
        email: this.userData.userEmail,
        deptNames: [],
        sex: this.userData.userSex,
        remark: this.userData.userRemark,
        state: this.userData.userStatus // 启用
      }
    }
    this.model.deptNames = this.getOwnerData(this.model.orgId)
  }

  /**
   * 更新用户
   */
  updateUser() {
    return new Promise((resolve) => {
      this.form.validate(v => {
        if (!v) return resolve(false)
        this.sysUserService.updateUser(this.model).subscribe(
          data => {
            this.$Message.success('修改用户成功')
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

  /**
   * 新增用户
   */
  createUser() {
    return new Promise((resolve) => {
      this.form.validate(v => {
        if (!v) return resolve(false)
        this.sysUserService.addUser(this.model).subscribe(
          data => {
            this.$Message.success('新增用户成功')
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

  /**
   * 级联选择器选择之后显示的内容
   */
  private format(labels) {
    return labels[labels.length - 1];
  }

  /**
   * 当级联选择器选择的值发生改变时
   */
  private onDeptChange(value) {
    this.model.orgId = value[value.length - 1]
  }
}
</script>


<style lang="less">
.component.modify-user {
  .modify-user-form {
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
