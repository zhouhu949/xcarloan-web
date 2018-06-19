<!--分配角色-->
<template>
  <section class="component user-role-manage">
    <data-form ref="user-search-form" hidden-date-search :model="model" @on-search="searchRolesByAuth" :page="pageService">
      <template slot="input">
        <i-form-item prop="roleName" label="角色名：">
          <i-input v-model="model.roleName" placeholder="请输入角色名称"></i-input>
        </i-form-item>
        <i-form-item prop="roleStatus" label="是否启用：">
          <i-select v-model="model.roleStatus">
            <i-option v-for="{value,label} in $dict.getDictData(10007)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns1" :data="dataSet" ref="databox" @on-selection-change="onSelectionChanged" @onPageChange="searchRolesByAuth" :page="pageService" :height="500"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { SysRoleService } from "~/services/manage-service/sys-role.service";
import { SysUserService } from "~/services/manage-service/sys-user.service";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
@Component({
  components: {}
})
export default class UserRoleManage extends Vue {
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService;
  @Dependencies(SysUserService) private sysUserService: SysUserService;
  @Dependencies(PageService) private pageService: PageService;
  @Prop() userIds: any;

  // 用户所拥有的角色ID
  private userRoles: Set<Number> = new Set<Number>()
  private dataSet: Array<any> = [];
  private model: any = {
    roleName: "",
    roleStatus: ""
  };

  // 列配置
  private columns1 = [
    {
      align: "center",
      type: "selection",
      width: 60
    },
    {
      align: "center",
      title: "角色名称",
      key: "roleName",
      minWidth: this.$common.getColumnWidth(5)
    },
    {
      align: "center",
      title: "备注",
      key: "roleDesc",
      minWidth: this.$common.getColumnWidth(5)
    }
  ];

  /**
   * 选择项发生改变时
   */
  private onSelectionChanged(selections) {
    selections.forEach(v => this.userRoles.add(v.id))
  }

  /**
   * 获取用户的角色
   */
  private getUserRoles() {
    this.sysUserService.findUserRole(this.userIds[0])
      .subscribe(
        data => {
          data.forEach(v => this.userRoles.add(v.roleId));
          // this.searchRolesByAuth()
        },
        err => this.$Message.error(err.msg)
      )
  }

  /**
   * 获取自己所能分配的所有角色
   */
  private searchRolesByAuth() {
    this.sysRoleService.findAllRoleByAuth(this.model, this.pageService)
      .subscribe(
        data => {
          this.dataSet = data;
          // 如果有用户所拥有的角色，需要返显
          if (this.userRoles.size) {
            this.dataSet.forEach(v => {
              v._checked = this.userRoles.has(v.id)
            })
          }
        },
        err => this.$Message.error(err.msg)
      )
  }

  /**
   * 更新用户角色
   */
  updateUserRole() {
    return new Promise((resolve) => {
      this.sysUserService.userBatchAllocateRoles(Array.from(this.userRoles), this.userIds).subscribe(
        data => {
          this.$Message.success("更新成功")
          resolve(true)
        },
        err => {
          this.$Message.error(err.msg)
          resolve(false)
        }
      )
    })
  }

  async mounted() {
    if (this.userIds) {
      // 如果是一个用户，需要先获取用户所拥有的角色之后再获取所有的角色资源
      if (this.userIds.length === 1) await this.getUserRoles()
      this.searchRolesByAuth()
    }
  }

}
</script>
 <style lang="less" scoped>
</style>
