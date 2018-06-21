<template>
  <section class="component in-storage">

  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import { Layout } from '~/core/decorator'
import Component from "vue-class-component";

@Layout('workspace')
@Component({
  components: {}
})
export default class InStorage extends Page {

}
</script>


<style lang="less" scoped>
</style>
