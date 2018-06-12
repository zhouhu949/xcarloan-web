<!--注册-->
<template>
  <section class="component command-button row between-span middle-span" @click="$emit('click',$event)">
    <svg-icon v-if="icon" :iconClass="icon"></svg-icon>
    <a>{{label}}</a>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import md5 from "md5";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Prop, Emit } from "vue-property-decorator";
import { Form } from "iview";
@Component({
  components: {}
})
export default class PageHeader extends Vue {
  @Prop({
    required: true,
    type: String
  })
  label: string;

  @Prop({
    type: String
  })
  icon: string;
}
</script>

<style lang="less" scoped>
.component.command-button {
  font-weight: bold;
  font-size: 12px;
  & > * {
    margin: 0 2px;
  }
  a {
    color: #3367a7;
    font-weight: bold;
    font-size: 12px;
  }
}
</style>

<style lang="less">
.component.command-button {
  .svg-icon {
    color: #3367a7;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>