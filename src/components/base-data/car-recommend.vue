<template>  
  <section class="component car-recommend">
    <i-form :model="model" :rules="rules" ref="form" :label-width="110">
      <i-form-item label="栏目名称" prop="name">
        <i-input v-model="model.name" placeholder="请输入栏目名称"></i-input>
      </i-form-item>
      <i-form-item label="栏目图片" prop="pictureList">
        <upload-voucher v-model="model.pictureList" :transfer="true" ref="upload-voucher" ></upload-voucher>
      </i-form-item>
      <i-form-item label="栏目介绍" prop="comment">
        <i-input type="textarea" v-model="model.comment" placeholder="请输入栏目的介绍信息" :row="2"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
import { Form } from "iview";
import UploadVoucher from "~/components/common/upload-voucher.vue";

@Component({
  components: {
    UploadVoucher

  }
})
export default class CarRecommend extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  @Prop({
    required: true,
    type: Number
  }) carId


  private form: Form
  private pictureList: any = []
  private pictureNumber:Boolean = false

  private model = {
    name: "", // 栏目名称
    pictureList: [], // 栏目图片
    comment: "" // 栏目介绍
  }

  private rules = {
    name: { required: true, message: '请输入系列名称', trigger: 'blur' },
    pictureList: { required: true, type: 'array', message: '请上传车辆品牌图标', trigger: 'blur' }
  }


  /**
  * 上传的文件
  */
  fileNumber(item) {
    if(item.length>0){
      this.pictureNumber = true
    }
    this.model.pictureList = item.map(v => {
      return {
        url: v.materialUrl
      }
    })
  }
  deleteFile(){
    this.pictureNumber = false
  }

  /**
    * 确定新增车型介绍
    */
  submit() {
    
    return new Promise((resolve, reject) => {
      this.form.validate(r => {
        if (!r) return reject()
        //  console.log(this.model)
         let imgList = [] 
         this.model.pictureList.forEach( val => {
            imgList.push(val.url)
        });
          let modul ={
            name: this.model.name,
            comment:this.model.comment,
            imgall : imgList,
            id : this.carId
          }
        this.basicCarManageService.addCarIntenduceInfo(modul).subscribe(
          data => {
            this.$Message.success('添加车辆栏目成功')
            resolve()
          },
          err => {
            this.$Message.error(err.msg)
            reject()
          }
        )
      })
    })

  }

  mounted() {
    this.form = this.$refs['form']

   

  }



}
</script>

<style lang="less" scoped>
</style>
