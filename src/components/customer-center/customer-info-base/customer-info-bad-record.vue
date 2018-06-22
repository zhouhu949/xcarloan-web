<!--黑白灰名单-->
<template>
  <section class="component customer-info-bad-record">

  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";

@Component({})
export default class CustomerInfoBadRecord extends Vue {

  @Prop() id: Number

  mounted() {

  }

}
</script>
<style lang="less" scoped>
</style>
