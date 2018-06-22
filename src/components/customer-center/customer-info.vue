<!--查看模块功能-->
<template>
  <section class="component customer-info">
    <div class="left">
      <data-tree :data="customerGroupTreeData" @on-select-change="data => currentNode = data"></data-tree>
    </div>
    <div class="right">
      <div class="component-title" v-show="currentNode.component">{{currentNode.title}}</div>
      <component :is="currentNode.component" :id="customerId"></component>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import DataTree from "~/components/common/data-tree.vue";
import { Getter } from "vuex-class";
// 页面基础组件
import BaseComponents from "./customer-info-base/index";

@Component({
  components: {
    DataTree,
    ...BaseComponents
  }
})
export default class CustomerInfo extends Vue {
  /**
   * 客户ID
   */
  @Prop({
    required: true,
    type: Number
  }) customerId

  @Getter customerGroupTreeData;

  private currentNode: any = {}

  mounted() {
    // 设置默认显示基本信息
    this.currentNode = {
      component: "CustomerInfoBasedata",
      title: "基本资料"
    }
  }
}
</script>
<style lang="less" scoped>
.component.customer-info {
  display: inline-flex;
  .left {
    width: 150px;
  }
  .right {
    width: 850px;
    min-height: 500px;
    border-left: solid 1px #ddd;
    padding-left: 10px;
  }
  .component-title {
    text-align: right;
    padding-right: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
}
</style>
