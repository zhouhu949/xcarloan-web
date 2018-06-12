<!--新增组织-->
<template>
  <section class="component edit-org">
    <i-form :label-width="110" class="editOrg" ref="add-org-form" :model="deptObj" :rules="rules">
      <i-row>
        <i-col :span="24">
          <i-form-item label="机构名称" prop="deptName">
            <i-input v-model="deptObj.deptName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="组织机构等级" prop="deptLevel">
            <i-select v-model="deptObj.deptLevel" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0401')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="状态" prop="deptStatus">
            <i-select v-model="deptObj.deptStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称" prop="companyId">
            <i-select v-model="deptObj.companyId" disabled>
              <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="deptRemark">
            <i-input v-model="deptObj.deptRemark" type="textarea"></i-input>
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
import { Dependencies } from "~/core/decorator";
import { CompanyService } from "~/services/manage-service/company.service";
@Component({
  components: {}
})
export default class EditOrg extends Vue {
  @Dependencies(DepartmentService) private departmentService: DepartmentService;
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Prop() deptObject;
  @Watch("deptObject")
  updateDeptObject() {}
  @Prop({
    default: 1
  })
  deptPid;
  private rules: any;
  private deptObj: any = {
    deptName: "",
    deptLevel: "",
    deptStatus: "",
    companyId: "",
    deptRemark: ""
  };
  private companyObject: Array<Object> = []; // 公司信息
  private allCompany: any = {};
  created() {
    this.rules = {
      deptName: [
        {
          required: true,
          trigger: "blur",
          message: "请输入机构名称"
        }
      ]
    };
  }
  /**
   * 添加组织机构
   */
  addOrg(val) {
    this.deptObject.deptLevel = val;
    this.deptObject.deptCode = this.deptObject.deptCode;
    this.deptObject.deptPid = this.deptPid;
  }

  confirmEditOrg() {
    let _addOrg: any = this.$refs["add-org-form"];
    _addOrg.validate(valid => {
      if (valid) {
        this.departmentService.updateDepartment(this.deptObj).subscribe(
          val => {
            this.$Message.success("编辑成功！");
            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
      }
    });
  }
  /**
   * 获取dept
   */
  getDeptInfo(val) {
    this.deptObj.deptName = this.deptObject.deptName;
    this.deptObj.deptLevel = this.deptObject.deptLevel;
    this.deptObj.deptStatus = this.deptObject.deptStatus;
    this.deptObj.companyId = this.deptObject.companyId;
    this.deptObj.deptRemark = this.deptObject.deptRemark;
    this.deptObj.deptCode = this.deptObject.deptCode;
    this.deptObj.deptPid = this.deptObject.deptPid;
    this.deptObj.id = this.deptObject.id;

    // 获取所有公司
    this.companyService.getAllCompany().subscribe(
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
    .component.edit-org{
        .editOrg{
            position: relative;
            right: 30px;
        }
    }

</style>
