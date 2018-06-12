<!--系统日志下载-->
<template>
    <section class="page system-log-download">
        <page-header title="系统日志下载" @on-export="exportLogs" ></page-header>
        <data-form hidden-date-search :model="systemLogModel" @on-search="search" :page="pageService">
            <template slot="input">
                <i-form-item prop="realName" label="操作人：">
                    <i-input v-model="systemLogModel.realName"></i-input>
                </i-form-item>
                <i-form-item prop="clientIp" label="客户端IP：">
                    <i-input v-model="systemLogModel.clientIp"></i-input>
                </i-form-item>
                <i-form-item prop="dateRange" label="操作时间：">
                    <i-date-picker v-model="systemLogModel.dateRange" type="daterange" placeholder="请选择日期范围"></i-date-picker>
                </i-form-item>
            </template>

        </data-form>

        <data-box :id="57" :columns="columns1" :data="systemLogsList" @onPageChange="search" :page="pageService" ref="databox"></data-box>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import DataBox from '~/components/common/data-box.vue'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { ManageService } from '~/services/manage-service/manage.service'
import { SystemLogsService } from '~/services/manage-service/system-logs.service'
import { PageService } from '~/utils/page.service'
import { CommonService } from '~/utils/common.service'
import { FilterService } from '~/utils/filter.service'
@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class SystemLogDownload extends Page {
  @Dependencies(ManageService) private manageService: ManageService
  @Dependencies(SystemLogsService) private systemLogsService: SystemLogsService
  @Dependencies(PageService) private pageService: PageService

  private columns1: any
  private systemLogsList: Array<Object> = []
  private openColumnsConfig: Boolean = false
  private columns2: any
  private test: String = ''
  private systemLogModel: any = {
    clientIp: '',
    exeType: '',
    exeTime: '',
    realName:'',
    dateRange:[]
  }

  created() {
    this.systemLogModel = {
      clientIp: '',
      exeType: '',
      exeTime: '',
      realName:'',
      dateRange:[]
    }
    this.search()

    this.columns1 = [
      {
        type: 'selection',
        align: 'center',
        width:40,
        fixed: 'left'
      },
      {
        title: '操作时间',
        key: 'operateTime',
        editable: true,
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        title: '操作人',
        editable: true,
        key: 'realName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: '客户端IP',
        editable: true,
        key: 'clientIp',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '执行方法',
        editable: true,
        key: 'exeMethod',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '备注',
        editable: true,
        key: 'logRemark',
        align: 'center',
        minWidth: this.$common.getColumnWidth(10),
      },
      {
        title: '请求执行时长（秒）',
        editable: true,
        key: 'exeTime',
        align: 'center',
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        title: '执行类型',
        editable: true,
        key: 'exeType',
        align: 'center',
        minWidth: this.$common.getColumnWidth(4),
      }
    ]
  }
  search() {
    this.manageService
      .querySystemLogsPage(this.systemLogModel, this.pageService)
      .subscribe(
        data =>this.systemLogsList = data,
        err => this.$Message.error(err)
      )
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }
  /**
   * 重置搜索
   */
  refreshRoleList() {
    this.systemLogModel = {
      clientIp: '',
      exeType: '',
      exeTime: '',
      realName:''
    }
  }
  /**
   * 导出系统日志列表
   */
  exportLogs() {
    let databox = this.$refs['databox'] as DataBox
    let multipleSelection = databox.getCurrentSelection()
    if (multipleSelection && multipleSelection.length) {
      let sysLogsIds = multipleSelection.map(v => v.id)
      this.systemLogsService
        .exportSystemLogs({
          sysLogsIds: sysLogsIds
        })
        .subscribe(
          data => {
            CommonService.downloadFile(data.url, '系统日志下载')
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    } else {
      this.$Message.info('请先选择日志再导出！')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
