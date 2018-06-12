<!--系统备份-->
<template>
  <section class="page system-backups">
    <page-header title="系统备份" hiddenPrint hiddenExport>
        <command-button label="新增备份" @click="addNewBackups"></command-button>
    </page-header>
    <data-form hidden-date-search :model="systemBackUpModel" @on-search="getSystemBackupList" :page="pageService">
      <template slot="input">
        <i-form-item prop="mysqlName" label="mysql文件名：">
          <i-input v-model="systemBackUpModel.mysqlName"></i-input>
        </i-form-item>
        <i-form-item prop="mongdbName" label="mongodb文件名：">
          <i-input v-model="systemBackUpModel.mongdbName"></i-input>
        </i-form-item>
        <i-form-item prop="type" label="备份类型：">
          <i-select v-model="systemBackUpModel.type" clearable>
            <i-option label="自动" :value="0" :key="0"></i-option>
            <i-option label="手动" :value="1" :key="1"></i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="dateRange" label="备份时间：">
          <i-date-picker v-model="systemBackUpModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
      </template>
    </data-form>

    <data-box :id="69" :columns="columns1" :data="systemBackUpList" @onPageChange="getSystemBackupList" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page'
  import Component from 'vue-class-component'
  import DataBox from '~/components/common/data-box.vue'
  import DataForm from '~/components/common/data-form.vue'
  import {PageService} from '~/utils/page.service'
  import {Dependencies} from '~/core/decorator'
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {Layout} from '~/core/decorator'
  import {ManageService} from '~/services/manage-service/manage.service'
  import {FilterService} from '~/utils/filter.service'

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      DataForm
      // ColumnsConfig
    }
  })
  export default class SystemBackups extends Page {
    @Dependencies() private pageService: PageService
    @Dependencies(ManageService) private manageService: ManageService
    private columns1: any
    private columns2: any
    private treeColumns: any
    private systemBackUpList: Array<Object> = []
    private treeData: Array<Object> = []
    private treeDatabox: Array<Object> = []
    private data2: Array<Object> = []
    private searchOptions: Boolean = false
    private customName: String = ''
    private openColumnsConfig: Boolean = false
    private openOneKeyToConnect: Boolean = false
    private editSysParamsModal: Boolean = false
    private checkRadio: String = ''
    private systemBackUpModel: any = {
      mysqlName: '',
      mongdbName: '',
      type: '',
      startTime: '',
      endTime: '',
      dateRange: []
    }
    private backupTimeRange: Array<any> = []

    mounted() {
      this.getSystemBackupList()
    }

    created() {
      this.columns1 = [
        {
          title: '操作',
          minWidth: this.$common.getColumnWidth(5),
          align: 'center',
           fixed: 'left',
          render: (h, {row, column, index}) => {
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
                      this.recoverData(row)
                    }
                  }
                },
                '恢复数据'
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
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.manageService
                            .deleteSystemBackup({
                              id: row.id
                            })
                            .subscribe(
                              val => {
                                this.$Message.success('删除成功！')
                                this.getSystemBackupList()
                              },
                              ({msg}) => {
                                this.$Message.error(msg)
                              }
                            )
                        }
                      })
                    }
                  }
                },
                '删除备份'
              )
            ])
          }
        },
        {
          title: '操作人',
          key: 'operatorName',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          title: '操作时间',
          key: 'operateTime',
          editable: true,
          minWidth: this.$common.getColumnWidth(6),
          align: 'center',
          render: (h, {row, columns, index}) => {
            return h(
              'span',
              FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        },
        {
          title: 'mysql文件名',
          key: 'mysqlName',
          editable: true,
          minWidth: this.$common.getColumnWidth(8),
          align: 'center'
        },
        {
          title: 'mongodb文件名',
          key: 'mongdbName',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(8),
        },
        {
          title: '备份类型',
          key: 'type',
          editable: true,
          align: 'center',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {row, columns, index}) => {
            if (row.type === 0) {
              return h('span', {}, '自动')
            } else if (row.type === 1) {
              return h('span', {}, '手动')
            }
          }
        }
      ]
    }

    getSystemBackupList() {
      this.manageService
        .querySystemBackupPage(this.systemBackUpModel, this.pageService)
        .subscribe(
          data => this.systemBackUpList = data,
          err => this.$Message.error(err)
        )
    }

    addNewBackups() {
      this.manageService.createSystemBackup().subscribe(
        data => {
          this.$Message.success('新增备份成功！')
          this.getSystemBackupList()
        },
        ({msg}) => {
          this.$Message.error(msg)
        }
      )
    }

    /**
     * 列配置
     */
    columnsConfig() {
      this.openColumnsConfig = true
      let _columnsConfig: any = this.$refs['columns-config']
      _columnsConfig.getColumnsData()
    }

    clearDateTime() {
      this.systemBackUpModel.startTime = ''
      this.systemBackUpModel.endTime = ''
    }

    recoverData(row) {
      this.$Message.success('恢复备份成功！')
    }

    /**
     * 重置搜索
     */
    refreshRoleList() {
      this.systemBackUpModel = {
        mysqlName: '',
        mongdbName: '',
        type: '',
        startTime: '',
        endTime: ''
      }
    }
  }
</script>
<style lang="less" scoped>
  .page.system-backups {
    .data-form {
      .span-heand {
        margin-left: 10px;
      }
      .form-input {
        display: inline-block;
        width: 10%;
        margin-right: 20px;
        margin-top: 10px;
      }
      .title {
        margin-left: 20px;
      }
      .form-item {
        display: inline-block;
        width: 10%;
      }
      .form-button {
        margin-left: 10px;
        background: #265ea2;
        color: #fff;
      }
    }
  }
</style>
