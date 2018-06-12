<template>
  <section class="component data-tree-node">
    <div :style="getSubTreeStyle()">
      <div @click="onSelect" :style="{backgroundColor:selected?'lightblue':''}">
        <span @click="onExpand" v-if="!isLeaf" :class="{expanded:expanded}">
          <Icon v-show="!this.expanded" type="arrow-right-b"></Icon>
          <Icon v-show="this.expanded" type="arrow-down-b"></Icon>
        </span>
        <span v-if="showCheckbox">
          <i-checkbox :indeterminate="indeterminate" v-model="checked" @on-change="onChecked"></i-checkbox>
        </span>
        <a>{{data[propsObject.title]}}</a>
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
    if (this.data.filetype === 421) {
      this.root.emitCurrentCheckedChange(this.data.id, value)
    }

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
  updateChildrenChecked(value) {
    if (this.data.children && this.data.children.length) {
      // 获取子节点组件
      let nodes = this.$refs['children-node'] as any
      // 通知子组件更新
      nodes.forEach(item => {
        item.checked = value
        // 发送节点更新事件
        if (item.data.filetype === 421) {
          this.root.emitCurrentCheckedChange(item.data.id, value)
        }
        item.updateChildrenChecked()
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
  onSelect() {
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
  }


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.component.data-tree-node {
  text-align: left;
  padding: 1px;
}
</style>
