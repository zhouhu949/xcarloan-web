<template>
  <div style="text-align:left;padding:1px" class="component organize-node">
     <div draggable="true" @dragstart.stop="handleDragStart($event)" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @dragover.prevent="handleDragOver"  @dragend.prevent="handleDragEnd" id="tree-node" :style="getSubTreeStyle()">  <!-- @drop.stop="handleDrop($event)" -->
      <div>
        <span @click="expanedItemHandle" v-show="!data.isLeaf" class="el-tree-node__expand-icon" :class="{expanded:expanded}">
          <Icon v-show="!this.expanded" type="arrow-right-b"></Icon>
          <Icon v-show="this.expanded" type="arrow-down-b"></Icon>
        </span>
        <a @click="selectItemHandle">{{data.deptName}}</a>
        <small v-show="root&&root.selected === data" class="icon-box">
          <a @click="editItemHandle" href="#" class="el-icon-edit">
            <div style="display:inline-block">
              <Icon type="edit"></Icon>
            </div>
          </a>
          <a @click="addItemHandle" href="#" class="el-icon-plus">
            <div style="display:inline-block">
              <Icon type="plus"></Icon>
            </div>
          </a>
          <a @click="removeItemHandle" href="#" class="el-icon-minus">
            <div style="display:inline-block">
              <Icon type="minus"></Icon>
            </div>
          </a>
        </small>
      </div>
      <div v-show="expanded" class="sub-node" v-if="data.children">
        <organize-node v-for="(item) in data.children" :key="item.id" :data="item"></organize-node>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from "vue-property-decorator";
import Component from "vue-class-component";
import Vue from "vue";

// TODO:抽象为公共组件
@Component({})
export default class OrganizeNode extends Vue {
  @Prop({
    required: true,
    default: () => {}
  })
  data;
  private expanded = true;
  private root: any = null;
  private show: boolean;
  private show_oprators: Boolean = false;
  private is_draged: Boolean = false;

  created() {
    this.expanded = this.data.expand && !this.data.isLeaf;
  }
  // data() {
  //     return {
  //       expanded: this.data.expand && !this.data.isLeaf, // 当前节点展开状态
  //       root: {}, // 根节点对象
  //       show_oprators: false,
  //       is_draged: false
  //     }
  //   },
  // props: {
  //   data: Object // 当前节点对象
  // },
  // computed: {
  //   /**
  //    * 当前节点是否被选中
  //    */
  //   selected() {
  //     return this.root.selected === this.data
  //   }
  // },
  // methods: {
  getSubTreeStyle() {
    return {
      marginLeft: this.data.isLeaf === true ? "2em" : "1em",
      marginTop: "3px"
    };
  }

  get selected() {
    if (!this.root) return;
    return this.root.selected === this.data;
  }
  /**
   * 节点展开处理
   */
  expanedItemHandle() {
    this.expanded = !this.expanded; // 更新展开状态
  }
  /**
   * 节点选择处理
   */
  selectItemHandle() {
    let root = <any>this.root;
    root.updateSelected(this.data); // 更新选择元素
  }
  /**
   * 获取当前父元素
   */
  parent(flag = false) {
    var parent = this.$parent;
    // // 向上寻找根节点元素
    while (
      parent &&
      parent.$options &&
      parent.$options.name !== "OrganizeTree"
    ) {
      parent = parent.$parent;
    }
    return parent;
  }
  /**
   * 修改节点处理
   */
  editItemHandle() {
    // let root = < any > this.root
    this.root.$emit("edit", this.data);
  }
  /**
   * 添加节点处理
   */
  addItemHandle() {
    this.root.$emit("add", this.data);
  }
  /**
   * 删除节点处理
   */
  removeItemHandle() {
    this.root.$emit("remove", this.data);
  }
  /**
   * 拖动逻辑处理
   */
  // handleDrop(e) {
  //   console.log(e,'111111')
  //   // 获取原始节点
  //   const vm = window["__drop_node__"];

  //   this.$el.style.backgroundColor = "";
  //   vm.$el.style.backgroundColor = "";

  //   let tparent: any = this;
  //   while (tparent !== undefined) {
  //     if (tparent === vm) {
  //       return;
  //     }
  //     tparent = tparent.$parent;
  //   }

  //   const currentNode = vm.data;

  //   // 目标节点与原节点相同直接退出
  //   // if (vm.$parent.data.depId === this.data.depId) {
  //   //   return
  //   // }
  //   // 从原节点子元素中删除对象
  //   vm.$parent.data.children = vm.$parent.data.children.filter(
  //     data => data !== currentNode
  //   );
  //   // 添加到目标对象子元素中
  //   if (!this.data.children) {
  //     this.data.children = [];
  //   }
  //   this.data.children.push(currentNode);
  //   this.data.isLeaf = false;
  //   this.data.expand = true;
  //   // 更新新的父ID
  //   currentNode.pid = this.data.id;
  //   // 父节点强制刷新
  //   let targetParent: any = this.parent();
  //   targetParent.forceRefresh();
  //   // console.log(currentNode, vm.$parent.data)
  //   targetParent.$emit("drag", currentNode, vm.$parent.data, this.data);
  // }
  handleDragEnd() {
    this.$el.style.backgroundColor = "";
  }
  handleDragStart(e) {
    this.show = false;
    this.is_draged = true;
    window["__drop_node__"] = this;
    this.$el.style.backgroundColor = "grey";
  }
  handleDragEnter() {
    if (!this.is_draged) {
      this.$el.style.backgroundColor = "";
    }
  }
  handleDragLeave() {
    if (!this.is_draged) {
      this.$el.style.backgroundColor = "";
    }
  }
  handleDragOver() {}
  showOprators() {
    this.show_oprators = true;
  }
  hideOprators() {
    this.show_oprators = false;
  }
  // },
  /**
   * 挂载处理逻辑
   */
  mounted() {
    // 获取根节点
    this.root = this.parent();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
