<template>
  <section class="component data-box-config">
    <i-table :columns="columns" :data="tableColumn"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Dialog from "~/core/dialog";
import { Prop, Emit, Model } from "vue-property-decorator";
import { Watch } from "vue-property-decorator";
import { UserService } from "~/services/manage-service/user.service";
import { Dependencies } from "~/core/decorator";
import clone from "clone";

@Component({
  components: {}
})
export default class DataBoxConfig extends Vue {
  @Dependencies(UserService) private userService: UserService;
  @Model("visibleChange") visible: boolean;

  @Emit("visibleChange")
  closeDialog(visible = false) {}

  @Watch("visible")
  onVisibleChange(value) {
    if (value) {
      this.remoteColumn = clone(this.configColumns);
      this.getTableColumn();
    }
  }
  @Prop() id;

  @Prop({
    default: () => []
  })
  dataColumns;

  @Prop({
    default: () => []
  })
  configColumns: Array<any>;

  private columns: any = [];
  private tableColumn: Array<any> = [];
  private remoteColumn: Array<any> = [];

  getTableColumn() {
    this.tableColumn = this.dataColumns
      .filter(
        x => x.key !== "index" && x.type !== "selection" && x.title !== "操作"
      )
      .map(x => {
        if (!x.editable) {
          x.check = true;
          x.sort = -1;
        } else {
          let target = this.remoteColumn.find(item => item.resoCode === x.key);
          if (target) {
            x.check = !!target.isCheck;
            x.sort = target.sort;
          }
        }
        return x;
      })
      .sort((x: any, y: any) => x.sort - y.sort);
  }

  /**
   * 交换排序项
   */
  switchSort(row, direction) {
    let target1, target2;
    let sortColumns = this.remoteColumn.sort(
      (x: any, y: any) => x.sort - y.sort
    );

    let index = sortColumns.findIndex(x => x.resoCode == row.key);

    if (direction < 0) {
      if (index <= 0) {
        return;
      }

      target1 = sortColumns[index];
      target2 = sortColumns[index - 1];
    } else {
      if (index >= this.remoteColumn.length) {
        return;
      }

      target1 = sortColumns[index];
      target2 = sortColumns[index + 1];
    }

    let temp = target1.sort;
    target1.sort = target2.sort;
    target2.sort = temp;

    this.getTableColumn();
  }

  mounted() {
    this.columns = [
      {
        align: "center",
        width: 90,
        type: "index",
        title: "序号"
      },
      {
        title: "字段",
        key: "title"
      },
      {
        title: "显示",
        key: "check",
        render: (h, { row, column, index }) => {
          return h("i-switch", {
            props: {
              value: row.check,
              disabled: !row.editable
            },
            on: {
              "on-change": value => {
                let target = this.remoteColumn.find(
                  x => x.resoCode === row.key
                );
                target.check = value;
                target.isCheck = value ? 1 : 0;
              }
            }
          });
        }
      },
      {
        title: "操作",
        key: "operation",
        render: (h, { row, column, index }) => {
          if (!row.editable) {
            return;
          }

          return h("div", {}, [
            h(
              "a",
              {
                on: {
                  click: () => {
                    this.switchSort(row, -1);
                  }
                },
                style: {
                  cursor: "pointer"
                }
              },
              [
                "上移 "
                // h("Icon", {
                //   props: {
                //     type: "gear-b",
                //     size: "20"
                //   }
                // })
              ]
            ),
            h(
              "a",
              {
                on: {
                  click: () => {
                    this.switchSort(row, 1);
                  }
                },
                style: {
                  cursor: "pointer"
                }
              },
              [
                " 下移"
                // h("Icon", {
                //   props: {
                //     type: "gear-b",
                //     size: "20"
                //   }
                // })
              ]
            )
          ]);
        }
      }
    ];

    this.remoteColumn = clone(this.configColumns);
    this.getTableColumn();
  }

  submit(callback) {
    this.userService
      .userAllocateListbox(this.id, this.remoteColumn)
      .subscribe(data => {
        this.closeDialog();
        callback();
      });
  }
}
</script>

<style lang="less" scoped>

</style>
