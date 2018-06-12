<!--修改角色--> 
<template>
  <section class="component module-power">
    <i-row :gutter="16">
      <!--树-->
      <i-col :span="10">
        <i-card title="模块名">
          <div class="module-name">
            <data-tree ref="data-tree" @on-currentChecked-change="onCurrentCheckedChange" show-checkbox :data="menuResourceData" @on-select-change="getControlResourcesById"></data-tree>
          </div>
        </i-card>
      </i-col>
      <!--表格-->
      <i-col :span="14">
        <i-card title="模块功能">
          <data-box ref="data-box" @on-selection-change="onSelectionChange" :showConfigColumn="false" :columns="columns" :data="controlResourceData"></data-box>
        </i-card>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Observable } from "rxjs";
import { RoleService } from "~/services/manage-service/role.service";
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { RoleResoService } from "~/services/manage-service/role-reso.service";
import { PageService } from "~/utils/page.service";
import DataTree from "~/components/common/data-tree.vue";

@Component({
  components: {
    DataBox,
    DataTree
  }
})
export default class ModulePower extends Vue {
  @Dependencies(RoleService) private roleService: RoleService;
  @Dependencies(RoleResoService) private roleResoService: RoleResoService;
  @Dependencies(PageService) private pageService: PageService;

  // 角色id
  @Prop() roleId;

  private resourceData = [];
  private menuResource = [];
  private controlResource = [];
  private menuResourceData = [];
  private controlResourceData = [];

  // 树组件
  private tree: any = {};

  private columns = [];

  created() {
    this.columns = [
      {
        align: "center",
        type: "index",
        title: "序号",
        minWidth: this.$common.getColumnWidth(1)
      },
      {
        align: "center",
        type: "selection",
        key: "_checked",
        title: "选择",
        minWidth: this.$common.getColumnWidth(1)
      },
      {
        align: "left",
        key: "resoname",
        title: "功能名称",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "left",
        key: "resoRemark",
        title: "描述",
        minWidth: this.$common.getColumnWidth(6)
      }
    ];
  }

  /**
   * 选择项发生改变的时候
   */
  onSelectionChange(selection) {
    let checkdIds = selection.map(v => v.id)
    this.controlResourceData.forEach(x => x._checked = checkdIds.includes(x.id))
  }

  /**
   * 当前选中节点的checked 发生变化
  */
  onCurrentCheckedChange(id, value) {
    this.controlResource.filter(x => x.pid === id).forEach(x => { x._checked = value })
  }

  /**
   * 获取控件资源通过id
   */
  getControlResourcesById(data) {
    this.controlResourceData = this.controlResource.filter(
      x => [423, 424, 425].includes(x.filetype) && x.pid === data.id
    )
  }

  /**
   * 获取资源数据
   * 分两组数据
   * menuResource 左侧树使用
   * controlResource 右侧列表使用
  */
  getResourceData() {
    this.roleResoService.findAllResourceAndMenu(this.roleId).subscribe(data => {
      // 全部资源数据
      this.resourceData = data;

      // 菜单资源数据
      this.menuResource = data.filter(x => [422, 421, 429].includes(x.filetype))
        .map(x => {
          x.title = x.resoname;
          return x
        });

      // 菜单资源数据
      this.controlResource = data.filter(x => [423, 424, 425].includes(x.filetype))
      // 转换_checked 属性值为Boolean类型
      this.controlResource.forEach(v => v._checked = Boolean(v._checked))

      this.createMenuResourceData();
    });
  }

  /**
   * 生成菜单资源数据
   * 生成树形结构
   */
  createMenuResourceData() {
    let parents = this.menuResource.filter(x => x.pid === 10000);

    let fun = item => {
      let children = this.menuResource.filter(x => x.pid === item.id);

      if (children && children.length) {
        item.children = children.map(fun);
      }

      return item;
    };

    this.menuResourceData = parents.map(fun);
  }


  mounted() {
    this.tree = this.$refs['data-tree']
    // 获取所有资源数据
    this.getResourceData();
  }

  public submit() {
    let menuResourceIds = this.tree.getCheckedKeys()
    let controlResourceIds = this.controlResource.filter(x => x._checked).map(x => x.id)
    return new Promise((resolve, reject) => {
      this.roleService.roleAllocateResources({
        roleId: this.roleId,
        resourcesId: [...menuResourceIds, ...controlResourceIds]
      }).subscribe(() => {
        this.$Message.success('模块权限配置成功！')
        resolve()
      }, err => {
        this.$Message.err(err.msg)
        reject()
      })
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
