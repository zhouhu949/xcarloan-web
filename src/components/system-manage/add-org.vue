<!--新增组织-->
<template>
  <section class="component add-org">
    <i-form :label-width="110" class="addOrg" ref="add-org-form" :model="addModel" :rules="rules">
      <i-row>
        <i-col :span="24">
          <i-form-item label="机构名称" prop="deptName">
            <i-input v-model="addModel.deptName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="组织机构等级" prop="deptLevel">
            <i-select v-model="addModel.deptLevel" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0401')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="状态" prop="deptStatus">
            <i-select v-model="addModel.deptStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称" prop="companyId">
            <i-select v-model="addModel.companyId" :disabled="companyId !== null">
              <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="deptRemark">
            <i-input v-model="addModel.deptRemark" type="textarea"></i-input>
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
import { DepartmentService } from "~/services/manage-service/department.service";
import { CompanyService } from "~/services/manage-service/company.service";
import { Dependencies } from "~/core/decorator";
@Component({
  components: {}
})
export default class AddOrg extends Vue {
  @Dependencies(DepartmentService) private departmentService: DepartmentService;
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Prop() addOrgModel: any;
  private rules: any = {
    deptName: [
      {
        required: true,
        trigger: "blur",
        message: "请输入机构名称"
      }
    ]
  };
  private getAllCompany: any;
  private companyObject: Array<Object> = []; // 公司信息
  private addModel: any = {
    deptName: "",
    deptLevel: 402,
    deptStatus: 0,
    companyId: "",
    deptRemark: "",
    deptPid: 1
  };
  private companyId:any = '' //判断是否点击的是机构数的添加机构
  created() {}
  confirmAddOrg() {
    let _addOrg: any = this.$refs["add-org-form"];
    _addOrg.validate(valid => {
      if (valid) {
        if (this.addOrgModel && this.addOrgModel.id) {
          this.addModel.deptPid = this.addOrgModel.id;
        }
        this.addModel.deptCode = this.addOrgModel.deptCode;
        this.departmentService.createDepartment(this.addModel).subscribe(
          val => {
            this.$Message.success("添加成功！");
            this.resetInput();
            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
      }
    });
  }
  resetInput() {
    let _addOrgForm: any = this.$refs["add-org-form"];
    _addOrgForm.resetFields();
  }
  addDept(companyId) {
    console.log(companyId)
    this.addModel.deptLevel = this.addOrgModel.deptLevel + 1;
    this.addModel.companyId = companyId;
    this.companyId = companyId;
    this.getCompanys();
  }
  /**
   * 获取所有公司
   */
  getCompanys() {
    this.companyService.getAllEnableCompany(this.getAllCompany).subscribe(
      data => {
        this.companyObject = data;
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
}
</script>
<style lang="less" scoped>
.addOrg {
  position: relative;
  right: 30px;
}
</style>
