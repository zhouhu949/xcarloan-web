<template>
  <section class="component work-menu-title">
    <div class="icon-container">
      <svg-icon v-if="data.icon" :iconSize="21" :iconClass="data.icon"></svg-icon>
      <svg-icon v-else iconClass="more"></svg-icon>
    </div>
    <div class="title-container">
      {{data.resoname}}
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class WorkMenuTitle extends Vue {
  @Prop() data;
}
</script>




<style lang="less" scoped>
.work-menu-title.component {
  display: inline-block;
  width: 100%;

  & > * {
    display: inline-block;
  }

  .icon-container {
    width: 50px;
    text-align: center;
    border-right: solid 1px #ccccccaa;

    .svg-icon {
      vertical-align: middle;
    }
  }

  .title-container {
    padding: 0 15px;
  }
}
</style>
