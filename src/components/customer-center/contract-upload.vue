<!--财务·上传图片-->
<template>
  <section class="component contract-upload">
    <Button class="contract-title" type="primary" @click="showFileUpload" v-show="!hiddenUpload && !isView">上传</Button>
    <i-table :height="300" :columns="uploadedColumns" :data="uploadedDataSet"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { NetService } from "~/utils/net.service";
import { Prop, Model, Emit, Watch } from "vue-property-decorator";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { BasicOrderFileService } from "~/services/manage-service/basic-order-file.service";
import { Object } from "core-js";
import { resolve } from "url";

@Component({
  components: {}
})
export default class ContractUpload extends Vue {
  @Dependencies(BasicOrderFileService)
  basicOrderFileService: BasicOrderFileService;

  @Prop({
    default: 0
  })
  orderId;
  /**
   * 隐藏删除
   */
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenDelete: boolean;

  @Prop({
    type: Boolean,
    default: true
  })
  isShowUpload: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  isView: boolean;

  /**
   * 文件数量限制
   */
  @Prop() fileNumberLimit: Number;

  private uploadedDataSet: Array<any> = [];
  private uploadedColumns: Array<any> = [];

  mounted() {
    if (this.orderId) {
      this.getContractResourceAll(this.orderId);
    }
  }

  created() {
    this.uploadedColumns = [
      {
        title: "名称",
        key: "name",
        width: 150,
        align: "center"
      },
      {
        title: "文件路径",
        key: "url",
        align: "center"
      },
      {
        title: "资料类型",
        key: "fileType",
        width: 120,
        align: "center",
        render: (h, params) => {
          return h(
            "Select",
            {
              props: {
                value: this.uploadedDataSet[params.index].fileType,
                disabled: this.isView
              },
              on: {
                "on-change": value => {
                  this.uploadedDataSet[params.index].fileType = value;
                }
              }
            },
            // 资料类型
            this.$dict.getDictData(10036).map(item =>
              h(
                "Option",
                {
                  props: {
                    value: item.value,
                    label: item.label,
                    key: item.value
                  }
                },
                item
              )
            )
          );
        }
      },
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 150,
        align: "center",
        render: (h, { row, column, index }) => {
          if (this.isView) {
            return h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.download(row);
                  }
                }
              },
              "下载"
            );
          } else {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.download(row);
                    }
                  }
                },
                "下载"
              ),
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定执行删除吗？",
                        transfer: false,
                        onOk: () => {
                          this.handleRemove(row);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      }
    ];
  }

  /**
   * 计算是否显示上传按钮
   */
  get hiddenUpload() {
    // 最大写死99个文件
    return this.uploadedDataSet.length >= (this.fileNumberLimit || 99);
  }

  showFileUpload() {
    let dialog = this.$dialog.show({
      footer: true,
      okText: "上传",
      onOk: fileUpload => {
        return fileUpload.upload();
      },
      render: h => {
        return h(FileUpload, {
          props: {
            fileNumberLimit: this.fileNumberLimit
          },
          on: {
            "on-success": fileList => {
              let uploadFiles = fileList.map(v =>
                Object.assign({ fileType: "" }, v.response)
              );
              // 文件列表追加
              uploadFiles.forEach(element => {
                this.uploadedDataSet.push(element);
              });
            }
          }
        });
      }
    });
  }

  /**
   * 下载附件
   */
  download(file) {
    this.$common.downloadFile(file.url, file.name);
  }

  /**
   *删除附件
   */
  handleRemove(file) {
    this.uploadedDataSet = this.uploadedDataSet.filter(x => x.url !== file.url);
  }

  /**
   * 上传文件
   */
  submit() {
    return new Promise((resolve, reject) => {
      if (!this.orderId) return resolve(false);

      // 提取参数数据
      let fileModels = this.uploadedDataSet.map(val => ({
          orderId: this.orderId,
          fileName: val.name,
          fileUrl: val.url,
          fileType: val.fileType
        }));

      this.basicOrderFileService
        .addUploadBasicOrderFile({
          id: 0,
          customerOrderFileModels: fileModels
        })
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 查看订单合同资料
   * @param 订单ID
   */
  getContractResourceAll(orderId) {
    this.basicOrderFileService.getOrderFile(orderId).subscribe(
      data => {
        this.uploadedDataSet = data.map(v => ({
            id: "",
            realName: "",
            type: "",
            url: v.fileUrl,
            localUrl: "",
            name: v.fileName,
            size: 0,
            createTime: "",
            creator: null,
            fileType: v.orderFileType
        }));
      },
      err => this.$Message.error(err.msg)
    );
  }
}
</script>

<style lang="less" scoped>
.component.contract-upload {
  .contract-title {
    margin-bottom: 10px;
  }
  .command {
    padding-bottom: 10px;
  }
}
</style>
