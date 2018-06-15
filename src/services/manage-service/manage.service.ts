import { manageService } from '~/config/server/manage-service'
import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { FilterService } from "~/utils/filter.service";
import { requestType } from "~/config/enum.config";

export class ManageService {
    @Inject(NetService)
    private netService: NetService

    /**
     * 获取组织
     */
    findAllOrganizationByAuth() {
        return this.netService.send({
            server: manageService.sysOrgController.findAllOrganizationByAuth
        })
    }
    /**
     * 获取分页查询角色
     * @param
     */
    queryRolePage({ roleName, roleStatus, userId }, page) {
        return this.netService.send({
            server: manageService.sysRolesController.queryRolePage,
            data: {
                roleName: roleName,
                roleStatus: roleStatus,
                userId: userId
            },
            page: page
        })
    }

    /**
     * 分条件查询组织下用户列表
     */
    getUsersByDeptPage(data, page) {
        return this.netService.send({
            server: manageService.sysUserController.findUserByOrgAuth,
            data: data,
            page: page
        })
    }
    /**
     * 新增用户
     */
    addUser(data) {
        return this.netService.send({
            server: manageService.sysUserController.addUser,
            data: data
        })
    }
    /**
     * 修改用户
     */
    updateUser(data) {
        return this.netService.send({
            server: manageService.sysUserController.updateUser,
            data: data
        })
    }
    /**
     * 修改角色
     */
    updateRole(data) {
        return this.netService.send({
            server: manageService.sysRolesController.updateRole,
            data: data
        })
    }
    /**
     * 新增角色
     */
    createRole(data) {
        return this.netService.send({
            server: manageService.sysRolesController.createRole,
            data: data
        })
    }
    /**
     * 删除角色
     */
    deleteRole({ roleId }) {
        return this.netService.send({
            server: manageService.sysRolesController.deleteRole,
            data: {
                roleId: roleId
            }
        })
    }
    /**
     * 根据角色获取用户列表
     */
    getUserByRoleIdPage(data, page) {
        return this.netService.send({
            server: manageService.sysRolesController.getUserByRoleIdPage,
            data: data,
            page: page
        })
    }
    /**
     * 系统日志分页查询
     * @param data
     * @param page
     */
    querySysLogsPage(data, page) {
        const dateRange = FilterService.dateRanageFormat(data.dateRange)
        return this.netService.send({
            server: manageService.SysLogsController.querySysLogsPage,
            data: {
                clientIp: data.clientIp,
                exeType: data.exeType,
                startTime: dateRange.start,
                endTime: dateRange.end,
                realName: data.realName
            },
            page: page
        })
    }
    /**
     * 系统备份分页查询
     */
    querySystemBackupPage(data, page) {
        const dateRange = FilterService.dateRanageFormat(data.dateRange)
        return this.netService.send({
            server: manageService.systemBackupController.querySystemBackupPage,
            data: {
                mysqlName: data.mysqlName,
                mongdbName: data.mongdbName,
                type: data.type,
                startTime: dateRange.start,
                endTime: dateRange.end,
            },
            page: page
        })
    }

    /**
     * 删除系统备份
     */
    deleteSystemBackup({ id }) {
        return this.netService.send({
            server: manageService.systemBackupController.deleteSystemBackup,
            data: {
                id: id
            }
        })
    }

    /**
     * 新增系统备份
     */
    createSystemBackup() {
        return this.netService.send({
            server: manageService.systemBackupController.createSystemBackup,
        })
    }

   
    /**
     *  用户角色分配
     */
    userAllocateRoles(data) {
        return this.netService.send({
            server: manageService.sysUserController.userAllocateRoles,
            data: data
        })
    }

    /**
     * 用户批量分配角色
     * @param data
     */
    userBatchAllocateRoles(data) {
        return this.netService.send({
            server: manageService.sysUserController.userBatchAllocateRoles,
            data: data
        })
    }
}
