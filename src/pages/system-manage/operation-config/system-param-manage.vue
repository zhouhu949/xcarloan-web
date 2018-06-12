<!--系统参数管理-->
<template>
    <section class="page system-param-manage">
        <page-header title="系统参数管理" hidden-print hidden-export></page-header>
        <data-form hidden-date-search :model="systemParameterModel" @on-search="getSystemParam" :page="pageService">
            <template slot="input">
                <i-form-item prop="paramName" label="参数名称：">
                    <i-input v-model="systemParameterModel.paramName"></i-input>
                </i-form-item>
                <i-form-item prop="paramStatus" label="是否启用：">
                    <i-select v-model="systemParameterModel.paramStatus" clearable>
                        <i-option label="启用" :value="0" :key="0"></i-option>
                        <i-option label="停用" :value="1" :key="1"></i-option>
                    </i-select>
                </i-form-item>
            </template>
        </data-form>

        <data-box :id="77" :columns="columns1" :data="systemParamsData" @onPageChange="getSystemParam" :page="pageService"></data-box>

        <template>
            <i-modal v-model="editSysParamsModal" title="修改系统参数">
                <modify-system-params :modifySysParamsModel="modifySysParamsModel" ref="modify-sys-param" @close="closeBtn"></modify-system-params>
                <div slot="footer">
                    <i-button @click="editSysParamsModal=false">取消</i-button>
                    <i-button @click="confirmModifySysParams" class="form-button">确定</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import DataBox from '~/components/common/data-box.vue'
import { PageService } from '~/utils/page.service'
import { Dependencies } from '~/core/decorator'
import SvgIcon from '~/components/common/svg-icon.vue'
import { Layout } from '~/core/decorator'
import ModifySystemParams from '~/components/system-manage/modify-system-params.vue'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    ModifySystemParams
  }
})
export default class OrderTransfer extends Page {
  @Dependencies() private pageService: PageService
  private columns1: any
  private columns2: any
  private systemParamsData: Array<Object> = []
  private customName: String = ''
  private openColumnsConfig: Boolean = false
  private openOneKeyToConnect: Boolean = false
  private editSysParamsModal: Boolean = false
  private systemParameterModel: any = {
    paramName: '',
    paramStatus: ''
  }
  private checkRadio: String = ''
  private modifySysParamsModel: any
  mounted() {
    
  }
  created() {
    this.modifySysParamsModel = {
      paramCode: '',
      paramName: '',
      paramValue: '',
      paramStatus: ''
    }
    this.columns1 = [
      {
        title: '操作',
        align: 'center',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(5),
        render: (h, { row, columns, index }) => {
          return h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.modifySysParams(row)
                }
              },
              style: {
                color: '#265EA2'
              }
            },
            '修改'
          )
        }
      },
      {
        title: '参数代码',
        editable: true,
        key: 'paramCode',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '参数名称',
        editable: true,
        key: 'paramName',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '参数值',
        editable: true,
        key: 'paramValue',
        align: 'center',
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: '是否启用',
        editable: true,
        key: 'paramStatus',
        align: 'center',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, columns, index }) => {
          return h('span', {}, row.paramStatus === 0 ? '启用' : '停用')
        }
      },
      {
        title: '说明',
        editable: true,
        key: 'paramRemark',
        align: 'center',
        minWidth: this.$common.getColumnWidth(10),
      }
    ]
  }
  getOrderInfoByTime() {}
  oneKeyToConnect() {
    this.openOneKeyToConnect = true
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true
  }
  /**
   * 多选
   */
  multipleSelect(selection) {}
  /**
   * 修改按钮
   */
  modifySysParams(row) {
    this.editSysParamsModal = true
    this.modifySysParamsModel = row
    let _sysParams: any = this.$refs['modify-sys-param']
    _sysParams.makeData(row)
  }

  confirmModifySysParams() {
    let _modify: any = this.$refs['modify-sys-param']
    _modify.confirmModify()
  }
  closeBtn() {
    this.editSysParamsModal = false
  }
  /**
   * 重置搜索
   */
  refreshRoleList() {
    // this.systemParameterModel = {
    //   paramName: "",
    //   paramStatus: ""
    // };
    this.systemParameterModel.paramName = ''
    this.systemParameterModel.paramStatus = ''
  }
}
</script>
<style lang="less" scoped>
.page.system-param-manage {
   .form-button {
      background: #265ea2;
      color: #fff;
    }
}
</style>
