<template>
  <div class="component organize-tree">
    <organize-node v-for="item of dataTree" v-if="item" :key="item.id" :data="item"></organize-node>
  </div>
</template>

<script lang="ts">
  import OrganizeNode from '~/components/common/organize-node.vue'
  import Vue from "vue";
  import {
    Prop,
    Watch
  } from "vue-property-decorator";
  import Component from "vue-class-component";

  @Component({
    components: {
      OrganizeNode
    }
  })
  export default class OrganizeTree extends Vue {
    @Prop({
      default: [] // 数据列表
    })
    dataList: Array < any > ;
    @Prop({
      default: true // 数据列表
    })
    isIcon: Boolean

    @Watch("dataList")
    createTree(data) {
      // 递归构建组织树
      let fun = (id) => {
        // 递归对象子元素
        let list = data
          .filter(x => x.deptPid === id)
          .map(node => {
            // 递归构建子节点
            let children = fun(node.id)
            // 添加icon标识
            // node.isIcon = true
            // if (!this.isIcon) {
            //   node.isIcon = false
            // }
            // 节点添加children或leaf属性
            if (children && children.length) {
              // 设置子元素
              node.children = children
              // 添加叶子节点标识
              node.isLeaf = false
              // 添加默认展开标识
              node.expand = true
            } else {
              // 添加叶子节点标识
              node.isLeaf = true
            }
            return node
          })

        return list
      }

      // 生成数据树
      this.dataTree = fun(0)
      // console.log(this.dataTree)
    }
    private dataTree: Array < any > = [] // 数据树
    private selected: String = '' // 当前选择项


    created() {

    }
    /**
     * 更新默认选中节点
     */
    updateDefaultSelected() {
      if (this.dataTree && this.dataTree.length) {
        this.updateSelected(this.dataTree[0])
      }
    }
    /**
     * 更新当前选择项
     */
    updateSelected(value) {
      // console.log(value, this.selected, 8989)
      if (this.selected !== value) {
        this.selected = value
        // 发送change事件
        this.$emit('change', value)
      }
    }
    // TODO:暂时性解决办法
    forceRefresh() {
      let temp = this.dataTree
      this.dataTree = []
      this.$nextTick(() => {
        this.dataTree = temp
      })
    }
    refresh() {

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
