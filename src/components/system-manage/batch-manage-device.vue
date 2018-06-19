<!--设备管理-->
<template>
  <section class="component batch-manage-device">
    <div class="command-button">
      <i-button @click="onKeyEnableDevice(true)">一键启用设备</i-button>
      <i-button @click="onKeyEnableDevice(false)">一键禁用设备</i-button>
      <i-button @click="onKeyEnableLock(true)">一键启用设备锁</i-button>
      <i-button @click="onKeyEnableLock(false)">一键停用设备锁</i-button>
      <i-button @click="onKeyResetDevice">一键重置设备</i-button>
    </div>
    <div class="equipment-table">
      <i-table :columns="columns1" :data="dataSet" ref="table" @on-selection-change="onSelectionChanged"></i-table>
    </div>
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
export default class BatchManageDevice extends Vue {
  @Dependencies(SysUserService) private sysUserService: SysUserService;
  @Prop() userIds;

  private columns1: any;
  private deviceIds: Array<Number> = [];
  private userName: String = "";
  private multipleSelect: Array<any> = [];

  // 设备状态数据表
  private dataSet: any = [];


  created() {
    this.columns1 = [
      {
        type: "selection",
        align: "center",
        width: 60
      },
      {
        align: "center",
        title: "用户名",
        key: "userName"
      },
      {
        align: "center",
        title: "设备类型",
        key: "deviceType",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceType));
        }
      },
      {
        align: "center",
        title: "设备锁是否启用",
        key: "deviceStatus",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceStatus));
        }
      },
      {
        align: "center",
        title: "设备是否启用",
        key: "deviceValidate",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$filter.dictConvert(row.deviceValidate));
        }
      }
    ];
  }

  mounted() {
    if (this.userIds) this.getData()
  }

  /**
   * 选择项发生改变
   */
  private onSelectionChanged(selecton) {
    this.multipleSelect = selecton
    this.deviceIds = (selecton || []).map(v => v.id)
  }

  /**
   * 一键启用/禁用设备
   */
  onKeyEnableDevice(enable) {
    if (!this.deviceIds.length) {
      this.$Message.error("请选择设备");
    } else {
      this.sysUserService.updateUserDevice(0, this.deviceIds, enable ? 10002 : 10003)
        .subscribe(
          data => {
            this.$Message.success("设置成功");
            this.getData()
          },
          err => this.$Message.error(err.msg)
        );
    }
  }
  /**
   * 一键启用/禁用设备
   */
  onKeyEnableLock(enable) {
    if (!this.deviceIds.length) {
      this.$Message.error("请选择设备");
    } else {
      this.sysUserService.updateUserDevice(1, this.deviceIds, enable ? 10002 : 10003)
        .subscribe(
          data => {
            this.$Message.success("设置成功");
            this.getData()
          },
          err => this.$Message.error(err.msg)
        );
    }
  }

  /**
   * 一键重置设备
   */
  onKeyResetDevice() {
    if (!this.deviceIds.length) {
      this.$Message.error("请选择设备");
    } else {
      this.sysUserService.updateUserDevice(2, this.deviceIds)
        .subscribe(
          data => {
            this.$Message.success("设置成功");
            this.getData()
          },
          err => this.$Message.error(err.msg)
        );
    }
  }

  /**
   * 获取用户设备状态数据
   */
  getData() {
    this.sysUserService.findUserDevice(this.userIds)
      .subscribe(
        data => this.dataSet = data,
        err => this.$Message.error(err.msg)
      );
  }

}
</script>
 <style lang="less" scoped>
.component .batch-manage-device {
  .command-button {
    .ivu-btn {
      background: #265ea2;
      color: #fff;
      margin: 5px 10px 10px;
    }
  }
}
</style>
