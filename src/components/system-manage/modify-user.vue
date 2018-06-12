<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modify-user-form" :model="modifyModel" ref="modify-user" :rules="rules">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名" prop="userUsername">
            <i-input v-model="modifyModel.userUsername" :disabled="true"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名" prop="userUsername">
            <i-input v-model="modifyModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话" prop="userPhone">
            <i-input v-model="modifyModel.userPhone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱" prop="userEmail">
            <i-input v-model="modifyModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别" prop="userSex">
            <i-select v-model="modifyModel.userSex">
              <i-option v-for="{value,label} in $dict.getDictData('0406')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="数据权限" prop="userManager">
            <i-select v-model="modifyModel.userManager">
              <i-option v-for="{value,label} in $dict.getDictData('0405')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="所属机构" prop="deptNames">
            <Cascader :data="depatmentData" :render-format="format" v-model="modifyModel.deptNames" change-on-select></Cascader>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="公司名称" prop="companyName">
            <i-input v-model="modifyModel.companyName" :disabled="true"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="状态" prop="userStatus">
            <i-select v-model="modifyModel.userStatus">
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
            <i-input type="textarea" v-model="modifyModel.userRemark" :maxlength="100"></i-input>
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
import { ManageService } from "~/services/manage-service/manage.service";
import { Dependencies } from "~/core/decorator";
import { DepartmentService } from "~/services/manage-service/department.service";
import { CommonService } from "~/utils/common.service";

@Component({
  components: {}
})
export default class ModifyUser extends Vue {
  @Dependencies(ManageService) private manageService: ManageService;
  @Dependencies(DepartmentService) private departmentService: DepartmentService;
  @Prop() modifyUserModel: any;
  private modifyModel: any = {
    userUsername: "",
    userRealname: "",
    userPhone: "",
    userEmail: "",
    companyName: "",
    deptName: "",
    deptNames: [],
    userSex: "",
    userManager: "",
    userRemark: "",
    userStatus: 0
  };
  private rules: any;
  private allOrg: Array<any> = [];
  private depatmentData: any = [];

  created() {
    this.rules = {
      userUsername: { required: true, message: "用户名不能为空", trigger: "blur" },
      userRealname: { required: true, message: "姓名不能为空", trigger: "blur" },
      userPhone: { required: true, validator: this.$validator.phoneNumber, message: "请输入正确的电话号码", trigger: "blur" },
      userEmail: { required: true, message: "请输入正确的邮箱", trigger: "blur", type: "email" },
      userSex: { required: true, message: "请选择性别", type: "number", trigger: "blur" },
      userManager: { required: true, type: "number", message: "请选择数据权限", trigger: "change" },
      deptNames: { required: true, message: "用户必须有所属机构", trigger: "blur" }
    };
  }
  getAllDepartment(){
    //获取所有组织机构
    // 重组部门数据，以适应联级选择器
    this.manageService.getAllDepartment().subscribe(
      data => {
         let stairList = []
          for (let i of data) {
            if (i.deptPid == 0) {
              stairList.push({
                pid: i.deptPid,
                label: i.deptName,
                id: i.id,
                value: i.id,
                children: [],
              })
            }
          }
          for (let i of stairList) {
            for (let s of data) {
              if (i.id == s.deptPid) {
                i.children.push({
                  pid: s.deptPid,
                  label: s.deptName,
                  id: s.id,
                  value: s.id,
                  children: [],
                })
              }
            }
          }
          for (let i of stairList[0].children) {
            for (let s of data) {
              if (i.id == s.deptPid) {
                i.children.push({
                  pid: s.deptPid,
                  label: s.deptName,
                  id: s.id,
                  value: s.id,
                  children: [],
                })
              }
            }
          }
         this.depatmentData = stairList



        this.allOrg = data
        // let treeSource = data.map(v => {
        //   return {
        //     id: v.id,
        //     pid: v.deptPid,
        //     value: v.id,
        //     label: v.deptName
        //   }
        // })
        // this.depatmentData = CommonService.departmentData(treeSource)
        console.log(this.depatmentData)
      },
      err => this.$Message.error(err.msg)
    );
  }

  mounted() {
    this.getAllDepartment()  
  }

  cancelUpdate() {
    this.$emit("close");
  }
  updateUser() {
    this.modifyModel.deptId = this.modifyModel.deptName.id;
    this.manageService.updateUser(this.modifyModel).subscribe(
      val => {
        this.$Message.success("修改成功！");
        this.$emit("close");
      },
      err => this.$Message.error(err.msg)
    );
  }
  getData(data) {
    this.modifyModel.userUsername = data.userUsername;
    this.modifyModel.id = data.id;
    this.modifyModel.deptId = data.deptId;
    this.modifyModel.userRealname = data.userRealname;
    this.modifyModel.userPhone = data.userPhone;
    this.modifyModel.userEmail = data.userEmail;
    this.modifyModel.companyName = data.companyName;
    this.modifyModel.deptName = data.deptName;
    this.modifyModel.userSex = data.userSex;
    this.modifyModel.userManager = data.userManager;
    this.modifyModel.userRemark = data.userRemark;
    this.modifyModel.userStatus = data.userStatus;
    this.getAllDepartment()
    this.getOwnerData();
    // 根据deptId获取公司名称
    this.departmentService
      .findCompanyByDeptId({
        deptId: data.deptId
      })
      .subscribe(
      data => (this.modifyModel.companyName = data.companyChinaname)
      );
  }
  /**
   * 根据机构查询公司
   */
  changeOrg(val) {
    this.departmentService
      .findCompanyByDeptId({
        deptId: val
      })
      .subscribe(
      data => (this.modifyModel.companyName = data.companyChinaname)
      );
  }

  format(labels, selectedData) {
    const index = labels.length - 1;
    this.modifyModel.deptName = selectedData[index];
    return labels[index];
  }

  getOwnerData() {
    if (this.allOrg.length === 0) {
      return [];
    }
    let getParent = id => {
      let current = this.allOrg.find(v => v.id === id);
      if (current) {
        let parent = getParent(current.deptPid);
        return parent.concat(current);
      } else {
        return [];
      }
    };

    this.modifyModel.deptNames = getParent(this.modifyModel.deptId).map(
      v => v.id
    );
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
