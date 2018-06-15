<!--查看模块功能-->
<template>
  <section class="component to-view">
    <i-form :label-width="110" :model="ToviewrowData" class="data-form">
      <i-form-item label="资源名称" prop="resourceName">
        <i-input v-model="ToviewrowData.resourceName" readonly></i-input>
      </i-form-item>
      <i-form-item label="资源图标" prop="resourceIcoUrl">
        <i-input v-model="ToviewrowData.resourceIcoUrl" readonly></i-input>
      </i-form-item>
      <!-- <i-form-item label="状态" prop="resourceStatus">
        <i-input v-model="ToviewrowData.resourceStatus" readonly></i-input>
      </i-form-item> -->
      <i-form-item label="备注" prop="remark">
        <i-input type="textarea" v-model="ToviewrowData.remark" readonly></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";

  @Component({})
  export default class ToView extends Vue {
    private ToviewrowData: any = {
      resoInitName: '',
      resoName: '',
      resoInitIcon: '',
      resoIcon: '',
      resoStatus: '',
      resoRemark: ''
    };

    created() {}
    getData(row) {
      this.ToviewrowData = row
    }
  }

</script>
<style lang="less" scoped>
  .component.to-view {
    .data-form {
      margin-top: 20px;
    }
  }

</style>
