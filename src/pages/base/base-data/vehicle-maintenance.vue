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
          <i-tree :data="treeData"></i-tree>
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
@Layout('workspace')
@Component({
  components: {
      OrganizeTree,
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

  /**
  * 获取所有车辆系列
  */
  getCarseries() {
    this.basicCarManageService.findAllCarTreeList().subscribe(
      data => {
        this.dataList = data
        this.getTreeDate()
        console.log(data)
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }
  /**
   * 车系列树遍历
   */
  getTreeDate() {
    let series: Map<string, any> = new Map()
    this.dataList.map(t => {
      if (t.id) {
        series.set(t.id, t)
      }
    })
    this.treeDatas = []
    series.forEach(item => {
      let lv1Node = {
        title: item.brandName,
        brandId: item.id,
        expand: true,
        render: (h, { root, node, data }) => {
          return h('span', [
            h('span', {}, data.title),     // 品牌名称！！
            h(
              'span',
              {
                on: {
                  click: () => {
                    this.addSeries(data)  //添加系列
                  }
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'android-add'
                  },
                  style: {
                    marginLeft: '8px',
                    color: '#265ea2',
                    cursor: 'pointer'
                  }
                })
              ]
            ),
            h(
              'span',
              {
                on: {
                  click: () => {
                    this.repairCarBrand(data) // 修改品牌
                  }
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'android-create'
                  },
                  style: {
                    marginLeft: '8px',
                    color: '#265ea2',
                    cursor: 'pointer'
                  }
                })
              ]
            ),
            h(
              'span',
              {
                on: {
                  click: () => {
                    this.deleteCarBrand(data)   // 删除品牌
                  }
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'android-remove'
                  },
                  style: {
                    marginLeft: '8px',
                    color: '#265ea2',
                    cursor: 'pointer'
                  }
                })
              ]
            )
          ])
        },
        children: item.carBrandSeries.map(v => {
          return {
            title: v.seriesName,
            seriesId: v.id,
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', [
                h('span', {}, data.title),
                h(
                  'span',
                  {
                    on: {
                      click: () => {
                        this.addVehicle(data)   //添加车辆
                      }
                    }
                  },
                  [
                    h('Icon', {
                      props: {
                        type: 'android-add'
                      },
                      style: {
                        marginLeft: '8px',
                        color: '#265ea2',
                        cursor: 'pointer'
                      }
                    })
                  ]
                ),
                h(
                  'span',
                  {
                    on: {
                      click: () => {
                        this.repairCarSeries(data)   // 修改车系
                      }
                    }
                  },
                  [
                    h('Icon', {
                      props: {
                        type: 'android-create'
                      },
                      style: {
                        marginLeft: '8px',
                        color: '#265ea2',
                        cursor: 'pointer'
                      }
                    })
                  ]
                ),
                h(
                  'span',
                  {
                    on: {
                      click: () => {
                        this.deleteCarseries(data)   // 删除车系
                      }
                    }
                  },
                  [
                    h('Icon', {
                      props: {
                        type: 'android-remove'
                      },
                      style: {
                        marginLeft: '8px',
                        color: '#265ea2',
                        cursor: 'pointer'
                      }
                    })
                  ]
                )
              ])
            },
            children: v.carModel.map(m => {
              return {
                title: m.modelName,
                carId: m.id,
                render: (h, { root, node, data }) => {
                  return h('span', [
                    h('div', {
                      class: {
                        'tree-node': true,
                        selected: this.selectedNodeKey === node.nodeKey,
                      },
                      style: {
                        display: 'inline-block'
                      },
                      on: {
                        click: () => {
                          this.selectedNodeKey = node.nodeKey
                          this.carId = data.carId
                        }
                      }
                    }, data.title),
                    h(
                      'span',
                      {
                        on: {
                          click: () => {
                            this.modifyCarBaseInfo(data)  // 新增车型
                          }
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'android-create'
                          },
                          style: {
                            marginLeft: '8px',
                            color: '#265ea2',
                            cursor: 'pointer'
                          }
                        })
                      ]
                    ),
                    h(
                      'span',
                      {
                        on: {
                          click: () => {
                            this.deleteCar(data)   // 删除车辆
                          }
                        }
                      },
                      [
                        h('Icon', {
                          props: {
                            type: 'android-remove'
                          },
                          style: {
                            marginLeft: '8px',
                            color: '#265ea2',
                            cursor: 'pointer'
                          }
                        })
                      ]
                    )
                  ])
                }
              }
            })
          }
        })
      }
      this.treeDatas.push(lv1Node)
    })
    this.treeData = [
      {
        expand: true,
        children: this.treeDatas,
        render: (h, { root, node, data }) => {
          return h('span', [
            h('span', {}, '所有品牌'),
            h(
              'span',
              {
                on: {
                  click: () => {
                    this.addBrand(data)     // 新增品牌
                  }
                }
              },
              [
                h('Icon', {
                  props: {
                    type: 'android-add'
                  },
                  style: {
                    marginLeft: '8px',
                    color: '#265ea2',
                    cursor: 'pointer'
                  }
                })
              ]
            )
          ])
        }
      }
    ]
  }

  // 添加车辆系列
  addSeries(data) {
    this.$dialog.show({
      title: "新增车系",
      footer: true,
      onOk: addSeries => {
        let result = addSeries.confirmAddSeries().then(() => {
          this.getCarseries()
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
    this.$dialog.show({
      title: "修改品牌",
      footer: true,
      onOk: editBrand => {
        let result = editBrand.confirmRepair().then(() => {
          this.getCarseries()
        }).catch(v => false)
        return result
      },
      onCancel: () => { },
      render: h => {
        return h(CarBrand, {
          props: {
            id: data.brandId
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
          this.getCarseries()
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
  // 修改车系
  repairCarSeries(data) {
    console.log(data, '修改车系')
    this.$dialog.show({
      title: "修改车系",
      footer: true,
      onOk: editSeries => {
        let result = editSeries.confirmSeriesRepair().then(() => {
          this.getCarseries()
        }).catch(v => false)
        return result
      },
      onCancel: () => { },
      render: h => {
        return h(CarSeries, {
          props: {
            series: {
              id: data.seriesId,
              name: data.title
            }
          }
        })
      }
    })
  }
  // 添加车辆
  modifyCarBaseInfo(data) {
    console.log(data)
  }
  // 删除车辆
  deleteCar(data) {
    console.log(data)
  }
  // 新增品牌
  addBrand(data) {
    this.$dialog.show({
      title: "新增品牌",
      footer: true,
      onOk: addBrand => {
        let result = addBrand.confirmAddBrand().then(() => {
          this.getCarseries()
        }).catch(v => false)
        return result
      },
      onCancel: () => { },
      render: h => h(CarBrand)
    })
  }
  // 删除品牌
  deleteCarBrand(data) {
    console.log(data)
    if (data.children.length !== 0) {
      this.$Message.error('当前不允许删除')
      return
    }
    this.basicCarManageService.deleteCarBrand(data.brandId)
      .subscribe(data => {
        this.$Message.success('删除成功')
        this.getCarseries()
      }, err => {
        this.$Message.error(err.msg)
      })
  }



  // 删除车系 seriesId
  deleteCarseries(data) {
    console.log(data)
    if (data.children.length !== 0) {
      this.$Message.error('当前不允许删除')
      return
    }
    this.basicCarManageService.deleteCarSeries(data.seriesId)
      .subscribe(data => {
        this.$Message.success('删除成功')
        this.getCarseries()
      }, err => {
        this.$Message.error(err.msg)
      })
  }





  mounted() {
    this.getCarseries()
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

