<!--设备管理-->
<template>
  <section class="equipment org-user-manage">
    <!-- <i-tabs @on-click="tabClick">
      <i-tab-pane label="PC端" name="pc"></i-tab-pane>
      <i-tab-pane label="移动端" name="app"></i-tab-pane>
    </i-tabs> -->
    <div class="equipment-button">
      <i-button @click="onKeyUserDevice" class="blue-button">一键启用设备</i-button>
      <i-button @click="onKeyForbidDevice" class="blue-button">一键禁用设备</i-button>
      <i-button @click="onKeyUserDeviceLock" class="blue-button">一键启用设备锁</i-button>
      <i-button @click="onKeyForbidDeviceLock" class="blue-button">一键停用设备锁</i-button>
      <i-button @click="onKeyResetDevice" class="blue-button">一键重置设备</i-button>
    </div>
    <div class="equipment-table">
      <i-table :columns="columns1" :data="deviceList" ref="table" @on-selection-change="currentSelect"></i-table>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { UserDeviceService } from "~/services/manage-service/user-device.service";

@Component({
  components: {
    DataBox
  }
})
export default class BatchManageDevice extends Vue {
  @Dependencies(UserDeviceService) private userDeviceService: UserDeviceService;
  private columns1: any;
  private deviceList: Array<any> = [];
  private userName: String = "";
  private multipleSelect: Array<any> = [];
  mounted() {}
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
      // {
      //   align: "center",
      //   title: "类型",
      //   key: "name"
      // },
      {
        align: "center",
        title: "是否禁用",
        key: "status",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.status === 0 ? "否" : "是");
        }
      },
      {
        align: "center",
        title: "设备锁状态",
        key: "validate",
        render: (h, { row, column, index }) => {
          return h("span", {}, row.validate === 0 ? "启用" : "停用");
        }
      }
    ];
  }
  /**
   * tab点击事件
   */
  tabClick(val) {
    console.log(val, 987);
  }
  /**
   * 一键启用设备
   */
  onKeyUserDevice() {
    if (!this.multipleSelect.length) {
      this.$Message.error("请选择设备");
    } else {
      let userIds = this.multipleSelect.map(v => v.userId);
      this.userDeviceService
        .enableDevice({
          userIds: userIds,
          userStatus: 0,
          userType: 414
        })
        .subscribe(
          data => {
            this.$Message.success("一键启用设备成功！");
            this.multipleSelect = [];

            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 一键禁用设备
   */
  onKeyForbidDevice() {
    if (!this.multipleSelect.length) {
      this.$Message.error("请选择设备");
    } else {
      let userIds = this.multipleSelect.map(v => v.userId);
      this.userDeviceService
        .disableDevice({
          userIds: userIds,
          userStatus: 1,
          userType: 414
        })
        .subscribe(
          data => {
            this.$Message.success("一键禁用设备成功！");
            this.multipleSelect = [];

            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 一键启用设备锁
   */
  onKeyUserDeviceLock() {
    if (!this.multipleSelect.length) {
      this.$Message.error("请选择设备");
    } else {
      let userIds = this.multipleSelect.map(v => v.userId);
      this.userDeviceService
        .enableDeviceLock({
          userIds: userIds,
          userValidate: 0,
          userType: 414
        })
        .subscribe(
          data => {
            this.$Message.success("一键启用设备锁成功！");
            this.multipleSelect = [];

            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 一键停用设备锁
   */
  onKeyForbidDeviceLock() {
    if (!this.multipleSelect.length) {
      this.$Message.error("请选择设备");
    } else {
      let userIds = this.multipleSelect.map(v => v.userId);
      this.userDeviceService
        .disableDeviceLock({
          userIds: userIds,
          userValidate: 1,
          userType: 414
        })
        .subscribe(
          data => {
            this.$Message.success("一键停用设备锁成功！");
            this.multipleSelect = [];

            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 一键重置设备
   */
  onKeyResetDevice() {
    if (!this.multipleSelect.length) {
      this.$Message.error("请选择设备");
    } else {
      let userIds = this.multipleSelect.map(v => v.userId);
      this.userDeviceService
        .resetDevice({
          userIds: userIds,
          userType: 414
        })
        .subscribe(
          data => {
            this.$Message.success("一键重置设备成功！");
            this.multipleSelect = [];
            this.$emit("close");
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  makeData(row) {
    console.log(row, 333);
    let ids = row.map(v => v.id);
    console.log(ids, 898988);
    this.userDeviceService
      .getUserDevice({
        ids: ids
      })
      .subscribe(
        data => {
          this.deviceList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 批量管理设备确定
   */
  confirmBatchMange() {}
  currentSelect(val) {
    console.log(val, 7778);
    this.multipleSelect = val;
  }
}
</script>
 <style lang="less" scoped>
    .equipment.org-user-manage{
      .equipment-button{
          display:flex;
          justify-content:space-around;
          margin:10px 0;
          .blue-button{
            background: #265ea2;
            color: #fff;
          }
      }
      .equipment-table{
          width:100%;
          height:400px;
          border:1px solid #dddddd;
          overflow:auto;
      }

    }

</style>
