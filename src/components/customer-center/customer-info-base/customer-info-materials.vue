<!--附件资料-->
<template>
  <section class="component customer-info-materials">
    <div class="add-customer-info">
      <a @click="onAddClick">
        <svg-icon iconClass="add"></svg-icon>
        上传附件
      </a>
    </div>
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerDataService } from "~/services/manage-service/basic-customer-data.service";
import AttachmentUpload from "~/components/customer-center/attachment-upload.vue";

@Component({})
export default class CustomerInfoMaterials extends Vue {
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
        title: "资料类型",
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
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  refreshData() {
    this.basicCustomerDataService.getCustomerData(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 点击上传资料
   */
  onAddClick() {
    let dialog = this.$dialog.show({
      title: "上传附件",
      okText: "上传附件",
      width: 700,
      footer: true,
      onOk: contractUpload => {
        return contractUpload
          .submit()
          .then(v => {
            if (v) this.refreshData();
            return v;
          })
          .catch(err => {
            this.$Message.error(err.msg);
          });
      },
      render: h => {
        return h(AttachmentUpload, {
          props: {
            fileNumberLimit: 1000,
            customerId: this.id
          }
        });
      }
    });
  }
}
</script>
<style lang="less" scoped>
</style>
