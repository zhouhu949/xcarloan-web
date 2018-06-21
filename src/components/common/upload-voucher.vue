<template>
  <section class="component upload-voucher">
    <div class="row image-container">
      <div class="modal-item-upload" v-show="!hiddenUpload">
        <div class="modal-item-upload-div" @click="showFileUpload">
          <Icon type="plus-circled" class="modal-item-upload-icon" color="#265ea2" size="40"></Icon>
          <h2 class="modal-item-upload-add">点击添加附件</h2>
          <h3 class="modal-item-upload-text">支持jpg/png格式</h3>
          <h3 class="modal-item-upload-text">建议大小不超过2M</h3>
        </div>
      </div>
      <div class="modal-item-upload-col" v-for="(v,i) in pictureResource" :key="i">
        <img class="modal-item-upload-img" :src="v.url" :alt="v.name">
        <div class="blackFlag">
          <i-button type="text" icon="eye" @click.native="preview(v)" class="buttonFlag eye"></i-button>
          <i-button type="text" icon="arrow-down-a" @click.native="download(v)" class="buttonFlag arrow"></i-button>
          <i-button type="text" icon="trash-a" @click.native="handleRemove(v)" class="buttonFlag outline" v-if="!hiddenDelete"></i-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { Prop, Model, Emit, Watch } from "vue-property-decorator";
@Component({
  components: {
    FileUpload
  }
})
export default class UploadVoucher extends Vue {


  //隐藏删除
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenDelete: boolean;

  @Model("on-resource-change", {
    default: () => []
  })
  pictureResource: Array<any>

  @Emit('on-resource-change')
  emitResourceChange(val) { }

  /**
   * 文件数量限制
   */
  @Prop() fileNumberLimit: Number;

  private openUpload: Boolean = false;
  private financeUploadResources: any = [];
  private financeUploadVoucher: any = [];
  private previewModel: Boolean = false;
  private viewPic: any = {}

  /**
   * 计算是否显示上传按钮
   */
  get hiddenUpload() {
    // 最大写死99个文件
    return this.pictureResource.length >= (this.fileNumberLimit || 99)
  }

  showFileUpload() {
    let fileUploadModel
    let dialog = this.$dialog.show({
      title: "上传文件",
      footer: true,
      onOk: fileUpload => {
        fileUploadModel = fileUpload
        return fileUpload.upload();
      },
      render: h => {
        return h(FileUpload, {
          props: {
            fileNumberLimit: this.fileNumberLimit
          },
          on: {
            "on-success": (fileList) => {
              let uploadPics = fileList.map(v => v.response)
              this.emitResourceChange([...this.pictureResource, ...uploadPics])
            }
          }
        });
      }
    });
  }

  /**
   * 预览
   */
  preview(file) {
    this.$dialog.show({
      title: file.name,
      render: h => h('div',
        {
          style: {
            align: "center",
          },
        },
        [h('img',
          {
            style: {
              width: "100%"
            },
            attrs: {
              src: file.url,
              alt: file.name
            }
          })
        ]
      )
    })
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
    let deleteIndex = this.pictureResource.indexOf(file)
    this.emitResourceChange([...this.pictureResource.slice(0, deleteIndex), ...this.pictureResource.slice(deleteIndex + 1)])
  }


}
</script>
<style lang="less" scoped>
.component.upload-voucher {
  .image-container {
    & > * {
      margin: 10px;
    }
  }
  .modal-item-upload {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .modal-item-upload-div {
      height: 200px;
      width: 200px;
      cursor: pointer;
      text-align: center;
      background-color: rgb(244, 244, 244);
    }
    .modal-item-upload-icon {
      display: block;
      margin-top: 40px;
    }
    .modal-item-upload-add {
      margin-top: 5px;
    }
    .modal-item-upload-text {
      color: gray;
    }
  }
  .modal-item-upload-col {
    position: relative;
    margin-top: 10px;
    /*height: 200px;*/
    /*width: 200px;*/
    .modal-item-upload-img {
      height: 200px;
      width: 200px;
    }
    .blackFlag {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 30px;
      background: aquamarine;
      opacity: 0.4;
      display: none;
      .buttonFlag {
        position: absolute;
        top: -5px;
        /*left: 150px;*/
        display: block;
        font-size: 20px;
        &.eye {
          left: 100px;
        }
        &.arrow {
          left: 130px;
        }
        &.outline {
          left: 160px;
        }
      }
    }
    &:hover {
      .blackFlag {
        display: block;
      }
    }
  }
}
</style>
