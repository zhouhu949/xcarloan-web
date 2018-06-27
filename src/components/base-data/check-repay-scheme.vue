<!--查看还款方案信息-->
<template>
  <section class="component check-scheme">
    
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicProductRepayTemplateService } from '~/services/manage-service/basic-product-repay-template.service';
import { Object } from 'core-js';

@Component({
  components: {
  }
})
export default class CheckScheme extends Vue {
  @Dependencies(BasicProductRepayTemplateService) private basicProductRepayTemplateService: BasicProductRepayTemplateService

  @Prop() productId

  private schemeDetail: any;

  created() {
    this.basicProductRepayTemplateService.queryBasicProductCarScheme(this.productId).subscribe(val => {
      this.schemeDetail = val
    })
  }
}
</script>

<style lang="less">
</style>
