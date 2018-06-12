<template>
  <div id="app" :class="[theme]">
    <component :is="layout"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State } from "vuex-class";
import DefaultLauout from "~/layouts/default.vue";
import WorkspaceLayout from "~/layouts/workspace.vue";

@Component({
  components: {
    default: DefaultLauout,
    workspace: WorkspaceLayout
  }
})
export default class App extends Vue {
  @State theme: string;
  @State layout: string;
  created() {}
}
</script>

<style lang="less">
@import "normalize-css/normalize.css";
@import "@zct1989/vue-component/dist/index.css";
@import "assets/styles/layout.less";
@import "assets/styles/common.less";
@import "assets/styles/default.less";
@import "assets/styles/theme.less";
</style>
