<template>
  <section class="page vehicle-maintenance">
    <page-header title="车辆维护" hiddenPrint hiddenExport></page-header>
    <i-row class="form" :gutter="16">
      <i-col class="data-form" :span="6">
        <i-row class="data-form-item">
          <div class="data-form-item-icon"></div>
          <span>车辆品牌</span>
        </i-row>
        <div class="data-form-tree">
          <data-tree ref="data-tree" showEdit :data="carTreeData" @on-clickNode="onClickNode" @on-edit="onEdit" @on-add="onAddClick" @on-delete="ondeleteClick"></data-tree>
        </div>
      </i-col>
      <i-col class="command" :span="18">
        <car-params v-if="carId" :carId="carId"></car-params>
        <div v-else class="empty-text">空空如也，请选择车辆^_^</div>
      </i-col>

    </i-row>

  </section>
</template>
<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { BasicCarManageService } from '~/services/manage-service/basic-car-manage.service'
import { Action, Getter, namespace } from "vuex-class";
import CarBrand from "~/components/base-data/car-brand.vue";
import CarSeries from "~/components/base-data/car-series.vue";
import AddVehicle from '~/components/base-data/add-vehicle.vue'
import OrganizeTree from '~/components/common/organize-tree.vue'
import DataTree from "~/components/common/data-tree.vue";
import CarParams from "~/components/base-data/car-params.vue";
import { CarPropertyType } from "~/config/enum.config";

const CarModule = namespace("carSpace")

@Layout('workspace')
@Component({
  components: {
    OrganizeTree,
    DataTree,
    CarParams
  }
})
export default class VehicleMaintenance extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService
  @CarModule.Action getAllCar;
  @CarModule.Getter carTreeData;

  // @State("userToken") userToken;
  private dataList: Array<any> = []  // 首页树获取后台数据
  private treeData: Array<any> = []
  private treeDatas: any = []
  private selectedNodeKey = ""  // 当前选中树的节点的Key
  private carId: Number = 0
  private addVehicleModal: Boolean = false // 添加车辆


  // 添加车辆系列
  addSeries(data) {
    this.$dialog.show({
      title: "新增车系",
      footer: true,
      onOk: addSeries => {
        let result = addSeries.confirmAddSeries().then(() => {
          this.getAllCar()
        }).catch(v => false)
        return result
      },
      onCancel: () => { },
      render: h => {
        return h(CarSeries, {
          props: {
            brandId: data.brandId
          }
        })
      }
    })
  }
  // 添加车辆
  addVehicle(data) {
    this.$dialog.show({
      title: "添加车辆",
      footer: true,
      onOk: addCar => {
        return addCar.addVehicle().then(() => {
          this.getAllCar()
        }).catch(v => false)
      },
      onCancel: () => { },
      render: h => h(AddVehicle, {
        props: {
          series: {
            id: data.id,
            name: data.title
          }
        }
      })
    })
  }

  // 树点击修改事件
  private onEdit(data) {
    switch (data.type) {
      case CarPropertyType.BRAND:
        this.$dialog.show({
          title: "修改品牌",
          footer: true,
          onOk: editBrand => {
            let result = editBrand.confirmRepair().then(() => {
              this.getAllCar()
            }).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => {
            return h(CarBrand, {
              props: {
                id: data.id
              }
            })
          }
        })
        break;
      case CarPropertyType.SERIES:
        this.$dialog.show({
          title: "修改车系",
          footer: true,
          onOk: editSeries => {
            let result = editSeries.confirmSeriesRepair().then(() => {
              this.getAllCar()
            }).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => {
            return h(CarSeries, {
              props: {
                series: {
                  id: data.id,
                  name: data.title
                }
              }
            })
          }
        })

        break;
      case CarPropertyType.MODEL:
        this.$dialog.show({
          title: "修改车辆",
          footer: true,
          onOk: modify => {
            let result = modify.updateVehicle().then(() => {
              this.getAllCar()
            }).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => h(AddVehicle, {
            props: {
              carId: data.id,
              name: data.title
            }
          })
        })

        break;

      default:
        this.$Message.error('当前节点不允许操作')
        break;
    }
  }
  // 树点击新增事件
  private onAddClick(data) {
    switch (data.type) {
      case CarPropertyType.BRAND:
        console.log(data, '车系')
        this.$dialog.show({
          title: "新增车系",
          footer: true,
          onOk: addSeries => {
            let result = addSeries.confirmAddSeries().then(() => {
              this.getAllCar()
            }).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => {
            return h(CarSeries, {
              props: {
                brandId: data.id
              }
            })
          }
        })

        break;
      case CarPropertyType.SERIES:
        this.$dialog.show({
          title: "添加车辆",
          footer: true,
          onOk: addCar => {
            return addCar.addVehicle().then(() => {
              this.getAllCar()
            }).catch(v => false)
          },
          onCancel: () => { },
          render: h => h(AddVehicle, {
            props: {
              series: {
                id: data.id,
                name: data.title
              }
            }
          })
        })


        break;
      case CarPropertyType.MODEL:
        this.$Message.error('当前节点不允许操作')
        break;

      default:
        this.$dialog.show({
          title: "新增品牌",
          footer: true,
          onOk: addBrand => {
            let result = addBrand.confirmAddBrand().then(() => {
              this.getAllCar()
            }).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => h(CarBrand)
        })
        break;
    }

  }

  // 树点击删除事件
  private ondeleteClick(data) {
    switch (data.type) {
      case CarPropertyType.BRAND:
        // 删除品牌
        if (data.children.length !== 0) {
          this.$Message.error('当前不允许删除')
          return
        }
        this.basicCarManageService.deleteCarBrand(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCar()
          }, err => {
            this.$Message.error(err.msg)
          })

        break;
      case CarPropertyType.SERIES:
        // 删除车系
        if (data.children.length !== 0) {
          this.$Message.error('当前不允许删除')
          return
        }
        this.basicCarManageService.deleteCarSeries(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCar()
          }, err => {
            this.$Message.error(err.msg)
          })

        break;
      case CarPropertyType.MODEL:
        // 删除车型
        this.basicCarManageService.deleteCarModel(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCar()
          }, err => {
            this.$Message.error(err.msg)
          })
        break;

      default:
        this.$Message.error('当前节点不允许操作')
        break;
    }
  }

  // 点击树当前节点 
  private onClickNode(data) {
    if (data.type === CarPropertyType.MODEL) {
      this.carId = data.id
    } else {
      this.carId = 0
    }
  }



}
</script>
<style lang="less" scoped>
.page.vehicle-maintenance {
  .textButton {
    width: 61px;
    color: #265ea2;
    display: inline-block;
    cursor: pointer;
  }
  .empty-text {
    height: 300px;
    text-align: center;
    line-height: 400px;
    position: absolute;
    top: 0;
    left: 350px;
  }
  .form {
    margin-top: 10px;
    .data-form {
      border: 1px solid #dddddd;
      padding: 20px 0;
      height: 590px;
      .data-form-item {
        border-bottom: 1px solid #dddddd;
        position: relative;
        bottom: 18px;
        span {
          position: relative;
          left: 5px;
          font-size: 16px;
        }
        .data-form-item-icon {
          width: 4px;
          height: 15px;
          background: rgb(38, 94, 162);
          display: inline-block;
          margin-left: 10px;
          position: relative;
          top: 2px;
        }
      }
      .data-form-tree {
        height: 561px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        bottom: 18px;
      }
    }
    .command {
      height: 590px;
      border: 1px solid #dddddd;
      padding: 20px;
      .command-item {
        margin-top: 10px;
      }
      .command-button {
        float: right;
        margin-right: 50px;
      }
      .parms-container {
        width: 48px;
        span {
          margin-top: 10px;
        }
        div {
          padding: 8px 0;
          text-align: center;
          color: rgb(212, 211, 211);
          cursor: pointer;
        }
        .carTypesCss {
          color: black;
          font-weight: bold;
        }
      }
      .command-table {
        margin-left: 70px;
        overflow: auto;
        height: 450px;
        position: relative;
        .table-container {
          // text-align-last: center;
          text-align: center;
          border: 1px solid #dddd;
          .canshu-input {
            margin-top: 25px;
          }
          .ivu-row-flex {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #e9eaec;
            background: #f8f8f9;
          }
          .ivu-row {
            border-bottom: 1px solid #e9eaec;
          }
          .ivu-form-item-content {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.page.vehicle-maintenance {
  .tree-node {
    &.selected {
      background: #d5e8fc;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

