<template>
  <section class="page home-page">
   
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Test2 from "./test2.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import Map from "~/components/common/map.vue";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Layout } from "~/core/decorator";
import { Mutation } from "vuex-class";
import { Dependencies } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {  }
})
export default class Home extends Vue {
  
}
</script>

<style lang="less">

</style>
