<!--设备管理-->
<template>
  <section class="component device-manage">
    <span class="form-name" >当前用户名：{{this.userName}}</span>
    <i-table :columns="columns1" :data="deviceList"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { LoginService } from "~/services/manage-service/login.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataBox
  }
})
export default class DeviceManage extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  private columns1: any;
  private deviceList: Array<any> = [];
  private userName: String = "";
  private id:any = '';
  mounted() {}
  created() {
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        width: 300,
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
                    //启用or禁用设备
                    this.loginService
                      .disableDevice({
                        userIds: [row.userId],
                        userType: row.type,
                        userStatus: row.status === 0 ? 1 : 0
                      })
                      .subscribe(
                        data => {
                          this.$Message.success("操作成功！");
                          this.getDeviceList();
                        },
                        ({ msg }) => {
                          this.$Message.error(msg);
                        }
                      );
                  }
                }
              },
              row.status === 0 ? "禁用设备" : "启用设备"
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
                    //停用设备锁or启用设备锁
                    this.loginService
                      .enableDeviceKey({
                        userIds: [row.userId],
                        userType: row.type,
                        userValidate: row.validate === 0 ? 1 : 0
                      })
                      .subscribe(
                        data => {
                          this.$Message.success("操作成功！");
                          this.getDeviceList();
                        },
                        ({ msg }) => {
                          this.$Message.error(msg);
                        }
                      );
                  }
                }
              },
              row.validate === 0 ? "停用设备锁" : "启用设备锁"
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
                    // 重置设备
                    this.loginService
                      .resetDevice({
                        userIds: [row.userId],
                        userType: row.type
                      })
                      .subscribe(
                        data => {
                          this.$Message.success("重置成功！");
                        },
                        ({ msg }) => {
                          this.$Message.error(msg);
                        }
                      );
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
        key: "type",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.type));
        }
      },
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
  makeData(row) {
    this.userName = row.userUsername;
    this.id = row.id
    this.getDeviceList();
  }
  getDeviceList() {
    // let userId = this.$store.state.userData.id;
    this.loginService
      .getUserDevice({
        userId: this.id
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
  moveOut(row) {}
}
</script>
<style lang="less" scoped>
    .component.device-manage{
        .form-name{
            margin-left:20px;
        }
    }

</style>
