<!--数据字典-->
<template> 
    <section class="page data-dict">
        <page-header title="用户字典" hiddenPrint hiddenExport>
            <command-button class="command-add" label="新增数据" @click="dataModal=true"></command-button>
        </page-header>
        <i-row class="data-form">
            <i-row type="flex" align="top" justify="start">
                <i-col :span="4">
                    <div class="data-form-item">
                        <div class="data-form-item-icon"></div>
                        <span>数据类型</span>
                        <span @click="addVehicle" class="data-form-item-add">
                            <svg-icon iconClass="tianjiawenjian"></svg-icon>
                        </span>
                    </div>
                    <div class="data-form-list">
                        <div class="data-form-datatypelist" v-for="item in dataType" :key="item.id" :value="item.dictName" :class="{'dataTypeCss':checkId===item.id}" @click="checkDataType(item)">
                            <span style="">{{item.dictName}}</span>
                        </div>
                    </div>
                </i-col>
                <i-col class="command" :span="20">
                    <data-form hidden-date-search :model="dictAguments" @on-search="seach">
                        <template slot="input">
                            <i-form-item prop="dictItemName" label="数据名称">
                                <i-input v-model="dictAguments.dictItemName"></i-input>
                            </i-form-item>
                        </template>
                    </data-form>
                    <data-box :columns="columns1" :data="dataNames" @onPageChange="seach" :page="pageService" :noDefaultRow="true"></data-box>
                </i-col>
            </i-row>
        </i-row>

        <template>
            <i-modal v-model="addNameModal" :width="500" :title="checkModal?'编辑数据':'新增数据'" class="toViewModalClass">
                <i-form :label-width="60" style="margin-top:20px;">
                    <i-form-item label="名称" prop="dictItemName">
                        <i-input v-model="addModel.dictItemName"></i-input>
                    </i-form-item>
                </i-form>
                <div slot="footer">
                    <i-button @click="canceladd">取消</i-button>
                    <i-button @click="buttonOnlyOne" class="blueButton">确定</i-button>
                </div>
            </i-modal>
        </template>

        <template>
            <i-modal v-model="adddatatypeModal" :width="500" title="新增数据字典类型" class="toViewModalClass">
                <i-form :label-width="60" style="margin-top:20px;" :model="addDataType" :rules="rulesAddDataType" ref="add-data-type">
                    <i-form-item label="名称" prop="name">
                        <i-input v-model="addDataType.dictName"></i-input>
                    </i-form-item>
                </i-form>
                <div slot="footer">
                    <i-button @click="canceladdtype" class="defalutButton">取消</i-button>
                    <i-button @click="confirmmaddtype" class="blueButton">确定</i-button>
                </div>
            </i-modal>
        </template>
        <template>
            <i-modal title="新增数据" v-model="dataModal">
                <i-form ref="add-data" :model="addDataModel" :rules="rulesAddDate" :label-width="80">
                    <i-form-item label="数据名称" prop="dictItemName">
                        <i-input v-model="addDataModel.dictItemName"></i-input>
                    </i-form-item>
                </i-form>
                <div slot="footer">
                    <i-button @click="cancelAddData">取消</i-button>
                    <i-button class="blueButton" @click="submitAddData">确定</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Form } from 'iview'
import { Dependencies } from '~/core/decorator'
import { OrderService } from '~/services/business-service/order.service'
import { Layout } from '~/core/decorator'
import { SysDictService } from '~/services/manage-service/sys-dict.service'
import { PageService } from '~/utils/page.service'
import { setTimeout } from 'core-js';

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SysDict extends Page {
  @Dependencies(SysDictService) private sysDictService: SysDictService
  @Dependencies(PageService) private pageService: PageService
  private data1: Array<Object> = []
  private dataType: Array<any> = []
  private dataNames: Array<any> = []
  private searchOptions: Boolean = false
  private adddatatypeModal: Boolean = false
  private checkId: Number = 1
  private item: any
  private columns1: any
  private dictAguments: any = {}
  private addNameModal: Boolean = false
  private checkModal: Boolean = false
  private id: any = ''
  private rulesAddDate: any = {}
  private rulesAddDataType: any = {}
  private dataModal: Boolean = false
  private warnStatus: any = null
  private clickCount: number = 0
  private dictCodes: any = 0
  private addModel: any = {
    dictId: 0,
    dictItemCode: '',
    dictItemName: '',
    dictItemStatus: 0,
    dictItemTreeCode: '',
    id: 0
  }
  private addDataType: any = {
    dictName: '',
    dictType: '10000'
  }
  private checked: any = {}
  private addDataModel: any = {}

  created() {
    this.rulesAddDate = {
      name: [
        {
          required: true,
          message: '请输入数据名称',
          trigger: 'change'
        },
        {
          max: 20,
          message: '长度不能超过20个字符',
          trigger: 'blur'
        }
      ]
    }
    this.rulesAddDataType = {
      dictName: [
        {
          required: true,
          message: '请输入数据字典类型名称',
          trigger: 'change'
        },
        {
          max: 20,
          message: '长度不能超过20个字符',
          trigger: 'blur'
        }
      ]
    }
    this.dataNames = []
    this.item = {
      dictCode: '0000',
      id: '10000'
    }
    this.dictAguments = {
      // dictCode: '',
      dictItemName: '',
      id: ''
    }
    this.getAllDictType()
    this.checkDataType(this.item)
    this.columns1 = [
      {
        title: '序号',
        type: 'index',
        fixed: 'left',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '操作',
        fixed: 'left',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, column, index }) => {
          // console.log(row)
          return h('div', [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.checkModal = true
                    this.addNameModal = true
                    this.addModel.dictItemName = row.dictItemName
                    this.id = row.id
                    this.addModel.dictId = row.dictId
                    this.addModel.dictItemCode = row.dictItemCode
                    this.addModel.dictItemStatus = row.dictItemStatus
                    this.addModel.dictItemTreeCode = row.dictItemTreeCode
                    this.addModel.id = row.id
                  }
                }
              },
              '编辑'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.deleteDataDict(row)
                  }
                }
              },
              '删除'
            )
          ])
        }
      },
      {
        align: 'center',
        title: ' 名称',
        key: 'dictItemName',
        minWidth: this.$common.getColumnWidth(5)
      }
    ]
  }

  cancelAddData() {
    this.dataModal = false
    let _addData: any = this.$refs['add-data']
    _addData.resetFields()
  }

  getOrderInfoByTime() {}

  openSearch() {
    this.searchOptions = !this.searchOptions
  }

  exportMonthReport() {}

  /**
   * 新增数据
   */
  addData() {
    this.checkModal = false
    this.addNameModal = true
  }

  /**
   * 点击一次判断
   */
  buttonOnlyOne() {
    if (!this.warnStatus) {
      this.$Spin.show()
      this.confirmmadd()
    }
  }

  /**
   * 确定
   */
  confirmmadd() {
    if (this.addModel.dictItemName.indexOf(' ') >= 0 || this.addModel.dictItemName === '') {
      this.warnStatus = true
      setTimeout(() => {
        this.warnStatus = false
      }, 2000)
      return this.$Message.warning('请输入名称！')
    }

    if (this.checkModal) {
      this.addModel.id = this.id
    } else {
      if (this.dataNames.length) {
        this.addModel.sort = this.dataNames[this.dataNames.length - 1].sort + 1
      } else {
        this.addModel.sort = 0
      }
    }
    // this.addModel.dictCode = this.dictAguments.dictCode
    this.sysDictService.updateDataDict(this.addModel).subscribe(
      val => {
        this.$Spin.hide()
        this.$Message.success('操作成功！')
        this.seach()
        this.addNameModal = false
        this.addModel.dictId = 0
        this.addModel.dictItemCode = ''
        this.addModel.dictItemName = ''
        this.addModel.dictItemStatus = 0
        this.addModel.dictItemTreeCode = ''
        this.addModel.id = ''
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }

  /**
   * 取消
   */
  canceladd() {
    this.addNameModal = false
    this.addModel.dictItemName = ''
  }

  /**
   * 编辑
   */
  editDict(val) {}

  /**
   * 添加数据字典类型
   */
  addVehicle() {
    this.adddatatypeModal = true
  }

  /**
   * 取消
   */
  canceladdtype() {
    this.adddatatypeModal = false
    this.addDataType.dictName = ''
  }

  /**
   * 确定
   */
  confirmmaddtype() {
    let formValid = <Form>this.$refs['add-data-type']
    formValid.validate(valid => {
      if (!valid) return false
      this.sysDictService
        .createDataDictType(this.addDataType)
        .subscribe(
          val => {
            this.$Message.success('操作成功！')
            this.getAllDictType()
            this.adddatatypeModal = false
            this.addDataType.dictName = ''
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    })
  }

  /**
   * 查询所有数据字典类型
   */
  getAllDictType() {
    this.sysDictService.getAllSysDictType().subscribe(val => {
      this.dataType = val
    })
  }

  /**
   * 根据数字字典查询对应的数据字典
   */
  checkDataType(item) {
    this.checked = item
    this.checkId = item.id
    this.dictCodes = item.dictCode
    // this.dictAguments.dictCode = item.dictCode
    this.dictAguments.id = item.id
    this.sysDictService
      .getDataDictByTypeCodeWithPage(this.dictAguments, this.pageService)
      .subscribe(val => {
        this.dataNames = val
      })
  }

  /**
   *  删除
   */
  deleteDataDict(item) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除吗？',
      onOk: () => {
        this.$Spin.show()
        this.sysDictService
          .deleteDataDict({
            id: item.id
          })
          .subscribe(
            val => {
              this.$Spin.hide()
              this.$Message.success('操作成功！')
              this.seach()
            },
            ({ msg }) => {
              this.$Message.error(msg)
            }
          )
      }
    })
  }

  /**
   * 搜索
   */
  seach() {
    this.checkDataType(this.checked)
  }

  /**
   * 新增数据按钮
   */
  submitAddData() {
    this.$Spin.show()
    let form = <Form>this.$refs['add-data']
    this.addDataModel.dictCode = this.dictCodes
    this.addDataModel.dictId = this.checkId
    form.validate(valid => {
      if (!valid) return false
      if (this.addDataModel.dictItemName.indexOf(' ') >= 0) {
        this.$Message.warning('请输入名称！')
        return
      }
      this.sysDictService.createSysDataDict(this.addDataModel).subscribe(
        val => {
          this.$Spin.hide()
          this.$Message.success('新增数据成功！')
          this.cancelAddData()
          this.dataModal = false
          this.checkDataType(this.checked)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
    })
  }

  /**
   * 重置搜索
   */
  resetSeach() {
    alert(111)
    this.dictAguments = {
      // dictCode: '',
      dictItemName: '',
      id: ''
    }
  }

  mounted() {
    this.checkId = 10000
  }
}
</script>
<style lang="less" scoped>
.page.data-dict {
  .data-form {
    margin-top: 10px;
    .data-form-item {
      width: 100%;
      height: 30px;
      border: 1px solid #dddd;
      line-height: 30px;
      font-size: 16px;
      .data-form-item-icon {
        width: 4px;
        height: 15px;
        background: rgb(38, 94, 162);
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
      .data-form-item-add {
        float: right;
        margin-right: 12px;
        color: #265ea2;
      }
    }
    .command {
      .command-item {
        width: 20%;
      }
      .command-add {
        margin-left: 10px;
        position: absolute;
        right: 13px;
      }
    }
    .data-form-list {
      width: 100%;
      height: 600px;
      border: 1px solid #dddd;
      border-top: 0;
      overflow: auto;
      .data-form-datatypelist {
        cursor: pointer;
        width: 100%;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        position: relative;
        margin: auto;
      }
    }
  }
}

.dataTypeCss {
  background: #e4f4fa;
}

</style>
<style lang="less">
.page.data-dict {
  .toViewModalClass {
    .ivu-modal-footer {
      display: none !important;
    }
  }
  .ivu-select.ivu-select-single.ivu-select-small,
   .ivu-select-single .ivu-select-selection {
      width: 80px !important;
      display: inline-block;
    }
}
</style>
