<!--角色维护--> 
<template>
  <section class="page role-maintenance">
    <!-- <page-header title="角色维护" hidden-print @on-export="exportRole"> -->
    <!-- 暂时取消导出功能 -->
    <page-header title="角色维护" hidden-print hidden-export>
      <command-button label="新增角色" @click="addNewRole"></command-button>
    </page-header>
    <data-form hidden-date-search :model="roleModel" @on-search="getRoleListByCondition">
      <template slot="input">
        <i-form-item prop="roleName" label="角色名称：">
          <i-input placeholder="请输入角色姓名" v-model="roleModel.roleName"></i-input>
        </i-form-item>
        <i-form-item prop="roleStatus" label="启用状态：">
          <i-select v-model="roleModel.roleStatus" clearable>
            <i-option label="启用" :value="0" :key="0"></i-option>
            <i-option label="停用" :value="1" :key="1"></i-option>
          </i-select>
        </i-form-item>
      </template>

    </data-form>
    <data-box :id="20" :columns="columns1" :data="roleList" @onPageChange="getRoleListByCondition" :page="pageService" ref="databox"></data-box>

    <template>
      <i-modal v-model="modifyRoleModal" title="修改角色" class="modify-role">
        <modify-role :modifyRoleModel="modifyRoleModel" ref="modify-role" @close="closeAndRefresh"></modify-role>
        <div slot="footer">
          <i-button class="Ghost" @click="modifyRoleModal=false">取消</i-button>
          <i-button class="blueButton" @click="submitEditRole">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!-- <template>
      <i-modal v-model="modulePowerModal" title="模块权限" :width="800">
        <module-power @close="modulePowerModal=false" ref="module-power" :roleId="currentRoleId"></module-power>
        <div slot="footer">
          <i-button @click="modulePowerModal=false">取消</i-button>
          <i-button @click="saveModulePower" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template> -->

    <template>
      <i-modal v-model="userListModal" title="用户列表" :width="800" class-name="no-footer" @on-visible-change="visibleChange">
        <user-list ref="user-list"></user-list>
      </i-modal>
    </template>

    <template>
      <i-modal width="300" v-model="waitHandleCaseModal" title="待办事项配置">
        <wait-handle-case ref="wait-handle" @close="waitHandleCaseModal=false"></wait-handle-case>
        <div slot="footer">
          <i-button type="ghost" @click="waitHandleCaseModal=false">取消</i-button>
          <i-button class="blueButton" @click="submitRole">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="新增角色" v-model="addRoleModal">
        <add-role ref="add-role" @refreshRoleList="refreshRoleList"></add-role>
        <template slot="footer">
          <i-button @click="addRoleCancel">取消</i-button>
          <i-button @click="addRole" class="blueButton">确定</i-button>
        </template>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import ModifyRole from '~/components/system-manage/modify-role.vue'
import UserList from '~/components/system-manage/user-list.vue'
import WaitHandleCase from '~/components/system-manage/wait-handle-case.vue'
import ModulePower from '~/components/system-manage/module-power.vue'
import OrgPower from '~/components/system-manage/org-power.vue'
import AddRole from '~/components/system-manage/add-role.vue'
import SvgIcon from '~/components/common/svg-icon.vue'

import { Dependencies } from '~/core/decorator'
import { ManageService } from '~/services/manage-service/manage.service'
import { OrderService } from '~/services/business-service/order.service'
import { SysRolesService } from '~/services/manage-service/sys-roles.service'
import { BackLogService } from '~/services/manage-service/back-log.service'
import { Layout } from '~/core/decorator'
import { Modal } from 'iview'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { CommonService } from '~/utils/common.service'

@Layout('workspace')
@Component({
  components: {
    SvgIcon,
    DataBox,
    ModifyRole,
    UserList,
    WaitHandleCase,
    ModulePower,
    AddRole
  }
})
export default class RoleMaintenance extends Page {
  @Dependencies(OrderService) private orderService: OrderService
  @Dependencies(SysRolesService) private sysRolesService: SysRolesService
  @Dependencies(ManageService) private manageService: ManageService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(BackLogService) private backLogService: BackLogService

  private columns1: any
  private ids: any = []
  private roleList: any = []
  // private roleList: Array<Object> = [];
  private searchOptions: Boolean = false
  private openCreateCompact: Boolean = false
  private openColumnsConfig: Boolean = false
  private openCompact: Boolean = false
  private data2: Array<Object> = []
  private data3: Array<Object> = []
  private checkRadio: String = '融资租赁合同'

  private modifyRoleModal: Boolean = false // 修改角色
  // private modulePowerModal: Boolean = false // 模块权限
  private userListModal: Boolean = false // 用户列表
  private waitHandleCaseModal: Boolean = false // 待办事项配置
  private addRoleModal: Boolean = false // 新增角色

  private rowIdFun: any = ''
  private roleId: Number = 0
  // private currentRoleId: number | null = null
  private roleModel = {
    roleName: '',
    roleStatus: '',
    userId: ''
  }

  private modifyRoleModel = {
    roleName: '',
    roleStatus: '',
    roleRemark: ''
  }

  mounted() {
    this.getRoleListByConditionOn()

  }

  created() {
    this.columns1 = [
      {
        type: 'selection',
        align: 'center',
        width: 40,
        fixed: 'left'
      },
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(15),
        fixed: 'left',
        align: 'center',
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
                    this.modifyRole(row)
                  }
                }
              },
              '修改'
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
                    this.deleteRole(row)
                  }
                }
              },
              '删除'
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
                  click: () => this.showModulePower(row)
                }
              },
              '模块权限'
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
                  click: () => this.showOrgPower(row)
                }
              },
              '机构权限'
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
                    this.userList(row)
                  }
                }
              },
              '用户列表'
            ),
            // h(
            //   'i-button',
            //   {
            //     props: {
            //       type: 'text'
            //     },
            //     style: {
            //       color: '#265EA2'
            //     },
            //     on: {
            //       click: () => {
            //         this.waitHandleCaseConfig(row)
            //       }
            //     }
            //   },
            //   '待办事项配置'
            // )
          ])
        }
      },
      {
        align: 'center',
        editable: true,
        title: '状态',
        key: 'roleStatus',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => {
          if (row.roleStatus === 0) {
            return h('span', {}, '启用')
          } else if (row.roleStatus === 1) {
            return h('span', {}, '停用')
          }
        }
      },
      {
        align: 'center',
        editable: true,
        title: '角色名称',
        key: 'roleName',
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        align: 'center',
        editable: true,
        title: '备注',
        key: 'roleRemark',
        minWidth: this.$common.getColumnWidth(8),
      },
      {
        align: 'center',
        editable: true,
        title: '操作人',
        key: 'realName',
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        align: 'center',
        editable: true,
        title: '创建时间',
        key: 'operateTime',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      }
    ]
  }
  /**
   * 保存角色的模块权限
   */
  saveModulePower() {
    let modulePower: any = this.$refs['module-power'] as ModulePower
    modulePower.submit()
  }
  addNewRole() {
    this.addRoleModal = true
  }

  closeAndRefresh() {
    this.modifyRoleModal = false
    this.getRoleListByCondition()
  }
  /**
   * 取消新增
   */
  addRoleCancel() {
    this.addRoleModal = false
    let _addRole = <Modal>this.$refs['add-role']
    _addRole.reset()
  }
  getRoleListByCondition() {
    this.manageService
      .queryRolePage(
        {
          roleName: this.roleModel.roleName,
          roleStatus: this.roleModel.roleStatus,
          userId: ''
        },
        this.pageService
      )
      .subscribe(
        data => {
          this.roleList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   *只获取已启用状态的角色
   */
  getRoleListByConditionOn() {
    this.manageService
      .queryRolePage(
        {
          roleName: this.roleModel.roleName,
          roleStatus: this.roleModel.roleStatus,
          userId: ''
        },
        this.pageService
      )
      .subscribe(
        data => {
          this.roleList = data.filter(v => v.roleStatus == 0)
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  refreshRoleList() {
    //清空搜索条件并刷新列表
    this.roleModel = {
      roleName: '',
      roleStatus: '',
      userId: ''
    }
    this.getRoleListByCondition()
    this.addRoleModal = false
  }
  /**
   * 新增角色弹窗的确定
   */
  addRole() {
    let _addRole = <Modal>this.$refs['add-role']
    _addRole.addChangeRole()
  }
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  modifyRole(row) {
    this.modifyRoleModal = true
    this.modifyRoleModel = row
    let _modifyRole: any = this.$refs['modify-role']
    _modifyRole.makeData(row) // 给修改角色赋值
  }
  deleteRole(row) {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此角色吗？',
      onOk: () => {
        this.manageService
          .deleteRole({
            roleId: row.id
          })
          .subscribe(
            val => {
              this.$Message.success('删除成功！')
              this.getRoleListByCondition()
            },
            ({ msg }) => {
              this.$Message.error(msg)
            }
          )
      }
    })
  }
  /**
   * 修改角色确定按钮
   */
  submitEditRole() {
    let modifyRole = <Modal>this.$refs['modify-role']
    modifyRole.changeRole()
  }

  /**
   * 显示模块权限
   */
  showModulePower(row) {
    // this.currentRoleId = row.id
    // this.modulePowerModal = true
    this.$dialog.show({
      title: '权限模块维护',
      footer: true,
      width: 1000,
      onOk: modulePower => {
        return modulePower.submit().catch(v => {return false})
      },
      render: h => h(ModulePower, { props: { roleId: row.id } })
    })

  }
  /**
   * 显示机构权限
   */
  showOrgPower(row) {
    this.$dialog.show({
      title: '机构权限设置',
      fotter: true,
      width: 1000,
      onOk: () => {
        alert(1111)
      },
      render: h => h(OrgPower, {})
    })
  }

  userList(row) {
    this.userListModal = true
    let _userList = <Modal>this.$refs['user-list']
    _userList.getUserListByRole(row.id)
  }
  waitHandleCaseConfig(row) {
    this.waitHandleCaseModal = true
    this.roleId = row.id
    let waitHandle: any = this.$refs['wait-handle']
    waitHandle.getData(this.roleId)
  }
  modulePoweropen(val) {
    if (val) {
      let roleOpen: any = this.$refs['module-power']
      roleOpen.refresh(this.rowIdFun)
    }
  }
  visibleChange(val) {
    if (!val) {
      let _userList = <Modal>this.$refs['user-list']
      _userList.resetFrom()
    }
  }
  /**
   * 代办事项配置确定提交
   */
  submitRole() {
    let _waitHandle: any = this.$refs['wait-handle']
    _waitHandle.configWaitHandle(this.roleId)
  }
  /**
   * 导出角色维护
   */
  exportRole() {
    let databox = this.$refs['databox'] as DataBox
    let multipleSelection = databox.getCurrentSelection()
    if (multipleSelection && multipleSelection.length) {
      let sysLogsIds = multipleSelection.map(v => v.id)
      this.sysRolesService
        .exportRole({
          roleIds: sysLogsIds
        })
        .subscribe(data => {
          CommonService.downloadFile(data, '导出角色维护')
          this.$Message.success('导出成功！')
        })
    } else {
      this.$Message.info('请先选择角色再导出！')
    }
  }
}
</script>

<style lang="less" scoped>
.page.role-maintenance {
  .modify-role {
    .ivu-form {
      position: relative;
      right: 16px;
    }
  }
  .user-list {
    .ivu-modal-footer {
      display: none;
    }
  }
}
</style>
