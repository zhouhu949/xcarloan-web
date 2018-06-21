<template>
  <section class="page vehicle-maintenance">
    <page-header title="车辆配置" hiddenPrint hiddenExport></page-header>
    <i-row class="form" :gutter="16">
      <i-col class="data-form" :span="6">
        <i-row class="data-form-item">
          <div class="data-form-item-icon"></div>
          <span>车辆品牌</span>
        </i-row>
        <div class="data-form-tree">
          <!-- <organize-tree :dataList="orgData" @add="addDept" @change="onChange" @remove="removeDept" @edit="editDept"></organize-tree> -->
          <!-- <i-tree :data="carDataTree"></i-tree> -->
          <data-tree ref="data-tree" showEdit :data="carDataTree" @on-edit="onEdit" @on-addEdit="onAddEdit" @on-deleteEdit="ondeleteEdit"></data-tree>
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
import { State, Mutation, Action } from "vuex-class";
import CarBrand from "~/components/base-data/car-brand.vue";
import CarSeries from "~/components/base-data/car-series.vue";
import AddVehicle from '~/components/base-data/add-vehicle.vue'
import OrganizeTree from '~/components/common/organize-tree.vue'
import DataTree from "~/components/common/data-tree.vue";
import CarParams from "~/components/base-data/car-params.vue";

enum carPropertyType {
  /**
   * 品牌
   */
  brand,
  /**
   * 系列
   */
  series,
  /**
   * 车型
   */
  model
}

@Layout('workspace')
@Component({
  components: {
    OrganizeTree,
    DataTree
  }
})
export default class VehicleMaintenance extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService

  // @State("userToken") userToken;
  private dataList: Array<any> = []  // 首页树获取后台数据
  private treeData: Array<any> = []
  private treeDatas: any = []
  private selectedNodeKey = ""  // 当前选中树的节点的Key
  private carId: Number = 0
  private addVehicleModal: Boolean = false // 添加车辆

  private carDataTree = [];

  /**
  * 获取所有车辆系列
  */
  getAllCarData() {
    this.basicCarManageService.findAllCarTreeList().subscribe(
      data => {
        // this.dataList = data
        // this.getTreeDate()
        // let treeData = this.$common.generateTreeData(data)
        console.log(data, 'carData')

        let treeData = data.map(brand => {
          return {
            id: brand.id,
            title: brand.brandName,
            type: carPropertyType.brand,
            children: brand.carBrandSeries.map(series => {
              return {
                id: series.id,
                name: series.seriesName,
                title: series.seriesName,
                type: carPropertyType.series,
                children: series.carModel.map(model => {
                  return {
                    id: model.id,
                    name: model.modelName,
                    type: carPropertyType.model,
                    title: model.modelName
                  }
                })
              }
            })
          }
        })

        this.carDataTree = [
          {
            id: 0,
            title: "所有车辆",
            children: treeData
          }
        ]

        console.log(this.carDataTree)

      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }


  // 添加车辆系列
  addSeries(data) {
    this.$dialog.show({
      title: "新增车系",
      footer: true,
      onOk: addSeries => {
        let result = addSeries.confirmAddSeries().then(() => {
          this.getAllCarData()
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
  // 修改品牌 
  repairCarBrand(data) {

  }
  // 添加车辆
  addVehicle(data) {
    this.$dialog.show({
      title: "添加车辆",
      footer: true,
      onOk: addCar => {
        return addCar.addVehicle().then(() => {
          this.getAllCarData()
        }).catch(v => false)
      },
      onCancel: () => { },
      render: h => h(AddVehicle, {
        props: {
          series: {
            id: data.seriesId,
            name: data.title
          }
        }
      })
    })
  }










  // 树点击修改事件
  private onEdit(data) {
    switch (data.type) {
      case carPropertyType.brand:
        // console.log(data, '品牌')
        this.$dialog.show({
          title: "修改品牌",
          footer: true,
          onOk: editBrand => {
            let result = editBrand.confirmRepair().then(() => {
              this.getAllCarData()
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
      case carPropertyType.series:
        // console.log(data, '系列')
        this.$dialog.show({
          title: "修改车系",
          footer: true,
          onOk: editSeries => {
            let result = editSeries.confirmSeriesRepair().then(() => {
              this.getAllCarData()
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
      case carPropertyType.model:
        console.log(data, '修改车型')
        this.$dialog.show({
          title: "修改车辆",
          footer: true,
          onOk: modify => {
            let result = modify.updateVehicle().then(() => true).catch(v => false)
            return result
          },
          onCancel: () => { },
          render: h => h(AddVehicle, {
            props: {
              carId: data.id
            }
          })
        })

        break;

      default:
        console.error('所有车辆不可编辑')
        break;
    }
  }
  // 树点击新增事件
  private onAddEdit(data) {
    switch (data.type) {
      case carPropertyType.brand:
        console.log(data, '车系')
        this.$dialog.show({
          title: "新增车系",
          footer: true,
          onOk: addSeries => {
            let result = addSeries.confirmAddSeries().then(() => {
              this.getAllCarData()
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
      case carPropertyType.series:
        console.log(data, '车型')
        this.$dialog.show({
          title: "添加车辆",
          footer: true,
          onOk: addCar => {
            return addCar.addVehicle().then(() => {
              this.getAllCarData()
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
      case carPropertyType.model:
        console.log(data, '- - ')

        break;

      default:
        this.$dialog.show({
          title: "新增品牌",
          footer: true,
          onOk: addBrand => {
            let result = addBrand.confirmAddBrand().then(() => {
              this.getAllCarData()
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
  private ondeleteEdit(data) {
    switch (data.type) {
      case carPropertyType.brand:
        // 删除品牌
        if (data.children.length !== 0) {
          this.$Message.error('当前不允许删除')
          return
        }
        this.basicCarManageService.deleteCarBrand(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCarData()
          }, err => {
            this.$Message.error(err.msg)
          })

        break;
      case carPropertyType.series:
        // 删除车系
        if (data.children.length !== 0) {
          this.$Message.error('当前不允许删除')
          return
        }
        this.basicCarManageService.deleteCarSeries(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCarData()
          }, err => {
            this.$Message.error(err.msg)
          })

        break;
      case carPropertyType.model:
        // 删除车型
        console.log(data, '车型')
        this.basicCarManageService.deleteCarModel(data.id)
          .subscribe(data => {
            this.$Message.success('删除成功')
            this.getAllCarData()
          }, err => {
            this.$Message.error(err.msg)
          })
        break;

      default:
        console.error('所有车辆不可编辑')
        break;
    }
  }


  mounted() {
    this.getAllCarData()
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

