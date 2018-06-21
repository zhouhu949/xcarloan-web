<template>
  <section class="component car-brand">
    <i-form :model="model" :rules="rules" ref="form" :label-width="110">
      <i-form-item label="品牌名称" prop="name">
        <i-input v-model="model.name"></i-input>
      </i-form-item>
      <i-form-item label="品牌图标" prop="pictureList">
        <upload-voucher v-model="model.pictureList" :transfer="true" ref="upload-voucher"  :fileNumberLimit="limitNum"></upload-voucher>
      </i-form-item>
    </i-form>
  </section>

</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import UploadVoucher from "~/components/common/upload-voucher.vue";
import { Form } from "iview";
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
@Component({
  components: {
    UploadVoucher
  }
})
export default class CarBrand extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  // 车辆品牌
  @Prop() id;

  private form: Form

  private model = {
    name: "",
    pictureList: []
  }

  /**
   * 限制图片数量
   */
  private limitNum: number = 1;

  private rules = {
    name: { required: true, message: '请输入车辆品牌', trigger: 'blur' },
    pictureList: { required: true, type: 'array', message: '请上传车辆品牌图标', trigger: 'blur' }
  }

  // 图片反显资源
  private pictureResource: Array<any> = []


  /**
  * 确定新增品牌
  */
  confirmAddBrand() {
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        if (!r) return reject()
        this.basicCarManageService.addCarBrand(this.model.name, this.model.pictureList[0].materialUrl)
          .subscribe(
            data => {
              this.$Message.success('新增品牌成功！')
              resolve()
            }, err => {
              this.$Message.error(err.msg)
              reject();
            }
          )
      })
    })
  }

  /**
  * 确定修改品牌和车系
  */
  confirmRepair() {
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        if (!r) return reject()
        this.basicCarManageService.editCarBrand({
          id: this.id,
          brandName: this.model.name,
          brandPhotoUrl: this.model.pictureList[0].materialUrl
        })
          .subscribe(data => {
            console.log(this.id)
            this.$Message.success('修改成功')
            resolve()
          }, err => {
            this.$Message.error(err.msg)
            reject()
          })
      })
    })
  }


  mounted() {
    this.form = this.$refs['form']

    if (this.id) {
      this.basicCarManageService.getCarBrandById(this.id).subscribe(
        data => {
          this.model.name = data.brandName
          let picture = {
            url: data.brandPhotoUrl,
            name: data.brandName
          }
          this.model.pictureList = [picture]
        },
        err => this.$Message.error(err.msg)
      )
    }



  }

}
</script>

<style lang="less" scoped>
</style>
