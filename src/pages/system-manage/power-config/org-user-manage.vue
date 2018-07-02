<!--机构与用户管理--> 
<template>
  <section class="page org-user-manage">
    <page-header title="机构与用户管理" hidden-print hidden-export>
      <i-button class="blueButton" @click="addNewUser">新增用户</i-button>
      <i-button class="blueButton" @click="batchAllotRole">批量分配角色</i-button>
      <i-button class="blueButton" @click="batchManageDevice">批量管理设备</i-button>
    </page-header>
    <i-row class="data-form">
      <i-col :span="4" class="data-form-item">
        <i-row class="add-agency">
          <i-button class="blue-button" @click="addDept">添加机构</i-button>
        </i-row>
        <i-row>
          <div class="add-org-tree">
            <organize-tree :dataList="orgData" @add="addDept" @change="onChange" @remove="removeDept" @edit="editDept"></organize-tree>
          </div>
        </i-row>
      </i-col>
      <i-col :span="20">
        <data-form ref="user-search-form" hidden-date-search :model="userSearchModel" @on-search="searchUserByCondition" :page="pageService">
          <template slot="input">
            <i-form-item prop="userName" label="用户名：">
              <i-input v-model="userSearchModel.userName" placeholder="请输入用户名"></i-input>
            </i-form-item>
            <i-form-item prop="realName" label="姓名：">
              <i-input v-model="userSearchModel.realName" placeholder="请输入姓名"></i-input>
            </i-form-item>
            <i-form-item prop="status" label="是否启用">
              <i-select v-model="userSearchModel.userStatus">
                <i-option v-for="{value,label} in $dict.getDictData(10007)" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </template>
        </data-form>

        <data-box :id="9" :columns="columns1" :data="userList" ref="databox" @on-page-change="searchUserByCondition" :page="pageService" @on-selection-change="onSelectionChange"></data-box>
      </i-col>
    </i-row>

  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Layout } from '~/core/decorator'
import { Dependencies } from '~/core/decorator'
import { Action, State, namespace } from "vuex-class";
import { PageService } from '~/utils/page.service'
import { SysOrgService } from '~/services/manage-service/sys-org.service'
import { SysUserService } from '~/services/manage-service/sys-user.service'
import OrganizeTree from '~/components/common/organize-tree.vue'
import DataForm from "~/components/common/data-form.vue";
import ModifyOrg from "~/components/system-manage/modify-org.vue";
import DeviceManage from '~/components/system-manage/device-manage.vue'
import BatchManageDevice from '~/components/system-manage/batch-manage-device.vue' // 批量管理设备
import ModifyUser from '~/components/system-manage/modify-user.vue'
import UserRoleManage from '~/components/system-manage/user-role-manage.vue'

// 引入机构模块
const OrgModule = namespace("orgSpace");

@Layout('workspace')
@Component({
  components: {
    ModifyUser,
    OrganizeTree,
    BatchManageDevice
  }
})
export default class OrgUserManage extends Page {
  @Dependencies(SysOrgService) private sysOrgService: SysOrgService
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(SysUserService) private sysUserService: SysUserService

  @OrgModule.State orgData;
  @OrgModule.Action getOrgData;

  private columns1: any
  private userList: Array<Object> = []
  private columns2: any
  private data2: Array<Object> = []
  // 机构
  private dataList: Array<any> = []
  // 机构ID
  private selectOrg: any = undefined;

  private allotRoleModal: Boolean = false
  private modifyUserModal: Boolean = false
  private addNewUserModal: Boolean = false
  private deviceManageModal: Boolean = false
  private addNewOrgModal: Boolean = false
  private userName: String = ''
  // 查询用户数据Model
  private userSearchModel: any = {}
  private userSearchform: DataForm;

  private modifyUserModel: any
  private userIds: Array<any> = []
  private multipleUserId: any
  private batchAllotFlag: Boolean = false
  private deptLevel: number | null = null
  private deptCode: String = ''
  // private deptPid: number | null = null;
  private editNewOrgModal: Boolean = false

  private companyId: any = 0
  mounted() {
    this.userSearchform = this.$refs['user-search-form'] as DataForm
    this.searchUserByCondition()
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
        minWidth: this.$common.getColumnWidth(10),
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
            this.$filter.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss')
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

  /**
   * databox 复选框，选中的时候处理
   */
  private onSelectionChange(selection) {
    this.userIds = (selection || []).map(v => v.id)
  }


  /**
   * 修改用户
   */
  private modifyUser(row) {
    this.$dialog.show({
      title: "修改用户",
      footer: true,
      onOk: editUser => {
        return editUser.updateUser().then(v => {
          if (v) this.searchUserByCondition()
          return v
        })
      },
      render: h => h(ModifyUser, {
        props: {
          userData: row
        }
      })
    })
  }

  /**
   * 重置用户密码 
   */
  private resetPwd(row) {
    this.sysUserService.resetPassword(row.id)
      .subscribe(
        val => this.$Message.success('重置成功'),
        err => this.$Message.error(err.msg)
      )
  }

  private deviceManageOpen(row) {
    this.$dialog.show({
      title: '设备锁维护',
      render: h => h(DeviceManage, {
        props: {
          userInfo: {
            id: row.id,
            userName: row.userUsername
          }
        }
      })
    })
  }

  /**
   * 新增用户
   */
  private addNewUser() {
    if (!this.selectOrg) {
      this.$Message.info("请选择机构")
      return
    }
    this.$dialog.show({
      title: "新增用户",
      footer: true,
      onOk: addUser => {
        return addUser.createUser().then(v => {
          if (v) this.searchUserByCondition()
          return v
        })
      },
      render: h => h(ModifyUser, {
        props: {
          orgId: this.selectOrg.id
        }
      })
    })
  }

  /**
   * 分配角色
   */
  private allotRole(row) {
    this.userIds = [row.id]
    this.batchAllotRole()
  }
  /**
   * 批量分配角色
   */
  private batchAllotRole() {
    if (this.userIds.length === 0) {
      this.$Message.info("请先选择用户")
      return;
    }
    this.$dialog.show({
      title: "分配角色",
      footer: true,
      width: 750,
      onOk: allotRole => {
        return allotRole.updateUserRole().then(v => {
          if (v) this.searchUserByCondition()
          return v
        })
      },
      render: h => h(UserRoleManage, {
        props: {
          userIds: this.userIds
        }
      })
    })
  }



  /**
   * 批量管理设备
   */
  private batchManageDevice() {
    if (this.userIds.length === 0) {
      this.$Message.info("请先选择用户")
      return;
    }
    this.$dialog.show({
      title: "批量管理设备",
      render: h => h(BatchManageDevice, {
        props: {
          userIds: this.userIds
        }
      })
    })
  }

  /**
   * 根据机构ID和其他条件搜索用户分页数据
   */
  private searchUserByCondition() {
    if (this.selectOrg) this.userSearchModel.orgId = this.selectOrg.id
    this.sysUserService.findUserByOrgAuth(this.userSearchModel, this.pageService)
      .subscribe(
        data => this.userList = data,
        err => this.$Message.error(err.msg)
      )
  }

  /**
   * 树change
   */
  private onChange(value) {
    this.selectOrg = value
    // 需要先重置用户搜索条件
    this.userSearchform.onResetForm()
    // 重置分页
    this.pageService.reset()
    // 查找用户
    this.searchUserByCondition()
  }


  private removeDept() {
    this.$Modal.confirm({
      title: '提示',
      content: '确定删除此组织机构吗？',
      onOk: () => {
        this.sysOrgService.deleteOrganization(this.selectOrg.id)
          .subscribe(
            data => {
              this.$Message.success('删除成功！')
              this.getOrgData()
            },
            err => {
              this.$Message.error(err.msg)
            }
          )
      }
    })
  }

  /**
   * 添加机构
   */
  private addDept() {
    if (!this.selectOrg) {
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
          if (v) this.getOrgData()
          return v
        })
      },
      render: h => h(ModifyOrg, {
        props: {
          pid: this.selectOrg.id
        }
      })
    })
  }

  /**
   * 编辑机构
   */
  private editDept(val) {
    this.$dialog.show({
      title: "机构维护",
      footer: true,
      onOk: modify => {
        return modify.update().then(v => {
          if (v) this.getOrgData()
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
