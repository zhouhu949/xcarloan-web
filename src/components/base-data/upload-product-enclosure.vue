<!-- 上传附件 -->
<template>
  <section class="component upload-enclosure">
    <file-upload></file-upload>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import fileUpload from "~/components/common/file-upload.tsx.vue";

@Component({
  components: {
    fileUpload
  }
})
export default class UploadEnclosure extends Vue {
  
}
</script>

<style lang="less" scoped>
</style>
