<template>
  <section class="main-container full">
    <work-tab></work-tab>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkTab from "~/components/workspace/work-tab.vue";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    WorkTab
  }
})
export default class Index extends Vue {}
</script>

<style lang="less" scoped>
</style>
