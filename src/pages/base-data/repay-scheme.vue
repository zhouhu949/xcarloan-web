<template>
  <section class="page repay-scheme">
    <page-header title="还款方案管理" hidden-print hidden-export></page-header>
    <i-row class="data-form">
      <!--还款方案列表-->
      <i-col :span="5">
        <div class="data-form-item">
          <div class="data-form-item-icon"></div>
          <span>还款方案</span>
            <span @click="addRepayScheme" class="add-scheme">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </span>
        </div>
        <div class="data-form-list">
          <div class="data-form-datatypelist" v-for="item in dataType" :key="item.id" :value="item.schemeName" :class="{'dataTypeCss':checkId===item.id}" @click="checkRepayScheme(item)">
            <span style="">{{item.schemeName}}</span>
            <small v-show="checkId === item.id" class="icon-box">
              <a v-show="!releaseStatus" @click.stop="editRepayScheme(item.id)" href="#" class="icon-btn el-icon-edit">
                <div style="display:inline-block">
                  <Icon type="edit"></Icon>
                </div>
              </a>
              <a v-show="!releaseStatus" @click.stop="deleteRepayScheme(item.id)" href="#" class="icon-btn el-icon-minus">
                <div style="display:inline-block">
                  <Icon type="minus"></Icon>
                </div>
              </a>
            </small>
          </div>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="19">
        <section class="repay-scheme-info">
          <!--还款方案信息-->
          <page-header title="还款方案信息" hiddenPrint hiddenExport>
            <i-button type="primary" @click="releaseScheme(checkId, schemeStatus)">{{releaseStatus ? '取消发布' : '发布'}}</i-button>
            <i-button type="primary" :disabled="releaseStatus" @click="editRepayScheme(checkId)">编辑</i-button>
          </page-header>
          <i-row>
            <data-grid :total-span="24">
              <data-grid-item label="方案类型" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.schemeType)}}</data-grid-item>
              <data-grid-item label="方案名称" :label-width="150" :span="12">{{repaySchemeModel.schemeName}}</data-grid-item>
              <data-grid-item label="还款方式" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.repayType)}}</data-grid-item>
              <data-grid-item label="抵押方式" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.mortgageType)}}</data-grid-item>
              <data-grid-item label="发布状态" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.schemeStatus)}}</data-grid-item>
              <data-grid-item label="征信保护天数" :label-width="150" :span="12">{{repaySchemeModel.creditDays}}</data-grid-item>
              <data-grid-item label="逾期保护天数" :label-width="150" :span="12">{{repaySchemeModel.overdueDays}}</data-grid-item>
              <data-grid-item label="期数" :label-width="150" :span="12">{{repaySchemeModel.periods}}</data-grid-item>
              <data-grid-item label="利率" :label-width="150" :span="12">{{repaySchemeModel.interestRate * 100 + '%'}}</data-grid-item>
              <data-grid-item label="周期类型" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.cycleType)}}</data-grid-item>
              <data-grid-item label="融资最小金额" :label-width="150" :span="12">{{repaySchemeModel.moneyMin}}</data-grid-item>
              <data-grid-item label="融资最大金额" :label-width="150" :span="12">{{repaySchemeModel.moneyMax}}</data-grid-item>
              <data-grid-item label="账期类型" :label-width="150" :span="12">{{this.$dict.getDictName(repaySchemeModel.accountPeriodType)}}</data-grid-item>
              <data-grid-item label="还款日" :label-width="150" :span="12">{{repaySchemeModel.accountDay}}</data-grid-item>
              <data-grid-item label="备注" :label-width="150" :span="24" contentAlign="left">{{repaySchemeModel.remark}}</data-grid-item>
            </data-grid>
          </i-row>
          <!--还款方案比例详情-->
          <page-header title="还款方案比例详情" hiddenPrint hiddenExport style="margin-top: 10px">
            <i-button type="primary" :disabled="releaseStatus" @click="addRepaySchemeDetail">新增</i-button>
          </page-header>
          <i-row>
            <data-box :id="34" :columns="columns1" :data="dataBox"></data-box>
          </i-row>
        </section>
      </i-col>
    </i-row>
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { Modal } from "iview";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service'
import addOrModifyScheme from '~/components/base-data/add-modify-scheme.vue'
import addOrModifySchemeDetail from '~/components/base-data/add-modify-scheme-detail.vue'

@Layout('workspace')
@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class RepayScheme extends Page {
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService
  
  private dataType: Array<any> = [];
  private checkId: Number = 1;
  private item: any;
  private columns1: any;
  private dataBox: Array<any> = [];
  private dialogTitle: String;
  private isRelease: Boolean = false;
  private schemeStatus: Number = 10056;
  private repaySchemeModel: any = {
    schemeType: '', // 方案类型
    schemeName: '', // 方案名称
    repayType: 0, // 还款方式
    mortgageType: 0, // 抵押方式
    creditDays: 0, // 征信保护天数
    overdueDays: 0, // 逾期保护天数
    periods: 0, // 期数
    interestRate: 0, // 利率
    cycleType: 0, // 周期类型
    moneyMin: 0, // 融资最小金额
    moneyMax: 0, // 融资最大金额
    accountPeriodType: 0, // 账期类型
    accountDay: 0, // 还款日
    offsetId: 0, // 冲抵策略
    remark: '' // 备注
  }

  created () {
    this.getAllRepayScheme()
    this.columns1 = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "是否首付款",
        align: "center",
        key: "isFirst",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isFirst));
        }
      },
      {
        title: "收取总额比例",
        align: "center",
        key: "repayProportion",
        render: (h, { row, column, index }) => {
          return h("span", {}, `${row.repayProportion * 100}%`);
        }
      },
      {
        title: "固定费用",
        align: "center",
        key: "fixedCost"
      },
      {
        title: "还款方式",
        align: "center",
        key: "repayType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.repayType));
        }
      },
      {
        title: "是否尾款",
        align: "center",
        key: "isLast",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isLast));
        }
      },
      {
        title: "是否退款",
        align: "center",
        key: "isRefund",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.isRefund));
        }
      },
      {
        title: "费用项",
        align: "center",
        key: "expenseId",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.expenseName);
        }
      },
      {
        title: "操作",
        align: "center",
        render: (h, { row, column, index }) => {
          return h('div',[
            h(
              'i-button',
              {
                props: {
                  type: 'text',
                  disabled: this.releaseStatus
                },
                style: {
                  color: this.releaseStatus ? '#C1C1C1' : '#265EA2'
                },
                on: {
                  click: () => {
                    this.editRepaySchemeDetail(row)
                  }
                }
              },
              '编辑'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text',
                  disabled: this.releaseStatus
                },
                style: {
                  color: this.releaseStatus ? '#C1C1C1' : '#265EA2'
                },
                on: {
                  click: () => {
                    this.deleteRepaySchemeDetail(row.id)
                  }
                }
              },
              '删除'
            )
          ])
        }
      }
    ];
  }

  get releaseStatus() {
    return this.isRelease = this.schemeStatus === 10056 ? false : true
  }
  /**
   * 获取所有还款方案菜单
   */
  getAllRepayScheme() {
    this.repaySchemeService.findAllBasicSchemeByAuth().subscribe(val => {
      this.dataType = val
      this.checkId = this.dataType[0].id
      this.getSchemeInfoById(this.checkId)
      this.getSchemeDetail(this.checkId)
    })
  }
  /**
   * 刷新还款方案菜单
   */
  refreshRepayScheme() {
    this.repaySchemeService.findAllBasicSchemeByAuth().subscribe(val => {
      this.dataType = val
      this.getSchemeInfoById(this.checkId)
      this.getSchemeDetail(this.checkId)
    })
  }
  /**
   * 新增还款方案
   */
  addRepayScheme() {
    this.$dialog.show({
      title: "新增还款方案",
      footer: true,
      onOk: addOrModify => {
        return addOrModify.addOrModifyScheme().then(v => {
          if(v) {
            this.refreshRepayScheme()
          }
          return v
        })
      },
      render: h => h(addOrModifyScheme, {
        props: {
          data: {},
          id: ''
        }
      })
    })
  }
  /**
   * 编辑还款方案
   */
  editRepayScheme(rowId) {
    this.$dialog.show({
      title: "编辑还款方案",
      footer: true,
      onOk: addOrModify => {
        return addOrModify.addOrModifyScheme().then(v => {
          if(v) {
            this.refreshRepayScheme()
          }
          return v
        })
      },
      render: h => h(addOrModifyScheme, {
        props: {
          data: this.repaySchemeModel,
          id: this.checkId
        }
      })
    })
  }
   /**
   * 删除还款方案
   */
  deleteRepayScheme(id) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此还款方案吗？',
      onOk: () => {
        this.repaySchemeService.deleteRepayScheme(id).subscribe(() => {
          this.$Message.success('删除成功！')
          this.getAllRepayScheme()
        },
        err => {
          this.$Message.error(err.msg)
        })
      }
    })
  }
  /**
   * 查看还款方案
   */
  checkRepayScheme(item) {
    this.checkId = item.id;
    this.getSchemeInfoById(this.checkId)
    this.getSchemeDetail(this.checkId)
  }
  /**
   * 根据还款方案id获取还款方案信息
   */
  getSchemeInfoById(id) {
    this.repaySchemeService.findSchemeById(id).subscribe(val => {
      this.repaySchemeModel = val
      this.schemeStatus = val.schemeStatus
    })
  }
  /**
   * 根据还款方案获取还款方案比例详情
   */
  getSchemeDetail(id) {
    this.repaySchemeService.findSchemeExpenseBySchemeId(id).subscribe(data => {
      this.dataBox = data
    })
  }
  /**
   * 删除还款方案比例详情
   */
  deleteRepaySchemeDetail(id) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此还款方案比例详情吗？',
      onOk: () => {
        this.repaySchemeService.deleteRepaySchemeExpense(id).subscribe(val => {
          this.$Message.success('删除成功！')
          this.refreshRepayScheme()
        },
        err => {
          this.$Message.error(err.msg)
        })
      }
    })
  }
  /**
   * 发布/取消发布还款方案
   */
  releaseScheme(id, schemeStatus) {
    this.$Modal.confirm({
      title: '提示',
      content: `确定${this.releaseStatus ? '取消发布' : '发布'}此还款方案吗？`,
      onOk: () => {
        schemeStatus = schemeStatus === 10056 ? 10057 : 10056
        this.repaySchemeService.releaseRepayScheme({ id, schemeStatus }).subscribe(val => {
          this.$Message.success(`${this.releaseStatus ? '取消发布' : '发布'}成功！`)
        },
        err => {
          this.$Message.error(err.msg)
        })
      }
    })
  }
  /**
   * 新增还款方案比例详情
   */
  addRepaySchemeDetail() {
    this.$dialog.show({
      title: "新增还款方案比例详情",
      footer: true,
      onOk: addOrModify => {
        return addOrModify.addOrModifySchemeDetail().then(v => {
          if(v) {
            this.refreshRepayScheme()
          }
          return v
        })
      },
      render: h => h(addOrModifySchemeDetail, {
        props: {
          data: {},
          schemeId: this.checkId
        }
      })
    })
  }
  /**
   * 编辑还款方案比例详情
   */
  editRepaySchemeDetail(data) {
    this.$dialog.show({
      title: "编辑还款方案比例详情",
      footer: true,
      onOk: addOrModify => {
        return addOrModify.addOrModifySchemeDetail().then(v => {
          if(v) {
            this.refreshRepayScheme()
          }
          return v
        })
      },
      render: h => h(addOrModifySchemeDetail, {
        props: {
          data: data,
          schemeId: this.checkId
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.page.repay-scheme {
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
      .add-scheme {
        font-size: 22px;
        float: right;
        margin-right: 12px;
        color: #265ea2;
        cursor: pointer;
      }
    }
    .repay-scheme-info{
      padding: 0 10px;
      .data-box > *{
        padding: 0;
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
        .icon-box{
          .icon-btn{
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.dataTypeCss {
  background: #e4f4fa;
}
</style>
<style lang="less">
  .page.repay-scheme {
    .data-form {
      .repay-scheme-info{
        .data-box > *{
          padding: 0;
        }
        .i-table.ivu-table-wrapper{
          height: 400px !important;
          .ivu-table-body{
            height: 400px !important;
            overflow-y: auto;
          }
        }
      }
    }
  }
</style>