<!--资产信息-->
<template>
  <section class="component customer-info-money">

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";

@Component({})
export default class CustomerInfoMoney extends Vue {

  @Prop() id: Number

  mounted() {

  }

}
</script>
<style lang="less" scoped>
</style>
