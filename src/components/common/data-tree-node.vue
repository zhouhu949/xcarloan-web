<template>
  <section class="component data-tree-node">
    <div :style="getSubTreeStyle()">
      <div @click="onNodeClick" class="node-title" :class="{selected:selected}">
        <span @click="onExpand" v-if="!isLeaf" :class="{expanded:expanded}">
          <Icon v-show="!this.expanded" type="arrow-right-b"></Icon>
          <Icon v-show="this.expanded" type="arrow-down-b"></Icon>
        </span>
        <span v-if="showCheckbox">
          <i-checkbox :indeterminate="indeterminate" v-model="checked" @on-change="onChecked"></i-checkbox>
        </span>
        <span>{{data[propsObject.title]}}</span>
        <small v-show="selected && showEdit" class="icon-box">
          <a @click="editHandle" href="#" :disabled="disabled" v-if="hasEdit">
            <div style="display:inline-block">
              <Icon type="edit"></Icon>
            </div>
          </a>
          <a @click="addItemHandle" href="#" :disabled="disabled" v-if="hasAdd">
            <div style="display:inline-block">
              <Icon type="plus"></Icon>
            </div>
          </a>
          <a @click="deleteHandle" href="#" :disabled="disabled" v-if="hasDelete">
            <div style="display:inline-block">
              <Icon type="minus"></Icon>
            </div>
          </a>
        </small>
      </div>
      <div v-show="expanded" class="sub-node" v-if="data.children">
        <data-tree-node ref="children-node" v-for="node in data.children" :key="node.id" :data="node"></data-tree-node>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import DataTree from "~/components/common/data-tree.vue";
import { EditType } from "~/config/enum.config";

@Component({})
export default class DataTreeNode extends Vue {
  @Prop({
    required: true
  })
  data;

  public expanded = true;
  public selected = false;
  public indeterminate = false

  get checked() {
    return this.data._checked
  }

  set checked(value) {
    this.data._checked = value
  }

  get propsObject() {
    return this.root.propsObject;
  }

  get showCheckbox() {
    return this.root.showCheckbox;
  }

  /** 是否禁用操作项 */
  get disabled() {
    return this.data._disabled || false
  }

  get showEdit() {
    return this.root.showEdit;
  }

  get editType() {
    return this.root.editConfig as Array<EditType>
  }

  get hasAdd() {
    return this.editType.includes(EditType.ADD)
  }

  get hasEdit() {
    return this.editType.includes(EditType.MODIFY)
  }

  get hasDelete() {
    return this.editType.includes(EditType.DELETE)
  }

  /**
   * 调用树的编辑方法，向调用者发送edit事件
   */
  private editHandle() {
    this.root.emitEdit(this.data);
  }
  /**
   * 点击树添加事件
   */
  private addItemHandle() {
    this.root.addEdit(this.data);
  }
  /**
   * 点击树删除事件
   */
  private deleteHandle() {
    this.root.deleteEdit(this.data)
  }
  /**
   * 点击当前节点
   */
  private currentNode() {
    this.root.clickNode(this.data)
  }

  created() {
    this.expanded = !this.isLeaf;
  }

  /**
   * 当前节点更新操作
   * 保证更新顺序
   */
  onChecked(value) {
    // 取消自动关联状态
    this.indeterminate = false;
    // step1: 更新子节点
    this.updateChildrenChecked(value)
    // step2: 更新父节点
    this.updateParentChecked(value)

    // 发送节点更新事件
    this.root.emitCurrentCheckedChange(this.data.id, value)

  }

  /**
   * 更新父节点选中状态
   */
  updateParentChecked(value) {
    // 获取父节点
    let parent = this.getParent()

    if (parent) {
      // 获取目标状态
      let targetChecked = parent.data.children.some(x => x._checked === true)
      // 更新半选状态
      parent.indeterminate = targetChecked && !parent.data.children.every(x => x._checked === true)

      // 如果状态发生变化则更新父节点
      if (parent.checked !== targetChecked) {
        parent.checked = targetChecked
        parent.updateParentChecked()
      }
    }
  }

  /**
   * 更新子节点选中状态
   */
  updateChildrenChecked(value: Boolean) {
    if (this.data.children && this.data.children.length) {
      // 获取子节点组件
      let nodes = this.$refs['children-node'] as Array<DataTreeNode>
      // 通知子组件更新
      nodes.forEach(item => {
        item.checked = value
        // 发送节点更新事件
        this.root.emitCurrentCheckedChange(item.data.id, value)
        item.updateChildrenChecked(value)
      })
    }
  }

  get isLeaf() {
    return !(this.data.children && this.data.children.length)
  }

  getSubTreeStyle() {
    return {
      marginLeft: this.isLeaf ? "30px" : "20px",
      marginTop: "3px"
    };
  }

  /**
   * 节点展开处理
   */
  onExpand() {
    this.expanded = !this.expanded;
  }

  /**
   * 节点选择处理
   */
  onNodeClick() {
    this.selected = true
    this.root.selected = this
  }

  /**
   * 获取当前根节点
   */
  get root() {
    return this.getParent('DataTree')
  }

  getParent(target = "DataTreeNode") {
    var parent = this.$parent;
    // 向上寻找根节点元素
    while (parent && parent.$options && parent.$options.name !== target) {
      parent = parent.$parent;
    }

    return parent as any;
  }


  mounted() {
    this.root.registerNode(this, this.data)
    this.checked = !!this.data._checked
    if (this.data._selected) this.onNodeClick()
  }


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.component.data-tree-node {
  text-align: left;
  padding: 1px;

  .node-title {
    &:hover {
      cursor: pointer;
    }
    &.selected {
      background-color: #d5e8fc;
    }
  }
  .icon-box {
    padding-left: 10px;
    > a {
      margin: 0 2px;
    }
  }
}
</style>
