<template>
  <div class="layout full" :class="[theme]">
    <work-header class="work-header"></work-header>
    <div class="row flex-nowarp work-content">
      <work-menu></work-menu>
      <div class="col-span">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WorkHeader from "~/components/workspace/work-header.vue";
import WorkMenu from "~/components/workspace/work-menu.vue";
import Component from "vue-class-component";
import { State } from "vuex-class";

@Component({
  components: {
    WorkHeader,
    WorkMenu
  }
})
export default class WorkSpace extends Vue {
  @State("theme") theme: String;
}
</script>
<style lang="less" scoped>
// .layout {
//   // display: grid;
//   // grid-template-rows: 60px auto;
// }
// .work-header {
//   // grid-row-start: 1;
//   // grid-row-end: 2;
// }

.work-content {
  background: #eff3f5;
  padding: 0;
  height: calc(~"100% - 60px");
  // grid-row-start: 2;
  // grid-row-end: 3;
  & > * {
    height: 100%;
  }
}
</style>
