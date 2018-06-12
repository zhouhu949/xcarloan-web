<!--注册-->
<template>
  <section class="component page-header row between-span middle-span">
    <div class="title">
      {{title}}
    </div>
    <div class="command row middle-span">
      <slot></slot>
      <slot name="command"></slot>
      <command-button v-show="!hiddenPrint" label="打印" icon="dayin" @click.native="onPrint"></command-button>
      <command-button v-show="!hiddenExport" label="导出" icon="daochu" @click.native="onExport"></command-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import md5 from "md5";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Prop, Emit } from "vue-property-decorator";
import CommandButton from "~/components/common/command-button.vue";
import { Form } from "iview";
@Component({
  components: {
    CommandButton
  }
})
export default class PageHeader extends Vue {
  @Prop({
    required: true,
    type: String
  })
  title: string;

  @Prop({
    type: Boolean
  })
  hiddenPrint: boolean;

  @Prop({
    type: Boolean
  })
  hiddenExport: boolean;

  @Emit("on-export")
  emitExport() {}

  onPrint() {
    window.print();
  }

  onExport() {
    this.emitExport();
  }
}
</script>

<style lang="less" scoped>
.component.page-header {
  height: 40px;
  border-bottom: solid 1px #ccc;
  padding: 0 10px;

  .title {
    font-size: 16px;
    font-weight: bold;
  }

  .command {
    & > * {
      margin: 0 5px;
    }
  }
}
</style>