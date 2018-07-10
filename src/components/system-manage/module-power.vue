<!--修改角色--> 
<template>
  <section class="component module-power">
    <i-row :gutter="16">
      <!--树-->
      <i-col :span="10">
        <i-card title="模块名">
          <div class="module-name">
            <data-tree ref="data-tree" @on-currentChecked-change="onCurrentCheckedChange" show-checkbox :data="menuResourceData" @on-select-change="(data) => currentNode = data"></data-tree>
          </div>
        </i-card>
      </i-col>
      <!--表格-->
      <i-col :span="14">
        <i-card title="模块功能">
          <data-box ref="data-box" @on-selection-change="onSelectionChange" :showConfigColumn="false" :columns="columns" :data="currentMenuControlResource"></data-box>
        </i-card>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { SysRoleService } from "~/services/manage-service/sys-role.service";
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysModuleService } from "~/services/manage-service/sys-module.service";
import { PageService } from "~/utils/page.service";
import DataTree from "~/components/common/data-tree.vue";
import { State } from "vuex-class";

@Component({
  components: {
    DataBox,
    DataTree
  }
})
export default class ModulePower extends Vue {
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService;
  @Dependencies(SysModuleService) private sysModuleService: SysModuleService;
  @Dependencies(PageService) private pageService: PageService;

  // 角色id
  @Prop() roleId;
  // 菜单资源 state 只可作为基础数据。（不可绑定，可做COPY)
  @State menuResource;
  // 控件资源 state 只可作为基础数据。（不可绑定，可做COPY)
  @State controlResource;

  private menuResourceData = [];
  private controlResourceData = [];

  // 当前选中节点
  private currentNode: any = {};


  /**
   * 当前菜单对应的控件资源
   */
  get currentMenuControlResource() {
    return this.controlResourceData.filter(v => v.pid === this.currentNode.id)
  }

  // 树组件
  private tree: any = {};

  private columns = [];

  created() {
    this.columns = [
      {
        align: "center",
        type: "selection",
        key: "_checked",
        title: "选择",
        minWidth: this.$common.getColumnWidth(1)
      },
      {
        align: "left",
        key: "resourceName",
        title: "功能名称",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "left",
        key: "remark",
        title: "描述",
        minWidth: this.$common.getColumnWidth(6)
      }
    ];
  }

  /**
   * 选择项发生改变的时候
   */
  onSelectionChange(selection) {
    let checkdIds: Array<Number> = selection.map(v => v.id)
    this.currentMenuControlResource.forEach(v => v._checked = checkdIds.includes(v.id))
    if (this.currentMenuControlResource.length > 1) {
      this.currentNode._checked = true
    }
  }

  /**
   * 当前选中节点的checked 发生变化
  */
  onCurrentCheckedChange(id, value) {
    if (!value) {
      this.controlResourceData.filter(v => v.pid === id).forEach(v => v._checked = value)
    }
  }


  mounted() {
    this.tree = this.$refs['data-tree']
    let option = { keyName: "id", parentKeyName: "resourcePid" }
    let treeData = this.$common.generateTreeData(this.menuResource, option)
    Promise.all([this.getMenuByRole(), this.getResourceByRole()]).then(([menus, resources]) => {
      // 获取所有资源数据
      function getNodes(data) {
        if (!data) return
        return data.map(v => {
          return {
            id: v.id,
            title: v.resourceName,
            _checked: (menus as Array<Number>).includes(v.id),
            children: getNodes(v.children)
          }
        })
      }
      // 返回组合后的菜单树数据
      this.menuResourceData = getNodes(treeData)
      this.controlResourceData = this.controlResource.map(v => Object.assign({ _checked: (resources as Array<Number>).includes(v.id) }, v))
    })
  }



  /**
   * 根据角色获取菜单
   */
  private getMenuByRole() {
    return new Promise((resolve, reject) => {
      this.sysModuleService.findMenuByRoleId(this.roleId).subscribe(
        data => resolve(data.map(v => v.id)),
        err => reject(err)
      )
    })
  }

  /**
   * 根据角色获取资源
   */
  private getResourceByRole() {
    return new Promise((resolve, reject) => {
      this.sysModuleService.findResourceByRoleId(this.roleId).subscribe(
        data => resolve(data.map(v => v.id)),
        err => reject(err)
      )
    })
  }

  /**
   * 提交修改
   */
  public submit() {
    let menuResourceIds = this.tree.getCheckedKeys()
    let controlResourceIds = this.controlResourceData.filter(x => x._checked).map(x => x.id)
    return new Promise((resolve) => {
      this.sysRoleService.roleResource(this.roleId, [...menuResourceIds, ...controlResourceIds])
        .subscribe(
          () => {
            this.$Message.success('模块权限配置成功！')
            resolve(true)
          }, err => {
            this.$Message.err(err.msg)
            resolve(false)
          }
        )
    })
  }
}
</script>
<style  lang="less" scoped>
.component.module-power {
  .module-name {
    height: 600px;
    overflow: auto;
  }
}
</style>
