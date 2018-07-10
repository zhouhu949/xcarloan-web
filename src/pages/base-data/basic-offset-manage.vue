<!--冲抵项管理-->
<template>
  <section class="page basic-offset">
    <page-header title="冲抵项管理" hiddenPrint hiddenExport>
      <div v-if="checkedBasicOffsetId">
        <command-button class="command-add" label="取消发布" @click="cancelRelease" v-show="isPublish"></command-button>
        <command-button class="command-add" label="发布" @click="publish" v-show="!isPublish"></command-button>
      </div>
      <command-button class="command-add" label="新增冲抵项" @click="basicOffsetItemOperate(checkedBasicOffsetId,expenseDataSet)"></command-button>
    </page-header>
    <i-row type="flex" class="data-form">
      <i-row type="flex" style="flex:1;">
        <i-col :span="4" style="padding:10px 0 10px 0;display:flex;flex-direction: column;">
          <div class="data-form-item">
            <div class="data-form-item-icon"></div>
            <span>冲抵策略</span>
            <span @click="basicOffsetOperate()" class="data-form-item-add">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </span>
          </div>
          <data-tree style="flex:1;" :data="treeData" showEdit :editConfig="editConfig" @on-select-change="onCheckedBasicOffset" @on-edit="basicOffsetOperate" @on-delete="onDeleteBasicOffset"></data-tree>
        </i-col>
        <i-col class="command" :span="20">
          <data-box :columns="basicOffsetItemColumns" :data="basicOffsetItemDataSet" v-show="isPublish"></data-box>
          <data-box :columns="basicOffsetItemColumnsNon" :data="basicOffsetItemDataSet" v-show="!isPublish"></data-box>
        </i-col>
      </i-row>
    </i-row>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import ModifyBasicOffset from "~/components/base-data/modify-basic-offset.vue";
import ModifyBasicOffsetItem from "~/components/base-data/modify-basic-offset-item.vue";
import DataTree from "~/components/common/data-tree.vue";
import { EditType } from "~/config/enum.config";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { BasicExpenseService } from "~/services/manage-service/basic-expense.service";
import { BasicOffsetService } from "~/services/manage-service/basic-offset.service";
import { Layout } from "~/core/decorator";
import { Modal } from "iview";
import { Object } from "core-js";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    DataTree
  }
})
export default class BasicOffsetManage extends Page {
  @Dependencies(BasicOffsetService)
  private basicOffsetService: BasicOffsetService;
  @Dependencies(BasicExpenseService)
  private basicExpenseService: BasicExpenseService;

  private treeData: Array<any> = [];
  private expenseDataSet: any = [];
  private basicOffsetItemColumns: Array<any>;
  private basicOffsetItemColumnsNon: Array<any>;
  private basicOffsetItemDataSet: Array<any> = [];

  private checkedBasicOffsetId: number = 0;
  private isPublish: boolean = false;

  // 编辑类型
  private readonly editConfig = [EditType.MODIFY, EditType.DELETE];

  created() {
    this.basicOffsetItemColumns = [
      {
        align: "center",
        editable: true,
        title: "费用项名称",
        key: "expenseName",
        minWidth: this.$common.getColumnWidth(3)
      }
    ];

    this.basicOffsetItemColumnsNon = [
      {
        align: "center",
        editable: true,
        title: "费用项名称",
        key: "expenseName",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: "操作",
        width: this.$common.getOperateWidth(1),
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "div",
              {
                on: {
                  click: () => {
                    this.onMoveUp(row);
                  }
                },
                style: {
                  cursor: "pointer",
                  color: "#265EA2",
                  display: "inline-block",
                  "margin-right": "5px"
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "arrow-up-b",
                    size: "20"
                  }
                })
              ]
            ),
            h(
              "div",
              {
                on: {
                  click: () => {
                    this.onMoveDown(row);
                  }
                },
                style: {
                  cursor: "pointer",
                  color: "#265EA2",
                  display: "inline-block",
                  "margin-right": "5px"
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "arrow-down-b",
                    size: "20"
                  }
                })
              ]
            ),
            h(
              "div",
              {
                on: {
                  click: () => {
                    this.onDeleteBasicOffsetItem(row);
                  }
                },
                style: {
                  cursor: "pointer",
                  color: "#265EA2",
                  display: "inline-block"
                }
              },
              [
                h("Icon", {
                  props: {
                    type: "minus-round",
                    size: "20"
                  }
                })
              ]
            )
          ]);
        }
      }
    ];
  }

  mounted() {
    //刷新数据
    this.refreshBasicOffset();
    //获取费用项
    this.findBasicExpenseByOrg();
  }

  /**
   * keep-alive生命周期钩子函数
   */
  activated() {
    //刷新数据
    this.refreshBasicOffset();
    //获取费用项
    this.findBasicExpenseByOrg();
  }

  /**
   * 冲抵策略维护
   * @param val 需要维护的冲抵策略数据
   */
  private basicOffsetOperate(val?: Object) {
    this.$dialog.show({
      title: val ? "维护冲抵策略" : "新增冲抵策略",
      footer: true,
      onOk: modifyBasicOffset => {
        return modifyBasicOffset.submit().then(v => {
          if (v) this.refreshBasicOffset();
          return v;
        });
      },
      render: h =>
        h(ModifyBasicOffset, {
          props: {
            offsetData: val
          }
        })
    });
  }

  /**
   * 发布冲抵策略
   */
  private publish() {
    if (!this.checkedBasicOffsetId)
      return this.$Message.warning("请选择冲抵策略！");
    this.basicOffsetService.publishOffset(this.checkedBasicOffsetId).subscribe(
      val => {
        this.$Message.success("发布成功！");

        //刷新列表数据
        this.refreshBasicOffset();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 取消发布冲抵策略
   */
  private cancelRelease() {
    if (!this.checkedBasicOffsetId)
      return this.$Message.warning("请选择冲抵策略！");
    this.basicOffsetService
      .cancelPublishOffset(this.checkedBasicOffsetId)
      .subscribe(
        val => {
          this.$Message.success("取消发布成功！");

          //刷新列表数据
          this.refreshBasicOffset();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  /**
   * 冲抵项维护
   * @param offsetId 冲抵策略Id
   * @param expense 费用项列表
   * @param val 需要维护的冲抵项数据
   */
  private basicOffsetItemOperate(
    offsetId: number,
    expense: Array<Object>,
    val?: Object
  ) {
    // 判断是否选中冲抵策略
    if (offsetId) {
      this.$dialog.show({
        title: val ? "维护冲抵项" : "新增冲抵项",
        footer: true,
        onOk: modifyBasicOffsetItem => {
          return modifyBasicOffsetItem.submit().then(v => {
            if (v) this.getBasicOffsetItemList(this.checkedBasicOffsetId);
            return v;
          });
        },
        render: h =>
          h(ModifyBasicOffsetItem, {
            props: {
              offsetId: offsetId,
              offsetItemData: val,
              expenseData: expense
            }
          })
      });
    } else {
      this.$Message.warning("请选择冲抵策略！");
    }
  }

  /**
   * 选冲冲抵策略触发事件
   */
  onCheckedBasicOffset(item) {
    this.checkedBasicOffsetId = item.id;
    // 10207 未发布 10208 已发布
    this.isPublish = item.offsetStatus === 10208;

    //刷新冲抵项列表数据
    this.getBasicOffsetItemList(item.id);
  }

  /**
   * 删除冲抵策略事件
   * @param basicOffset 冲抵策略
   */
  onDeleteBasicOffset(basicOffset) {
    if (basicOffset) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除此冲抵配置吗？",
        onOk: () => {
          this.basicOffsetService.deleteBasicOffset(basicOffset.id).subscribe(
            val => {
              this.$Message.success("删除成功！");

              //刷新列表数据
              this.refreshBasicOffset();
            },
            ({ msg }) => {
              this.$Message.error(msg);
            }
          );
        }
      });
    }
  }

  /**
   * 上移冲抵项
   * @param basicOffsetItem
   */
  onMoveUp(basicOffsetItem) {
    this.basicOffsetService.moveUp(basicOffsetItem.id).subscribe(
      val => {
        //刷新列表数据
        this.getBasicOffsetItemList(this.checkedBasicOffsetId);
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 下移冲抵项
   * @param basicOffsetItem
   */
  onMoveDown(basicOffsetItem) {
    this.basicOffsetService.moveDown(basicOffsetItem.id).subscribe(
      val => {
        //刷新列表数据
        this.getBasicOffsetItemList(this.checkedBasicOffsetId);
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 删除冲抵项
   * @param basicOffsetItem
   */
  onDeleteBasicOffsetItem(basicOffsetItem) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除此冲抵项吗？",
      onOk: () => {
        this.basicOffsetService
          .deleteBasicOffsetItem(basicOffsetItem.id)
          .subscribe(
            val => {
              this.$Message.success("删除成功！");

              this.getBasicOffsetItemList(this.checkedBasicOffsetId);
            },
            ({ msg }) => {
              this.$Message.error(msg);
            }
          );
      }
    });
  }

  /**
   * 获取自己所能操作的所有费用项
   */
  private findBasicExpenseByOrg() {
    this.basicExpenseService
      .findBasicExpenseByOrg()
      .subscribe(
        data => (this.expenseDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }

  /**
   * 根据权限查询所有冲抵配置
   */
  getBasicOffsetByAuth() {
    return new Promise((resolve, reject) => {
      this.basicOffsetService.findBasicOffsetByOrg().subscribe(
        data => {
          this.treeData = data.map(v => {
            return {
              title: v.offsetName,
              id: v.id,
              pid: 0,
              // 组织机构Id
              orgId: v.orgId,
              // 费用项名称
              offsetName: v.offsetName,
              // 费用项类型
              offsetType: v.offsetType,
              // 冲抵策略状态
              offsetStatus: v.offsetStatus,
              // 备注
              remark: v.remark,
              // 禁止编辑
              _disabled: v.offsetStatus === 10208
            };
          });
          resolve(true);
        },
        err => {
          this.$Message.error(err.msg);

          reject(err);
        }
      );
    });
  }

  /**
   * 根据冲抵策略获取冲抵项列表
   */
  getBasicOffsetItemList(offsetId) {
    this.basicOffsetService.findBasicOffsetItemList(offsetId).subscribe(val => {
      this.basicOffsetItemDataSet = val;
    });
  }

  /**
   * 刷线列表
   */
  refreshBasicOffset() {
    this.getBasicOffsetByAuth().then(val => {
      return val;
    });
  }
}
</script>
<style lang="less" scoped>
.page.basic-offset {
  display: flex;
  flex-direction: column;
  .data-form {
    margin-top: 10px;
    flex: 1;
    .data-form-item {
      width: 100%;
      height: 30px;
      border: 1px solid #dddd;
      line-height: 30px;
      font-size: 16px;
      .data-form-item-icon {
        width: 4px;
        height: 15px;
        background: rgb(38, 94, 162);
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
      .data-form-item-add {
        float: right;
        margin-right: 12px;
        color: #265ea2;
      }
    }
    .command {
      .command-item {
        width: 20%;
      }
      .command-add {
        margin-left: 10px;
        position: absolute;
        right: 13px;
      }
    }
    .data-form-list {
      width: 100%;
      height: 600px;
      border: 1px solid #dddd;
      border-top: 0;
      overflow: auto;
      .data-form-basicoffsetlist {
        cursor: pointer;
        width: 100%;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        position: relative;
        margin: auto;
      }
    }
  }
}

.basicoffsetCss {
  background: #e4f4fa;
}
</style>
<style lang="less">
.page.basic-offset {
  .toViewModalClass {
    .ivu-modal-footer {
      display: none !important;
    }
  }
  .ivu-select.ivu-select-single.ivu-select-small,
  .ivu-select-single .ivu-select-selection {
    width: 80px !important;
    display: inline-block;
  }
}
</style>