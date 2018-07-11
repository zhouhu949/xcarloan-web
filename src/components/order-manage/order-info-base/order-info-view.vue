<!--还款计划-->
<template>
  <section class="component order-info-view">
    <product-scheme-detail :orderId="id"></product-scheme-detail>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import ProductSchemeDetail from "~/components/finance-manage/customer-repayment-details.tsx.vue";

@Component({
  components: {
    ProductSchemeDetail
  }
})
export default class OrderInfoView extends Vue {
  @Prop() id: Number
}
</script>
<style lang="less" scoped>
</style>
