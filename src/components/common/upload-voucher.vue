<template> 
  <section class="component upload-voucher">
    <div class="row image-container">
      <div class="modal-item-upload" v-if="!hiddenUpload">
        <div class="modal-item-upload-div" @click="showFileUpload">
          <Icon type="plus-circled" class="modal-item-upload-icon" color="#265ea2" size="40"></Icon>
          <h2 class="modal-item-upload-add">点击添加附件</h2>
          <h3 class="modal-item-upload-text">支持jpg/png格式</h3>
          <h3 class="modal-item-upload-text">建议大小不超过10M</h3>
        </div>
      </div>
      <!--补传的没有删除-->
      <div class="modal-item-upload-col" v-for="(v,i) in financeUploadVoucher" :key="i">
        <img class="modal-item-upload-img" :src="v.materialUrl">
        <div class="blackFlag">
          <i-button type="text" icon="eye" @click.native="preview(v)" class="buttonFlag eye"></i-button>
          <i-button type="text" icon="arrow-down-a" @click.native="download(v)" class="buttonFlag arrow"></i-button>
        </div>
      </div>
      <!--正常上传-->
      <div class="modal-item-upload-col" v-for="(v,i) in financeUploadResources" :key="i">
        <img class="modal-item-upload-img" :src="v.materialUrl">
        <div class="blackFlag" >
          <i-button type="text" icon="eye" @click.native="preview(v)" class="buttonFlag eye"></i-button>
          <i-button type="text" icon="arrow-down-a" @click.native="download(v)" class="buttonFlag arrow"></i-button>
          <i-button type="text" icon="trash-a" @click.native="handleRemove(v)" class="buttonFlag outline" v-if="!hiddenDelete"></i-button>
        </div>
      </div>
    </div>
    <template>
      <i-modal title="预览" v-model="previewModel" :transfer="false">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FileUpload from "~/components/common/file-upload.tsx.vue";
import { CommonService } from "~/utils/common.service";
import { Prop, Model, Emit, Watch } from "vue-property-decorator";
@Component({
  components: {
    FileUpload
  }
})
export default class UploadVoucher extends Vue {
  //隐藏上传
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenUpload: boolean;
  //隐藏删除
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenDelete: boolean;

  private openUpload: Boolean = false;
  private financeUploadResources: any = [];
  private financeUploadVoucher:any = [];
  private previewModel: Boolean = false;
  private url: any = ''

  showFileUpload(){
    let fileUploadModel
    let dialog = this.$dialog.show({
      title: "上传文件",
      footer: true,
      onOk: fileUpload => {
        fileUploadModel = fileUpload
        fileUpload.upload();
      },
      render: h => {
        return h(FileUpload, {
          on: {
            "on-success": ()=>{
              this.$nextTick(() => {
                this.financeUploadResources = this.financeUploadResources.concat(fileUploadModel.fileList.map(v => {
                  return {
                    materialUrl: v.response.url,
                    materialType: v.response.type,
                    originName: v.response.name
                  }
                }))
                this.$emit('financeUploadResources', this.financeUploadResources)
              });
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
    // if (file.type === 'jpg' || file.type === 'png' || file.type === "JPG" || file.type === 'PNG') {
    this.previewModel = true
    this.url = file.materialUrl
    // } else {
    //   window.open(file.materialUrl)
    // }
  }
  /**
   * 下载附件
   */
  download(file) {
    CommonService.downloadFile(file.materialUrl, '');
  }
  /**
   *删除附件
   */
  handleRemove(file) {
    this.financeUploadResources.splice(this.financeUploadResources.indexOf(file), 1);
    this.$emit('financeUploadResources', this.financeUploadResources)
  }
  reset() {
    this.financeUploadResources = []
  }
  //正常返显
  Reverse(data) {
    if (data) {
      this.financeUploadResources = data
    }
  }
  // 补传返显
  reverseType(data){
    if (data) {
      this.financeUploadVoucher = data
    }
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
