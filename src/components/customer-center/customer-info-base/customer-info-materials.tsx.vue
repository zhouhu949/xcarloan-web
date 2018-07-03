<!--附件资料-->
<template>
  <section class="component customer-info-materials">
    <div class="upload-materials">
      <i-dropdown trigger="click" @on-click="optionChange">
        <a href="javascript:void(0)">
          上传附件
          <i-icon type="arrow-down-b"></i-icon>
        </a>
        <i-dropdown-menu slot="list">
          <i-dropdown-item v-for="item of customerDictData" :key="item.id" :name="item.id">{{item.dictItemName}}</i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </div>
    <data-box :columns="columns" :data="dataSet" :height="440" ref="databox"></data-box>
  </section>
</template>

<script lang="tsx">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { Button } from "iview";
import { BasicCustomerDataService } from "~/services/manage-service/basic-customer-data.service";
import { SysDictService } from '~/services/manage-service/sys-dict.service';
import FileUpload from "~/components/common/file-upload.tsx.vue";

@Component({})
export default class CustomerInfoMaterials extends Vue {
  @Dependencies(BasicCustomerDataService) private basicCustomerDataService: BasicCustomerDataService;
  @Dependencies(SysDictService) sysDictService: SysDictService;
  @Prop() id: Number

  private dataSet: Array<any> = [];
  private columns: Array<any> = [];
  private customerDictData: Array<any> = [];

  private dataType: Number // 上传的资料类型

  created() {
    this.columns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(2),
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
                  click: () => this.$common.downloadFile(row.fileUrl)
                }
              },
              "下载"),
            h("i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => this.onDeleteClick(row.id)
                }
              },
              "删除"),
          ])
        }
      },
      {
        align: "center",
        title: "文件名称",
        key: "fileName",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => (<i-button type="text" class="row-command-button" on-click={() => this.preview(row)}>{row.fileName}</i-button>)
      },
      {
        align: "center",
        title: "资料类型",
        key: "dataType",
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.getUserDictName(row.dataType))
      }
    ]
  }

  mounted() {
    this.getUserDictData(10013)
    this.refreshData()
  }

  /**
   * 获取自定义字典数据
   */
  getUserDictData(id) {
    let result = []
    this.sysDictService.getDataDictByTypeCode({ id: id }).subscribe(
      data => this.customerDictData = data
    )
  }

  /**
   * 查询自定义字典项
   */
  getUserDictName(id) {
    let data = this.customerDictData.find(v => id === v.id)
    if (data) {
      return data.dictItemName
    } else {
      return id
    }
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
   * 选择资料类型后
   */
  optionChange(val) {
    this.dataType = val
    let dialog = this.$dialog.show({
      title: "上传附件",
      okText: "上传附件",
      width: 700,
      footer: true,
      onOk: fileUpload => {
        return fileUpload.upload();
      },
      render: h => {
        return h(FileUpload, {
          props: {
            fileNumberLimit: 1000,
            acceptFileType: 'image/*'
          },
          on: {
            "on-success": (fileList) => {
              // 提取参数数据
              let uploadPics = fileList.map(val => {
                return {
                  customerId: this.id,
                  fileUrl: val.response.url,
                  fileName: val.response.name,
                  dataType: this.dataType
                };
              });
              this.basicCustomerDataService.addCustomerData(uploadPics).subscribe(
                data => {
                  this.$Message.success('上传成功！')
                  this.refreshData()
                },
                err => this.$Message.error(err.msg)
              )
            }
          }
        });
      }
    });
  }

  /**
   * 删除资料
   */
  onDeleteClick(fileId) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除此附件吗？",
      transfer: false,
      onOk: () => {
        this.basicCustomerDataService.deleteCustomerData(fileId).subscribe(
          val => {
            this.$Message.success(`删除成功！`)
            this.refreshData()
          },
          err => this.$Message.error(err.msg)
        );
      }
    })
  }

  /**
   * 预览
   */
  preview(file) {
    this.$dialog.show({
      title: file.fileName,
      width: 700,
      render: h => h('img',{
        style: {
          width: "100%"
        },
        attrs: {
          src: file.fileUrl,
          alt: file.fileName
        }
      })
    })
  }
}
</script>
<style lang="less" scoped>
.component.customer-info-materials {
  .upload-materials {
    text-align: right;
    margin: 10px 20px 0px auto;
    .ivu-dropdown-item {
      text-align: left;
    }
  }
}
</style>
