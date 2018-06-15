<!--机构与用户管理-->
<template>
  <section class="page org-user-manage">
    <!-- <page-header title="机构与用户管理" hidden-print @on-export="exportName"> -->
    <!-- 暂时取消导出功能 -->
    <page-header title="机构与用户管理" hidden-print hidden-export>
      <i-button class="blueButton" @click="addNewUser">新增用户</i-button>
      <i-button class="blueButton" @click="buttonOnlyOne1">批量分配角色</i-button>
      <i-button class="blueButton" @click="buttonOnlyOne2">批量管理设备</i-button>
    </page-header>
    <i-row class="data-form">
      <i-col :span="4" class="data-form-item">

        <i-row class="add-agency">
          <i-button class="blue-button" @click="addDept">添加机构</i-button>
        </i-row>
        <i-row>
          <div class="add-org-tree">
            <organize-tree :dataList="dataList" @add="addDept" @change="onChange" @remove="removeDept" @edit="editDept"></organize-tree>
          </div>
        </i-row>
      </i-col>
      <i-col :span="20">
        <data-form hidden-date-search :model="userSearchModel" @on-search="searchUserListByCondition" :page="pageService">
          <template slot="input">
            <i-form-item prop="userName" label="用户名：">
              <i-input v-model="userSearchModel.userName" placeholder="请输入用户名"></i-input>
            </i-form-item>
            <i-form-item prop="realName" label="姓名：">
              <i-input v-model="userSearchModel.realName" placeholder="请输入姓名"></i-input>
            </i-form-item>
            <i-form-item prop="status" label="是否启用">
              <i-select v-model="userSearchModel.userStatus">
                <i-option v-for="{value,label} in $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </template>
        </data-form>

        <data-box :id="9" :columns="columns1" :data="userList" ref="databox" @onPageChange="getUserListByCondition" :page="pageService" @on-selection-change="onSelectionChange"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal v-model="allotRoleModal" :title="batchAllotFlag?'批量分配角色':'分配角色'" @on-visible-change="visiableChange">
        <allot-role-modal :userId="userId" :batchAllotFlag="batchAllotFlag" :userIds="userIds" ref="allot-role-modal"></allot-role-modal>
        <div slot="footer">
          <i-button @click="allotRoleModal=false">取消</i-button>
          <i-button @click="allotRoleClick" class="blueButton">确定分配</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="modifyUserModal" title="修改用户" :width="800">
        <modify-user :modifyUserModel="modifyUserModel" @close="modifyUserClose" ref="modify-user"></modify-user>
        <div slot="footer">
          <i-button @click="modifyUserModal=false">取消</i-button>
          <i-button class="blueButton" @click="confirmModifyUser">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addNewUserModal" title="新增用户" :width="800" class="addUser" @on-visible-change="newUserModalChange">
        <add-user :deptObject="deptObject" @close="closeAdd" ref="add-user"></add-user>
        <div slot="footer">
          <i-button @click="addNewUserModal=false">取消</i-button>
          <i-button class="blueButton" @click="confirmAddUser">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deviceManageModal" title="设备管理" :width="800" class="device-manage" class-name="no-footer">
        <device-manage ref="device-manage"></device-manage>
      </i-modal>
    </template>

    <template>
      <i-modal title="批量管理设备" v-model="batchManageDeviceModal" :width="700" class="batch-manage-device">
        <batch-manage-device ref="batch-manage-device" @close="closeAndRefreshBatch"></batch-manage-device>
      </i-modal>
    </template>

    <template>
      <i-modal title="数据权限" v-model="dataPowerModal" @on-visible-change="dataPowerModalChange">
        <data-power-modal ref="data-power" @close="dataPowerModal=false"></data-power-modal>
        <div slot="footer">
          <i-button @click="dataPowerModal=false">取消</i-button>
          <i-button @click="confirmDataPower" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import Component from 'vue-class-component'
import allotRoleModal from '~/components/system-manage/allot-role-modal.vue'
import UserList from '~/components/system-manage/user-list.vue'
import WaitHandleCase from '~/components/system-manage/wait-handle-case.vue'
import ModulePower from '~/components/system-manage/module-power.vue'
import ModifyUser from '~/components/system-manage/modify-user.vue'
import AddUser from '~/components/system-manage/add-user.vue'
import DeviceManage from '~/components/system-manage/device-manage.vue'
import BatchManageDevice from '~/components/system-manage/batch-manage-device.vue' // 批量管理设备
import ModifyOrg from "~/components/system-manage/modify-org.vue";
import DataPowerModal from '~/components/system-manage/data-power-modal.vue'
import OrganizeTree from '~/components/common/organize-tree.vue'
import { Dependencies } from '~/core/decorator'
import { RoleService } from '~/services/role-service/role.service'
import { ManageService } from '~/services/manage-service/manage.service'
import { SysOrgService } from '~/services/manage-service/sys-org.service'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { LoginService } from '~/services/manage-service/login.service'
import { Modal } from 'iview'
import { SysUserService } from '~/services/manage-service/sys-user.service'
import { CommonService } from '~/utils/common.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    allotRoleModal,
    UserList,
    WaitHandleCase,
    ModulePower,
    ModifyUser,
    AddUser,
    DeviceManage,
    OrganizeTree,
    BatchManageDevice,
    DataPowerModal
  }
})
export default class OrgUserManage extends Page {
  // @Dependencies(RoleService) private roleService: RoleService;
  @Dependencies(ManageService) private manageService: ManageService
  @Dependencies(SysOrgService) private sysOrgService: SysOrgService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(LoginService) private loginService: LoginService
  @Dependencies(SysUserService) private sysUserService: SysUserService
  private columns1: any
  private userList: Array<Object> = []
  private columns2: any
  private data2: Array<Object> = []
  // 机构
  private dataList: Array<any> = []
  // 机构ID
  private orgId: number = 0;

  private allotRoleModal: Boolean = false
  private modifyUserModal: Boolean = false
  private addNewUserModal: Boolean = false
  private deviceManageModal: Boolean = false
  private addNewOrgModal: Boolean = false
  private userName: String = ''
  // 查询用户数据Model
  private userSearchModel: any = {}
  private deptObject: any
  private modifyUserModel: any
  private userId: number | null = null
  private userIds: Array<any> = []
  private multipleUserId: any
  private batchAllotFlag: Boolean = false
  private deptLevel: number | null = null
  private deptCode: String = ''
  // private deptPid: number | null = null;
  private editNewOrgModal: Boolean = false
  private batchManageDeviceModal: Boolean = false
  private warnStatus: any = null
  private dataPowerModal: Boolean = false // 数据权限弹出框
  private multipleSelection: any = []
  private addOrgModel: any = {
    deptName: '',
    deptStatus: 0,
    companyName: '',
    deptRemark: '',
    deptLevel: '',
    deptCode: '',
    deptPid: '',
    companyId: ''
  }
  private companyId: any = 0
  mounted() {
    this.getUserListByCondition()
    this.getTree()
  }
  created() {
    this.modifyUserModel = {
      userName: '',
      realName: '',
      companyName: '',
      status: '',
      phone: ''
    }
    this.userSearchModel = {
      userName: '',
      realName: '',
      status: '',
      orgId: ''
    }
    this.columns1 = [
      {
        align: 'center',
        type: 'selection',
        fixed: 'left',
        width: 40
      },
      {
        title: '操作',
        minWidth: this.$common.getColumnWidth(14),
        fixed: 'left',
        align: 'center',
        render: (h, { row, column, index }) => h('div', [
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
                  this.allotRole(row)
                }
              }
            },
            '分配角色'
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
                  this.modifyUser(row)
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
                  this.resetPwd(row)
                }
              }
            },
            '重置密码'
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
                  this.deviceManageOpen(row)
                }
              }
            },
            '设备管理'
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
                  this.dataPowerClick(row)
                }
              }
            },
            '数据权限'
          )
        ])

      },
      {
        align: 'center',
        title: '用户名',
        key: 'userUsername',
        editable: true,
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        title: '姓名',
        editable: true,
        key: 'userRealname',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h('div', {
            attrs:
              {
                title: row.userRealname
              }
          }, this.$filter.subString(row.userRealname)
          )
        }
      },
      {
        align: 'center',
        title: '所属机构',
        editable: true,
        key: 'orgName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        editable: true,
        title: '是否启用',
        key: 'userStatus',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('span', {}, this.$filter.dictConvert(row.userStatus))
      },
      {
        align: 'center',
        editable: true,
        title: '电话',
        key: 'userPhone',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: 'center',
        editable: true,
        title: '创建人',
        key: 'operatorName',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h('div',
            {
              attrs: {
                title: row.operatorName
              }
            },
            this.$filter.subString(row.operatorName))
        }
      },
      {
        align: 'center',
        editable: true,
        title: '创建时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '备注',
        key: 'userRemark',
        minWidth: this.$common.getColumnWidth(8),
        render: (h, { row, column, index }) => {
          return h('div', {
            attrs: {
              title: row.userRemark
            }
          }, this.$filter.subString(row.userRemark, 10))
        }
      },
    ]
  }

  onSelectionChange(selection) {
    this.multipleSelection = selection
  }
  exportName() {
    if (this.multipleSelection.length === 0) {
      this.$Message.warning('请选择导出项！')
    } else {
      let id: any = this.multipleSelection.map(v => v.id)
      this.sysUserService.exportUserList({ userIds: id }).subscribe(
        data => {
          CommonService.downloadFile(data, '导出用户')
          this.$Message.success('导出成功！')
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
    }
  }
  dataPowerModalChange(flag) {
    if (!flag) {
      let _dataPower: any = this.$refs['data-power']
      _dataPower.resetTree()
    }
  }

  /**
   * 确定数据权限
   */
  confirmDataPower() {
    let _dataPower: any = this.$refs['data-power']
    _dataPower.allotUserDataPower(this.userId)
  }

  closeAndRefreshBatch() {
    this.batchManageDeviceModal = false
    this.getUserListByCondition()
  }

  modifyUserClose() {
    this.modifyUserModal = false
    this.getUserListByCondition()
  }

  closeAdd() {
    this.addNewUserModal = false
    this.getUserListByCondition()
  }

  /**
   * 修改用户
   */
  modifyUser(row) {
    // this.modifyUserModal = true
    // this.modifyUserModel = row
    // let _modifyUser: any = this.$refs['modify-user']
    // _modifyUser.getData(this.modifyUserModel)
    // _modifyUser.findAllOrganizationByAuth()
  }

  resetPwd(row) {
    this.loginService
      .resetPassword({
        userId: row.id
      })
      .subscribe(val => {
        this.$Message.success('重置成功')
      })
  }

  deviceManageOpen(row) {
    this.deviceManageModal = true
    this.userName = row.userName
    let _deviceManage: any = this.$refs['device-manage']
    _deviceManage.makeData(row)
  }

  /**
   * 新增用户
   */
  addNewUser() {
    this.addNewUserModal = true
    let _addUser: any = this.$refs['add-user']
    _addUser.makeData(this.deptObject)
  }

  allotRole(row) {
    this.allotRoleModal = true
    this.batchAllotFlag = false
    let _allotRole = <Modal>this.$refs['allot-role-modal']
    _allotRole.makeData(row)
    _allotRole.getRoleList()
    this.userId = row.id
  }
  /**
   * 批量分配角色
   */
  batchAllotRole() {
    let multiple: any = this.$refs['databox']
    this.multipleUserId = multiple.getCurrentSelection()
    if (!this.multipleUserId || !this.multipleUserId.length) {
      this.warnStatus = true
      setTimeout(() => {
        this.warnStatus = false
      }, 2000)
      return this.$Message.error('请选择用户')
    } else {
      this.allotRoleModal = true
      let _allotRole = <Modal>this.$refs['allot-role-modal']
      _allotRole.getRoleList()
      this.batchAllotFlag = true
      this.userIds = this.multipleUserId.map(v => v.id)
    }
  }

  closeEditOrg() {
    this.editNewOrgModal = false
    // this.getTree()
  }

  closeOrg() {
    this.addNewOrgModal = false
    // this.getTree()
  }
  buttonOnlyOne1() {
    if (!this.warnStatus) {
      this.batchAllotRole()
    }
  }
  buttonOnlyOne2() {
    if (!this.warnStatus) {
      this.batchManageDevice()
    }
  }

  /**
   * 批量管理设备
   */
  batchManageDevice() {
    let multiple: any = this.$refs['databox']
    this.multipleUserId = multiple.getCurrentSelection()
    if (!this.multipleUserId || !this.multipleUserId.length) {
      this.warnStatus = true
      setTimeout(() => {
        this.warnStatus = false
      }, 2000)
      return this.$Message.error('请选择用户')
    } else {
      this.batchManageDeviceModal = true
      this.userIds = this.multipleUserId.map(v => v.id)
      let _batchManage: any = this.$refs['batch-manage-device']
      _batchManage.makeData(this.multipleUserId)
    }
  }

  getUserListByCondition() {
    // let deptId =
    this.manageService
      .getUsersByDeptPage(this.userSearchModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data.filter(x => {
            return x.userStatus == 10022
          })
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  searchUserListByCondition() {
    this.userSearchModel.orgId = this.orgId
    this.manageService
      .getUsersByDeptPage(this.userSearchModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 树change
   */
  onChange(value) {
    this.orgId = value.id
    this.userSearchModel.orgId = value.id
    this.deptLevel = value.deptLevel
    this.deptObject = value
    this.addOrgModel = value
    this.manageService
      .getUsersByDeptPage(this.userSearchModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }

  /**
   * 数据权限
   */
  dataPowerClick(row) {
    this.dataPowerModal = true
    this.userId = row.id
    let _dataPower: any = this.$refs['data-power']
    _dataPower.getAllOrg(this.userId)
  }

  /**
   * 确认分配角色
   */
  allotRoleClick() {
    let _addRole = <Modal>this.$refs['allot-role-modal']
    _addRole.allotRole()
  }

  removeDept() {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此组织机构吗？',
      onOk: () => {
        this.sysOrgService.deleteOrganization(this.orgId)
          .subscribe(
            data => {
              this.$Message.success('删除成功！')
              this.getTree()
            },
            err => {
              this.$Message.error(err.msg)
            }
          )
      }
    })
  }

  /**
   * 获取机构树 数据
   */
  private getTree() {
    this.sysOrgService.findAllOrganizationByAuth().subscribe(
      data => {
        this.deptObject = data[0]
        this.dataList = data
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }

  /**
   * 添加机构
   */
  private addDept() {
    if (this.orgId === 0) {
      this.$Message.info("请选择一个父级机构再操作")
      return
    }
    // 判断当前机构级别ID是不是最大机构限制ID
    let orgSource: number[] = this.$dict.getDictData(10003).map(v => v.value)
    if (this.deptLevel === Math.max(...orgSource)) {
      this.$Message.error('已达到最大机构级别限制')
      return
    }
    this.$dialog.show({
      title: "新增机构",
      footer: true,
      onOk: addOrg => {
        return addOrg.create().then(v => {
          if (v) this.getTree()
          return v
        })
      },
      render: h => h(ModifyOrg, {
        props: {
          pid: this.orgId
        }
      })
    })
  }



  private editDept(val) {
    this.$dialog.show({
      title: "机构维护",
      footer: true,
      onOk: modify => {
        return modify.update().then(v => {
          if (v) this.getTree()
          return v
        })
      },
      render: h => h(ModifyOrg, {
        props: {
          orgData: val
        }
      })
    })
  }


  cancelEditOrg() {
    this.editNewOrgModal = false
  }

  confirmModifyUser() {
    let _modifyUser: any = this.$refs['modify-user']
    _modifyUser.updateUser()
  }

  visiableChange(val) {
    if (!val) {
      let _allotRole = <Modal>this.$refs['allot-role-modal']
      _allotRole.resetForm()
    }
  }

  newUserModalChange(val) {
    if (!val) {
      let _addUser = <Modal>this.$refs['add-user']
      _addUser.resetForm()
    }
  }

  confirmAddUser() {
    let _addUser = <Modal>this.$refs['add-user']
    _addUser.confirmAddUser()
  }

  /**
   * 确定批量管理设备
   */
  confirmBatchManageDevice() {
    let _batchManage: any = this.$refs['batch-manage-device']
    _batchManage.confirmBatchMange()
  }
  /**
   * 重置搜索
   */
  refreshRoleList() {
    this.userSearchModel = {
      userName: '',
      realName: '',
      status: '',
      orgId: 1
    }
  }
}
</script>

<style lang="less" scoped>
.page.org-user-manage {
  .data-form {
    margin-top: 10px;
    .data-form-item {
      border: 1px solid #dddddd;
      padding: 20px 0;
      height: 590px;
      .add-agency {
        border-bottom: 1px solid #dddddd;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .blue-button {
          position: relative;
          bottom: 10px;
          right: 8px;
          background: #265ea2;
          color: #fff;
        }
      }
      .add-org-tree {
        overflow: auto;
        height: 540px;
      }
    }
    .data-form-multifunction {
      .title {
        margin-left: 20px;
      }
      .form-input {
        display: inline-block;
        width: 10%;
      }
      .blue-button {
        background: #265ea2;
        color: #fff;
        margin-left: 20px;
      }
    }
  }
  .batch-manage-device {
    .ivu-modal-footer {
      display: none;
    }
  }
}
</style>
<style lang="less">
.ivu-page-options {
  .ivu-select.ivu-select-single.ivu-select-small,
  .ivu-select-selection {
    width: 80px !important;
  }
}
</style>
