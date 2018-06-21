<!--数据字典-->
<template>
  <section class="page user-data-dict">
    <page-header title="用户字典" hiddenPrint hiddenExport>
      <command-button class="command-add" label="新增数据" @click="createDictItem"></command-button>
    </page-header>
    <i-row class="data-form">
      <i-row type="flex" align="top" justify="start">
        <i-col :span="4">
          <div class="data-form-item">
            <div class="data-form-item-icon"></div>
            <span>数据类型</span>
            <span @click="createDictType" class="data-form-item-add">
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
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Form } from 'iview'
import { Dependencies } from '~/core/decorator'
import { OrderService } from '~/services/business-service/order.service'
import { Layout } from '~/core/decorator'
import { SysDictService } from '~/services/manage-service/sys-dict.service'
import { PageService } from '~/utils/page.service'
import { setTimeout } from 'core-js';
import CreateDictType from '~/components/system-manage/create-dict-type.vue'
import CreateModifyDict from '~/components/system-manage/create-modify-dict.vue'

@Layout('workspace')
@Component({
  components: {
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
    dictType: '10001'
  }
  private checked: any = {}
  private addDataModel: any = {}

  /**
   * 新增用户字典类型
   */
  createDictType() {
    this.$dialog.show({
      title: "新增数据字典类型",
      footer: true,
      width: 700,
      onOk: create => {
        return create.createDictType().then(v => {
          if (v) this.getAllDictType()
          return v
        })
      },
      render: h => h(CreateDictType, {
        props: {
          dictData: this.addDataType
        }
      })
    })
  }
  /**
   * 新增用户字典项
   */
  createDictItem() {
    this.$dialog.show({
      title: "新增数据",
      footer: true,
      width: 700,
      onOk: editDictItem => {
        return editDictItem.createDictItem().then(v => {
          if (v) this.checkDataType(this.item)
          return v
        })
      },
      render: h => h(CreateModifyDict, {
        props: {
          dictData: this.addDataModel,
          checked: this.checked
        }
      })
    })
  }
  /**
   * 编辑用户字典项
   */
  editDictItem() {
    this.$dialog.show({
      title: "编辑数据",
      footer: true,
      width: 700,
      onOk: edit => {
        return edit.editDataItem().then(v => {
          if (v) this.checkDataType(this.item)
          return v
        })
      },
      render: h => h(CreateModifyDict, {
        props: {
          dictData: this.addModel
        }
      })
    })
  }

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
      dictCode: '',
      id: ''
    }
    this.dictAguments = {
      dictItemName: '',
      id: ''
    }
    this.getAllDictType()
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
                    this.addModel.dictItemName = row.dictItemName
                    this.id = row.id
                    this.addModel.dictId = row.dictId
                    this.addModel.dictItemCode = row.dictItemCode
                    this.addModel.dictItemStatus = row.dictItemStatus
                    this.addModel.dictItemTreeCode = row.dictItemTreeCode
                    this.addModel.id = row.id
                    this.editDictItem()
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

  /**
   * 查询所有数据字典类型
   */
  getAllDictType() {
    this.sysDictService.getAllUserDictType().subscribe(val => {
      this.dataType = val
      this.item.id = this.dataType[0].id
      this.item.dictCode = this.dataType[0].dictCode
      this.checkDataType(this.item)
    })
  }

  /**
   * 根据数字字典查询对应的数据字典
   */
  checkDataType(item) {
    this.checked = item
    this.checkId = item.id
    this.dictCodes = item.dictCode
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
        this.sysDictService
          .deleteDataDict({
            id: item.id
          })
          .subscribe(
            val => {
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

  mounted() {
    this.checkId = 10001
  }
}
</script>
<style lang="less" scoped>
.page.user-data-dict {
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
.page.user-data-dict {
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
  .component.dialog .dialog-modal .ivu-modal .ivu-modal-content{
    min-width: 520px;
  }
}
</style>
