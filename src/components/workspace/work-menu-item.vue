<template>
  <section class="component work-menu-item" :class="`menu-level-${level}`">
    <template v-if="data.children&&data.children.length">
      <i-submenu :name="data.path||data.id" :key="data.id" class="sub-menu-container">
        <template slot="title">
          <work-menu-title :data="data"></work-menu-title>
        </template>
        <work-menu-item :level="level+1" v-for="node in data.children" :key="node.id" :data="node"></work-menu-item>
      </i-submenu>
    </template>
    <template v-else>
      <i-menu-item :key="data.id" :name="data.path" class="leaf-menu-container">
        <work-menu-title :data="data"></work-menu-title>
      </i-menu-item>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import WorkMenuTitle from "~/components/workspace/work-menu-title.vue";

@Component({
  components: {
    WorkMenuTitle
  }
})
export default class WorkMenuItem extends Vue {
  @Prop() data;
  @Prop() level;
}
</script>

<style lang="less">
.work-menu-item {
  .ivu-menu-submenu-title,
  .ivu-menu-item {
    padding: 0;
    height: 50px;
    line-height: 50px;
    padding-left: 0 !important;
    border-right: 0 !important;
    margin-right: 1px;
    text-align:left;
    .ivu-menu-submenu-title-icon {
      line-height: 50px;
      top: 0;
      position: absolute;
      right: 0;
      display: none;
    }
  }
}
</style>

<style lang="less" scoped>
.work-menu-item.component {
}
</style>
