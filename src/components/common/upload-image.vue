<!--财务·上传图片-->
<template>
  <section class="component upload-image">
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <i-row>
        <i-col :span="20">
          <i-input style="display:inline"></i-input>
        </i-col>
        <i-col :span="4">
          <Button class="blueButton" style="display:inline">选择文件</Button>
        </i-col>
      </i-row>
    </Upload>
    <i-table :columns="uploadColumns" :data="uploadList"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  components: {}
})
export default class UploadImage extends Vue {
  private uploadColumns: any;
  private uploadList: Array<any> = [];
  created() {
    this.uploadColumns = [
      {
        title: "名称",
        key: "fileName",
        align: "center"
      },
      {
        title: "大小",
        key: "fileSize",
        align: "center"
      },
      {
        title: "文件类型",
        key: "fileType",
        align: "center"
      },
      {
        title: "操作",
        key: "fileName",
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
            "i-button",
            {
              props: {
                type: "text"
              },
              style: {
                color: "#265ea2"
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: "提示",
                    content: "确定移出吗？",
                    onOk: () => {}
                  });
                }
              }
            },
            "移出"
          );
        }
      }
    ];
  }
}
</script>

<style>

</style>