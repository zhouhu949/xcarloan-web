<template>
  <section class="component car-params">
    <i-card title="车型信息">
      <a slot="extra" @click="getCarBaseInfo" v-show="!isView">
        <i-icon type="refresh"></i-icon>
        刷新
      </a>
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="车辆品牌" :span="4">{{carBaseInfo.brandName}}</data-grid-item>
        <data-grid-item label="车辆系列" :span="4">{{carBaseInfo.seriesName}}</data-grid-item>
        <data-grid-item label="车型名称" :span="4">{{carBaseInfo.modelName}}</data-grid-item>
      </data-grid>
    </i-card>
    <i-card title="基本参数">
      <a slot="extra" @click="onAddParamClick" v-show="!isView">
        <i-icon type="plus-round"></i-icon>
        添加参数
      </a>
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item label="长宽高" :span="6">{{carBaseInfo.modelVolume}}</data-grid-item>
        <data-grid-item label="车身结构" :span="6">{{carBaseInfo.structure}}</data-grid-item>
        <data-grid-item label="驱动方式" :span="6">{{carBaseInfo.diveway}}</data-grid-item>
        <data-grid-item label="燃料形式" :span="6">{{carBaseInfo.fulyway}}</data-grid-item>
        <data-grid-item label="综合油耗" :span="6">{{carBaseInfo.modelFuel}}</data-grid-item>
        <data-grid-item label="车辆排量" :span="6">{{carBaseInfo.displacement}}</data-grid-item>
        <data-grid-item label="车身颜色" :span="6">{{carBaseInfo.modelColors}}</data-grid-item>
        <data-grid-item label="内饰颜色" :span="6">{{carBaseInfo.innerColor}}</data-grid-item>
      </data-grid>
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left">
        <data-grid-item v-for="(item,index) of carParamList" :key="index" :span="4" :label="item.carParamName">
          <div class="prams-item">
            <span>{{item.carParamValue}}</span>
            <a @click="onDeleteParamClick(item)" v-show="!isView">
              <i-icon type="close-circled" size="24" color="#ed3f14"></i-icon>
            </a>
          </div>
        </data-grid-item>
      </data-grid>
    </i-card>
    <i-card title="车辆主图">
      <a slot="extra" @click="onSaveMainPicClick" v-show="!isView">
        <i-icon type="ios-cloud-upload"></i-icon>
        应用主图
      </a>
      <upload-voucher v-model="carMainPhotos" :transfer="true" ref="upload-voucher"></upload-voucher>
      <!-- <upload-voucher :hiddenUpload="isView" :hiddenDelete="!isView" @financeUploadResources="list => carMainPhotos = list" :pictureResource="carMainPhotos" ref="main-pic"></upload-voucher> -->
    </i-card>
    <i-card title="车型介绍">
      <a slot="extra" @click="onAddRecommendClick" v-show="!isView">
        <i-icon type="plus-round"></i-icon>
        添加栏目
      </a>
      <data-grid :labelWidth="120" labelAlign="right" contentAlign="left" v-for="(item,index) of carRecommends" :key="index">
        <data-grid-item label="栏目名称" :span="12">
          <div class="prams-item">
            <span>{{item.name}}</span>
            <a @click="onDeleteRecommendClick(item)" v-show="!isView">
              <i-icon type="close-circled" size="24" color="#ed3f14"></i-icon>
            </a>
          </div>
        </data-grid-item>
        <data-grid-item label="栏目图片" :span="12">
          <div class="columnImg">
            <img height="100%" v-for="(itemTwo,index) in item.pictureList" :key="index" :src="itemTwo" alt="">
          </div>
        </data-grid-item>
        <data-grid-item label="栏目介绍" :span="12">{{item.comment}}</data-grid-item>
      </data-grid>
    </i-card>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import CarRecommend from "~/components/base-data/car-recommend.vue";
import UploadVoucher from "~/components/common/upload-voucher.vue";
import CarParmsBase from "~/components/base-data/car-parms-base.vue";

@Component({
  components: {
    DataGrid, DataGridItem, UploadVoucher
  }
})
export default class CarParams extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  // 车辆品牌ID
  @Prop() carId;

  @Prop({
    type: Boolean,
    default: false
  }) isView

  @Watch('carId', { immediate: true })
  onCarIdChange() {
    if (this.carId) {
      // this.carMainPhotos = [] 
      this.getCarBaseInfo()    // 车辆基本信息
      this.getCarParams()      // 查看添加的参数
      this.getCarRecommendList()  // 车型介绍
      this.getCarPictureList()   // 查看车辆主图
    }
  }

  // 车辆基本信息
  private carBaseInfo: any = {};
  // 车辆基本参数
  private carParamList: Array<any> = [];
  // 车型介绍参数
  private carRecommends: Array<any> = [];
  // 车辆主主视图
  private carMainPhotos: Array<any> = [];





  /**
   * 获取车辆主图
   */
  private getCarPictureList() {
    this.basicCarManageService.getCarModelPhotoList(this.carId).subscribe(
      data => {
        let imgAll = []
        let picture = []    
        imgAll = data.map(v => {
          return Object.assign({ img: v.photoUrl.split(',') }, v)
        })
        for (let i = 0; i < imgAll.length; i++) {
          for (let s = 0; s < imgAll[i].img.length; s++) {
            picture.push({
              url: imgAll[i].img[s],
              name:imgAll[i].remark
            })
          }
        }
        this.carMainPhotos = picture
      },
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 保存主视图
   */
  private onSaveMainPicClick() {
    let carMasterMap = []
    this.carMainPhotos.forEach(element => {
      carMasterMap.push(element.url)
    });

    let vehicleImages = {
      photoUrl: carMasterMap,
      modelId: this.carId,
    }
    this.basicCarManageService.addCarModelPhoto(vehicleImages).subscribe(
      data => {
        this.$Message.success('应用成功')
      },
      err => {
        this.$Message.error(err.msg)
      }
    )
  }


  /**
   * 获取车辆基本信息
   * 外部有使用
   */
  getCarBaseInfo() {
    this.basicCarManageService.getCarParams(this.carId).subscribe(
      data => this.carBaseInfo = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 获取车辆可配置参数
   */
  private getCarParams() {
    this.basicCarManageService.findCarConfigParamList(this.carId).subscribe(
      data => this.carParamList = data,
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 查看车辆栏目介绍列表
   */
  private getCarRecommendList() {
    this.basicCarManageService.findCarIntroduceList(this.carId).subscribe(
      data => {
        this.carRecommends = data.map(v => {
          return {
            id: v.id,
            name: v.introduceName,
            comment: v.remark,
            pictureList: v.introduceUrl.split(',')
            // pictureList: v.introduceUrl.map(p => {
            //   return {
            //     materialUrl: p.url
            //   }
            // })
          }


        })
      },
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 添加基本参数
   */
  private onAddParamClick() {
    this.$dialog.show({
      title: '添加参数',
      footer: true,
      onOk: addParam => {
        let result = addParam.submit().then(() => {
          this.getCarParams()
        }).catch(v => false)
        return result
      },
      onCalcel: () => { },
      render: h => {
        return h(CarParmsBase, {
          props: {
            carId: this.carId
          }
        })
      }
    })
  }


  // 新增栏目
  private onAddRecommendClick() {
    this.$dialog.show({
      title: '添加栏目',
      footer: true,
      onOk: addRecommend => {
        let result = addRecommend.submit().then(() => {
          this.getCarRecommendList()
        }).catch(v => false)
        return result
      },
      onCalcel: () => { },
      render: h => {
        return h(CarRecommend, {
          props: {
            carId: this.carId
          }
        })
      }
    })
  }
  /**
   * 删除配置的参数
   */
  private onDeleteParamClick(item) {
    this.$Modal.confirm({
      content: `是否删除参数: <b>${item.carParamName}</b>`,
      onOk: () => {
        this.basicCarManageService.deleteCarConfigParam(item.id).subscribe(
          data => {
            this.$Message.success(`已删除参数: <b>${item.carParamName}</b>`)
            this.getCarParams()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }
  /**
   * 删除车辆栏目
   */
  private onDeleteRecommendClick(item) {
    console.log(item, '删除车辆栏目')
    this.$Modal.confirm({
      content: `是否删除栏目: <b>${item.name}</b>`,
      onOk: () => {
        this.basicCarManageService.deleteCarIntenduceInfo(item.id).subscribe(
          data => {
            this.$Message.success(`已删除栏目: <b>${item.name}</b>`)
            this.getCarRecommendList()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }


}
</script>

<style lang="less" scoped>
.component .car-params {
  .columnImg {
    height: 150px;
  }
  .prams-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
