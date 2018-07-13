<!-- 机构权限设置 -->
<template>
  <section class="component org-power">
    <i-tabs value="owner" type="card">
      <i-tab-pane label="拥有权限的机构" name="owner">
        <i-form ref="form-owner" :model="model" :label-width="110" inline :rules="rules">
          <i-form-item label="所属机构" prop="deptNames1">
            <Cascader :data="orgTreeData" :render-format="format" v-model="model.deptNames1" @on-change="val => onDeptChange(val,1)" change-on-select></Cascader>
          </i-form-item>
          <i-button type="primary" @click="appendOwnerOrg">添加</i-button>
        </i-form>
        <data-box :columns="columns1" :data="dataSet1" :showConfigColumn="false"></data-box>
      </i-tab-pane>
      <i-tab-pane label="排除权限的机构" name="exclude">
        <i-form ref="form-exclude" :model="model" :label-width="110" inline :rules="rules">
          <i-form-item label="所属机构" prop="deptNames2">
            <Cascader :data="orgTreeData" :render-format="format" v-model="model.deptNames2" @on-change="val => onDeptChange(val,2)" change-on-select></Cascader>
          </i-form-item>
          <i-button type="primary" @click="appendExceulde">添加</i-button>
        </i-form>
        <data-box :columns="columns2" :data="dataSet2" :showConfigColumn="false"></data-box>
      </i-tab-pane>
    </i-tabs>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysRoleService } from "~/services/manage-service/sys-role.service";
import { namespace } from "vuex-class";

const OrgModule = namespace("orgSpace")
enum operateType {
  /**
   * 包含
   */
  owner = 1,
  /**
   * 排除
   */
  exclude = 2
}

@Component({})
export default class OrgPower extends Vue {
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService;
  @Prop() roleId
  @OrgModule.Getter getOrgFormatData;

  private model = {
    deptNames1: [],
    owner: "",
    deptNames2: [],
    exclude: ""
  }

  private rules = {
    deptNames1: { required: true, message: '请选择拥有权限的机构', trigger: 'blur', type: 'array' },
    deptNames2: { required: true, message: '请选择排除权限的机构', trigger: 'blur', type: 'array' }
  }

  // 机构级联数据
  private orgTreeData = []


  private dataSet1: any = [];
  private dataSet2: any = [];

  private columns1: any = []
  private columns2: any = []

  private createColumn(type: operateType) {
    return [
      {
        title: '操作',
        width: this.$common.getOperateWidth(1),
        fixed: 'left',
        align: 'center',
        render: (h, { row, column, index }) => h('div', [
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
              on: {
                click: () => {
                  this.deleteOrgOnRole(row, type)
                }
              }
            },
            '删除'
          )
        ])
      },
      {
        align: 'center',
        editable: true,
        title: '机构名称',
        key: 'orgName'
      }
    ]
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
  private onDeptChange(value, type) {
    let name = operateType[type]
    this.model[name] = value[value.length - 1]
  }

  /**
   * 删除权限 包含/排除机构
   */
  private deleteOrgOnRole(row, type) {
    let orgName = row.orgName
    this.$Modal.confirm({
      title: "提示",
      content: `确定删除 <b>${orgName}</b> 的权限吗？`,
      onOk: () => {
        if (type === operateType.owner) {
          this.sysRoleService.deleteRoleOrg(row.id).subscribe(
            data => {
              this.$Message.success("删除成功")
              this.getOwnerOrg()
            },
            err => this.$Message.error(err.msg)
          )
        } else {
          this.sysRoleService.deleteRoleExceptOrg(row.id).subscribe(
            data => {
              this.$Message.success("删除成功")
              this.getExcludeOrg()
            },
            err => this.$Message.error(err.msg)
          )
        }
      }
    })

  }

  /**
   * 获取包含权限的机构列表
   */
  private getOwnerOrg() {
    this.sysRoleService.findRoleOrg(this.roleId).subscribe(
      data => this.dataSet1 = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 获取不包含权限的列表
   */
  private getExcludeOrg() {
    this.sysRoleService.findRoleExceptOrg(this.roleId).subscribe(
      data => this.dataSet2 = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 添加包含权限的机构
   */
  private appendOwnerOrg() {
    let form: any = this.$refs['form-owner']
    form.validate(v => {
      if (v) {
        this.sysRoleService.roleOrg(this.roleId, [this.model.owner]).subscribe(
          data => this.getOwnerOrg(),
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

  /**
   * 添加不包含权限的机构
   */
  private appendExceulde() {
    let form: any = this.$refs['form-exclude']
    form.validate(v => {
      if (v) {
        this.sysRoleService.roleExceptOrg(this.roleId, [this.model.exclude]).subscribe(
          data => this.getExcludeOrg(),
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

  created() {
    // 创建列配置
    this.columns1 = this.createColumn(operateType.owner)
    this.columns2 = this.createColumn(operateType.exclude)
  }

  mounted() {
    // 生成机构级联数据
    this.orgTreeData = this.$common.generateTreeData(this.getOrgFormatData)
    this.getOwnerOrg()
    this.getExcludeOrg()
  }

}
</script>

<style lang="less">
.component.org-power {
  .ivu-cascader-rel {
    width: auto;
  }
}
</style>

