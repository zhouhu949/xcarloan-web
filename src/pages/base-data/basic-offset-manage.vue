<!--冲抵项管理-->
<template>
  <section class="page basic-offset">
    <page-header title="冲抵项管理" hiddenPrint hiddenExport>
      <command-button class="command-add" label="新增冲抵项" @click="basicOffsetItemOperate(checkedBasicOffsetId,expenseDataSet)"></command-button>
    </page-header>
    <i-row type="flex" class="data-form">
      <i-row type="flex" style="flex:1;" >
        <i-col :span="4" style="padding:10px 0 10px 0;display:flex;flex-direction: column;">
          <div class="data-form-item">
            <div class="data-form-item-icon"></div>
            <span>冲抵策略</span>
            <span  @click="basicOffsetOperate()" class="data-form-item-add">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </span>
          </div>
          <div class="data-form-list" style="flex:1;">
            <div class="data-form-basicoffsetlist" v-for="item in basicOffsetDataSet" :key="item.id" :value="item.offsetName" :id="'basicOffset'+item.id" @click="onCheckedBasicOffset(item)">
              <span style="">{{item.offsetName}}</span>
              <small class="icon-box" :hidden="item.id !== checkedBasicOffsetId">
                <a href="#" class="el-icon-edit" @click.stop="basicOffsetOperate(item)">
                  <div style="display: inline-block;">
                    <i class="ivu-icon ivu-icon-edit"></i>
                  </div>
                </a>
                <a href="#" class="el-icon-minus" @click.stop="onDeleteBasicOffset(item)">
                  <div style="display: inline-block;">
                    <i class="ivu-icon ivu-icon-minus"></i>
                  </div>
                </a>
              </small>
            </div>
          </div>
        </i-col>
        <i-col class="command" :span="20">
          <data-box :columns="basicOffsetItemColumns" :data="basicOffsetItemDataSet"></data-box>
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
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { BasicExpenseService } from "~/services/manage-service/basic-expense.service";
import { BasicOffsetService } from "~/services/manage-service/basic-offset.service";
import { Layout } from "~/core/decorator";
import { Modal } from "iview";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class BasicOffsetManage extends Page {
  @Dependencies(BasicOffsetService)
  private basicOffsetService: BasicOffsetService;
  @Dependencies(BasicExpenseService)
  private basicExpenseService: BasicExpenseService;

  private basicOffsetDataSet: any = [];
  private expenseDataSet: any = [];
  private basicOffsetItemColumns: any;
  private basicOffsetItemDataSet: any = [];

  private checkedBasicOffsetId: number = 0;

  created() {
    //刷新数据
    this.refreshBasicOffset();

    //获取费用项
    this.findBasicExpenseByAuth();

    this.basicOffsetItemColumns = [
      {
        align: "center",
        editable: true,
        title: "费用项名称",
        key: "expenseName",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: "操作",
        width: 150,
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
  }

  /**
   * 选冲冲抵策略触发事件
   */
  onCheckedBasicOffset(item) {
    this.checkedBasicOffsetId = item.id;

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
  private findBasicExpenseByAuth() {
    this.basicExpenseService
      .findBasicExpenseByAuth()
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
      this.basicOffsetService.findBasicOffsetByAuth().subscribe(
        data => {
          this.basicOffsetDataSet = data;

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
      if (this.basicOffsetDataSet)
        //触发冲抵策略点击事件
        document
          .getElementById("basicOffset" + this.basicOffsetDataSet[0].id)
          .click();

      return val;
    });
  }
}
</script>
<style lang="less" scoped>
.page.basic-offset {
  display:flex;
  flex-direction: column;
  .data-form {
    margin-top: 10px;
    flex:1;
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