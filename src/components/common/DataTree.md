# DataTree 使用说明

> dataTree 可用于展示树型数据，故也可以展示List列表数据

```typescript
// ts
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Layout } from "~/core/decorator";
// 引入dataTree组件
import DataTree from "~/components/common/data-tree.vue";
// 引入dataTreeNode 支持的编辑操作 新增，修改，删除
import { EditType } from "~/config/enum.config";

@Layout("workspace")
@Component({
  components: {
    DataTree
  }
})
export default class RepayScheme extends Page {

  // 编辑类型
  private readonly editConfig = [EditType.MODIFY, EditType.DELETE];
  private treeData: Array<any> = [];
  // 当前选中项
  private currentNode: any = null;
  // 服务端获取的数据？
  private dataSet: any = []
  mounted() {
    this.treeData = this.$common.generateTreeData(this.dataSet)
  }

```
```html
    <...>
      <data-tree :data="treeData" showEdit :editConfig="editConfig" @on-select-change="val => currentNode = val" @on-edit="onEditClick" @on-delete="onDeleteClick"></data-tree>
    </...>
```

> Prop属性说明

* data 

Array 必须的属性 用于展示树的数据，data包含几个必要的属性

| name  | must  | desc  |
|:-----|:-----|:-----|
| title | yes | 显示的内容|
| id  | yes | 当前节点ID  |
| pid  | yes | 父节点ID，如果是列表展示，就设置一个-1最为稳妥|
| _checked  | no  | 如果设置了 showCheckbox 属性，并且改值为true，则默认勾选此节点|
| _selected | no  | 如果此值为 true 则默认选中当前节点
| _disabled | no  | 如果此值为 true 则当前节点操作按钮为禁用

* showCheckbox 

Boolean 是否显示复选框,默认不显示
* showEdit 

Boolean 是否显示操作按钮,默认显示所有的操作按钮,默认不显示

* editConfig

 Array 通过设置 EditType 数组可以设定要显示的按钮有哪些

| name | desc  |
|:-----|:-----|
|MODIFY| 编辑按钮|
| ADD  | 增加按钮|
|DELETE| 删除按钮

> 事件

| name  | return value | desc  |
|:------|:------|:------|
|on-select-change| any：当前节点的绑定的data值 | 当选中的节点发生改变时触发|
|on-currentChecked-change| {id, value}：当前节点的绑定的id和勾选状态 | 当前节点checked属性变更|
|on-edit| any：当前节点的绑定的data值 | 点击当前节点的edit按钮时|
|on-add| any：当前节点的绑定的data值 | 点击当前节点的add按钮时|
|on-delete| any：当前节点的绑定的data值 | 点击当前节点的delete按钮时|

> 对象对外属性

* selected

获取或设置当前选中的节点
当前节点为dataTreeNode对象。

```typescript
  expanded:Boolean;
  selected:Boolean;
  indeterminate:Boolean;
```
> 方法

* getCheckedKeys 返回所有已被勾选的节点的ID集合
