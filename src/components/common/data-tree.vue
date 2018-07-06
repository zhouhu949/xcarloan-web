<template>
  <div class="component organize-tree">
    <template v-for="node of data">
      <data-tree-node :props="props||{}" v-if="node" :key="node.id" :data="node"></data-tree-node>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Watch, Emit } from "vue-property-decorator";
import Component from "vue-class-component";
import DataTreeNode from "~/components/common/data-tree-node.vue";
import { EditType } from "~/config/enum.config";

@Component({
  components: {
    DataTreeNode
  }
})
export default class DataTree extends Vue {
  // 数据列表
  @Prop({
    default: () => []
  })
  data: Array<any>;

  // 属性参数
  @Prop({
    default: () => { },
    type: Object
  })
  props;

  // 是否显示checkbox
  @Prop({
    default: false,
    type: Boolean
  })
  showCheckbox;

  @Prop({
    type: Boolean,
    default: false
  })
  showEdit

  @Prop({
    type: Array,
    default: () => [EditType.ADD, EditType.MODIFY, EditType.DELETE]
  })
  editConfig

  // 数据源变化监听
  @Watch("data")
  onDataChange(data) {
    // this.currentNode = null
  }

  /**
   * 选中的节点发生变更
   */
  @Emit("on-select-change")
  emitSelectChange(data) { }

  /**
   * 当前节点checked属性变更
   */
  @Emit("on-currentChecked-change")
  emitCurrentCheckedChange(id, value) { }

  /**
   * 点击当前节点的edit按钮时
   */
  @Emit('on-edit')
  emitEdit(data) { }

  /**
   * 点击当前节点的add按钮时
   */
  @Emit('on-add')
  addEdit(data) { }

  /**
   * 点击当前节点的delete按钮时
   */
  @Emit('on-delete')
  deleteEdit(data) { }

  private nodeMap = new Map<DataTreeNode, any>();

  public get propsObject() {
    return Object.assign(this.props || {}, {
      title: "title"
    });
  }

  public registerNode(node, data) {
    this.nodeMap.set(node, data);
  }

  // 当前选择项
  private currentNode;

  /**
   * 获取当前选中项
   */
  public get selected() {
    return this.currentNode;
  }

  /**
   * 选择当前选中项
   */
  public set selected(node) {
    if (this.currentNode !== node) {
      // 清空历史选中项
      if (this.currentNode) {
        this.currentNode.selected = false;
      }
      this.currentNode = node;
      this.emitSelectChange(node.data);
    }
  }

  /**
   * 获取选中key
   */
  public getCheckedKeys() {
    return Array.from(this.nodeMap.entries())
      .filter(([node, data]) => node.checked)
      .map(([node, data]) => data.id);
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
