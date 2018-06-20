<!--角色维护--> 
<template>
  <section class="page role-maintenance">
    <page-header title="角色维护" hidden-print hidden-export>
      <command-button label="新增角色" @click="roleOperate()"></command-button>
    </page-header>
    <data-form hidden-date-search :model="model" @on-search="searchRolesByAuth">
      <template slot="input">
        <i-form-item prop="roleName" label="角色名称：">
          <i-input placeholder="请输入角色姓名" v-model="model.roleName"></i-input>
        </i-form-item>
        <i-form-item prop="roleStatus" label="启用状态：">
          <i-select v-model="model.roleStatus" clearable>
            <i-option label="启用" :value="0" :key="0"></i-option>
            <i-option label="停用" :value="1" :key="1"></i-option>
          </i-select>
        </i-form-item>
      </template>

    </data-form>
    <data-box :id="20" :columns="columns1" :data="dataSet" @onPageChange="searchRolesByAuth" :page="pageService" ref="databox"></data-box>

  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import ModifyRole from '~/components/system-manage/modify-role.vue'
import UserList from '~/components/system-manage/user-list.vue'
import ModulePower from '~/components/system-manage/module-power.vue'
import OrgPower from '~/components/system-manage/org-power.vue'
import { Dependencies } from '~/core/decorator'
import { SysRoleService } from '~/services/manage-service/sys-role.service'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'

@Layout('workspace')
@Component({
  components: {}
})
export default class RoleMaintenance extends Page {
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService
  @Dependencies(PageService) private pageService: PageService

  private columns1: any
  private ids: any = []
  private dataSet: any = []
  // private dataSet: Array<Object> = [];
  private searchOptions: Boolean = false
  private openCreateCompact: Boolean = false
  private openColumnsConfig: Boolean = false
  private openCompact: Boolean = false
  private data2: Array<Object> = []
  private data3: Array<Object> = []
  private checkRadio: String = '融资租赁合同'

  private modifyRoleModal: Boolean = false // 修改角色
  // private modulePowerModal: Boolean = false // 模块权限
  private waitHandleCaseModal: Boolean = false // 待办事项配置

  private rowIdFun: any = ''
  private roleId: Number = 0
  // private currentRoleId: number | null = null
  private model = {
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
    this.searchRolesByAuth()
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
        minWidth: this.$common.getColumnWidth(12),
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
                    this.roleOperate(row)
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
                  click: () => {
                    this.$dialog.show({
                      title: "用户列表",
                      isView: true,
                      render: h => h(UserList, {
                        props: {
                          roleId: row.id
                        }
                      })
                    })
                  }
                }
              },
              '用户列表'
            )
          ])
        }
      },

      {
        align: 'center',
        editable: true,
        title: '角色名称',
        key: 'roleName',
        minWidth: this.$common.getColumnWidth(5),
      },
      {
        align: 'center',
        editable: true,
        title: '机构名称',
        key: 'orgName',
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        align: 'center',
        editable: true,
        title: '所属部门',
        key: 'deptName',
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        align: 'center',
        editable: true,
        title: '启用状态',
        key: 'roleStatus',
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) => h('p', {}, this.$filter.dictConvert(row.roleStatus))
      },
      {
        align: 'center',
        editable: true,
        title: '备注',
        key: 'roleDesc',
        minWidth: this.$common.getColumnWidth(8),
      },
      {
        align: 'center',
        editable: true,
        title: '操作人',
        key: 'operatorName',
        minWidth: this.$common.getColumnWidth(4),
      },
      {
        align: 'center',
        editable: true,
        title: '操作时间',
        key: 'operatorTime',
        minWidth: this.$common.getColumnWidth(6),
        render: (h, { row, columns, index }) => h('span', {}, this.$filter.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss'))
      }
    ]
  }

  /**
   * 角色维护
   * @param val 需要维护的角色数据
   */
  private roleOperate(val?: Object) {
    this.$dialog.show({
      title: val ? "新增角色" : "角色维护",
      footer: true,
      onOk: modifyRole => {
        return modifyRole.submit().then(v => {
          if (v) this.searchRolesByAuth()
          return v
        })
      },
      render: h => h(ModifyRole, {
        props: {
          roleData: val
        }
      })
    })
  }

  /**
 * 获取自己所能操作的所有角色
 */
  private searchRolesByAuth() {
    this.sysRoleService.findAllRoleByAuth(this.model, this.pageService)
      .subscribe(
        data => this.dataSet = data,
        err => this.$Message.error(err.msg)
      )
  }


  /**
   * 删除角色
   */
  private deleteRole(row) {
    let roleName = row.roleName;
    this.$Modal.confirm({
      title: "提示",
      content: `确定删除 <b>${roleName}</b> 角色吗？`,
      onOk: () => {
        this.sysRoleService.deleteRole(row.id).subscribe(
          val => {
            this.$Message.success(`删除 <b>${roleName}</b> 成功！`)
            this.searchRolesByAuth()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }


  /**
   * 显示模块权限
   */
  showModulePower(row) {
    this.$dialog.show({
      title: '权限模块维护',
      footer: true,
      width: 1000,
      onOk: modulePower => {
        return modulePower.submit().then(v => v)
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
      render: h => h(OrgPower, {
        props: {
          roleId: row.id
        }
      })
    })
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
