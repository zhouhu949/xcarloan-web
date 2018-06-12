<!--查看模块功能-->
<template>
  <section class="component to-view">
    <i-form :label-width="110" :model="ToviewrowData" class="data-form">
      <i-form-item label="资源初始化名称" prop="resoInitName">
        <i-input v-model="ToviewrowData.resoInitName" readonly></i-input>
      </i-form-item>
      <i-form-item label="资源名称" prop="resoName">
        <i-input v-model="ToviewrowData.resoName" readonly></i-input>
      </i-form-item>
      <i-form-item label="资源初始化图标" prop="resoInitIcon">
        <i-input v-model="ToviewrowData.resoInitIcon" readonly></i-input>
      </i-form-item>
      <i-form-item label="资源图标" prop="resoIcon">
        <i-input v-model="ToviewrowData.resoIcon" readonly></i-input>
      </i-form-item>
      <i-form-item label="状态" prop="resoStatus">
        <i-input v-model="ToviewrowData.resoStatus" readonly></i-input>
      </i-form-item>
      <i-form-item label="备注" prop="resoRemark">
        <i-input v-model="ToviewrowData.resoRemark" readonly></i-input>
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
