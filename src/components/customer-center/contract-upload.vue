<!--财务·上传图片-->
<template>
  <section class="component contract-upload">
    <Button class="contract-title" type="primary" @click="showFileUpload" v-show="!hiddenUpload && !isView">上传文件</Button>
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
import { ContractService } from "~/services/contract-service/contract.service";
import { Object } from "core-js";
import { resolve } from "url";

@Component({
  components: {}
})
export default class ContractUpload extends Vue {
  @Dependencies(ContractService) contractService: ContractService;

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
        align: "center"
      },
      {
        title: "资料类型",
        key: "contractType",
        align: "center",
        render: (h, params) => {
          return h(
            "Select",
            {
              props: {
                value: this.uploadedDataSet[params.index].contractType
              },
              on: {
                "on-change": value => {
                  this.uploadedDataSet[params.index].contractType = value;
                }
              }
            },
            this.$dict.getDictData(10036).map(function(item) {
              return h(
                "Option",
                {
                  props: {
                    value: item.value,
                    label: item.label,
                    key: item.value
                  }
                },
                item
              );
            })
          );
        }
      },
      {
        title: "操作",
        minWidth: this.$common.getColumnWidth(5),
        width: 160,
        align: "center",
        render: (h, { row, column, index }) => {
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
                      content: "确定执删除吗？",
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
      title: "上传文件",
      footer: true,
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
                Object.assign({ contractType: "" }, v.response)
              );
              this.uploadedDataSet = uploadFiles;
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

      // 提取url数据
      let urls = this.uploadedDataSet.map(val => val.url);

      this.contractService
        .uploadContractResource({
          orderId: this.orderId,
          materialUrls: urls
        })
        .subscribe(data => resolve(true), err => reject(err));
    });
  }

  /**
   * 查看订单合同资料
   * @param 订单ID
   */
  getContractResourceAll(orderId) {
    this.contractService
      .getContractResourceAll(orderId)
      .subscribe(
        data => (this.uploadedDataSet = data),
        err => this.$Message.error(err)
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
