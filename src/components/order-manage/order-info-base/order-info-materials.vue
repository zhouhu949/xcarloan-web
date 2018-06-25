<!--附件资料-->
<template>
  <section class="component order-info-materials">
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerDataService } from "~/services/manage-service/basic-customer-data.service";

@Component({})
export default class OrderInfoMaterials extends Vue {
  @Dependencies(BasicCustomerDataService) private basicCustomerDataService: BasicCustomerDataService;
  @Prop() id: Number

  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        title: "操作",
        width: 90,
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h("i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => this.$common.downloadFile(row.fileUrl.row.fileName)
                }
              },
              "下载")
          ])
        }
      },
      {
        align: "center",
        title: "数据类型",
        key: "dataType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.dataType))
      },
      {
        align: "center",
        title: '文件类型',
        key: 'fileType',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.fileType))
      },
      {
        align: "center",
        title: '备注',
        editable: true,
        key: 'remark',
        minWidth: this.$common.getColumnWidth(5),
      }]

  }

  mounted() {
    // this.basicCustomerDataService.getCustomerData(this.id).subscribe(
    //   data => this.dataSet = data,
    //   err => this.$Message.error(err.msg)
    // )
  }

}
</script>
<style lang="less" scoped>
</style>
