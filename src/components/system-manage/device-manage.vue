<!--设备管理-->
<template>
  <section class="component device-manage">
    <span class="form-name">当前用户名：
      <b>{{this.userInfo.userName}}</b>
    </span>
    <data-box :columns="columns1" :data="deviceList" :showConfigColumn="false" :height="200"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysUserService } from "~/services/manage-service/sys-user.service";

@Component({
  components: {}
})
export default class DeviceManage extends Vue {
  @Dependencies(SysUserService) private sysUserService: SysUserService;
  @Prop({
    required: true,
    type: Object
  })
  userInfo;

  private columns1: any;
  private deviceList: Array<any> = [];
  private id: any = "";

  created() {
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        width: this.$common.getOperateWidth(3),
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265ea2"
                },
                on: {
                  click: () => {
                    this.setLockState(row, 0);
                  }
                }
              },
              row.deviceStatus === 10002 ? "禁用设备" : "启用设备"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265ea2"
                },
                on: {
                  click: () => {
                    this.setDeviceValidate(row, 1);
                  }
                }
              },
              row.deviceValidate === 10002 ? "停用设备锁" : "启用设备锁"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265ea2"
                },
                on: {
                  click: () => {
                    this.setLockState(row, 2);
                  }
                }
              },
              "重置设备"
            )
          ]);
        }
      },
      {
        align: "center",
        title: "类型",
        key: "deviceType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceType));
        }
      },
      {
        align: "center",
        title: "设备是否启用",
        key: "deviceStatus",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceStatus));
        }
      },
      {
        align: "center",
        title: "设备锁是否启用",
        key: "deviceValidate",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceValidate));
        }
      }
    ];
  }

  mounted() {
    this.refreshUserLocks();
  }

  /**
   * 获取用户设备锁
   */
  refreshUserLocks() {
    this.sysUserService
      .findUserDevice([this.userInfo.id])
      .subscribe(
        data => (this.deviceList = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 设置设备状态
   */
  setLockState(row, type) {
    let deviceStatus = row.deviceStatus === 10002 ? 10003 : 10002;

    this.sysUserService
      .updateUserDevice(type, [row.id], deviceStatus)
      .subscribe(
        data => {
          this.$Message.success("设置成功");
          this.refreshUserLocks();
        },
        err => this.$Message.error(err.msg)
      );
  }

  
  /**
   * 设置锁状态
   */
  setDeviceValidate(row, type) {
    let deviceValidate = row.deviceValidate === 10002 ? 10003 : 10002;

    this.sysUserService
      .updateUserDevice(type, [row.id], deviceValidate)
      .subscribe(
        data => {
          this.$Message.success("设置成功");
          this.refreshUserLocks();
        },
        err => this.$Message.error(err.msg)
      );
  }
}
</script>
<style lang="less" scoped>
.component.device-manage {
  .form-name {
    margin-left: 20px;
  }
}
</style>
