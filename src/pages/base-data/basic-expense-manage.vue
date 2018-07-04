<template>
  <section class="page basic-expense-manage">
    <page-header title="费用项管理" hidden-print hidden-export>
      <command-button label="新增费用项" @click="basicExpenseOperate()"></command-button>
      <command-button label="复制模板" @click="copyTemplate()"></command-button>
    </page-header>
    <data-box :id="20" :columns="expenseColumns" :data="expenseDataSet" ref="databox"></data-box>
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import ModifyBasicExpense from "~/components/base-data/modify-basic-expense.vue";
import { Dependencies } from "~/core/decorator";
import { BasicExpenseService } from "~/services/manage-service/basic-expense.service";
import { Layout } from "~/core/decorator";
import { Modal } from "iview";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class BasicExpenseManage extends Page {
  @Dependencies(BasicExpenseService)
  private basicExpenseService: BasicExpenseService;

  private expenseColumns: any;
  private expenseDataSet: any = [];

  created() {
    this.expenseColumns = [
      {
        title: "操作",
        width: this.$common.getOperateWidth(2),
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          if (row.isSystem === 10003) {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.basicExpenseOperate(row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "i-button",
                {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.deleteBasicExpense(row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }

          return;
        }
      },

      {
        align: "center",
        editable: true,
        title: "费用项名称",
        key: "expenseName",
        minWidth: this.$common.getColumnWidth(5)
      },
      {
        align: "center",
        editable: true,
        title: "是否系统费用项",
        key: "isSystem",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row, columns, index }) =>
          h("p", {}, this.$filter.dictConvert(row.isSystem))
      },
      {
        align: "center",
        editable: true,
        title: "费用项编码",
        key: "expenseCode",
        minWidth: this.$common.getColumnWidth(4)
      }
    ];
  }

  mounted() {
    // 加载列表数据
    this.refreshBasicExpenseByOrg();
  }
  
  /**
   * keep-alive生命周期钩子函数
   */
  activated(){
    // 加载列表数据
    this.refreshBasicExpenseByOrg();
  }

  /**
   * 费用项维护
   * @param val 需要维护的费用项数据
   */
  private basicExpenseOperate(val?: Object) {
    this.$dialog.show({
      title: val ? "维护费用项" : "新增费用项",
      footer: true,
      onOk: modifyBasicExpense => {
        return modifyBasicExpense.submit().then(v => {
          if (v) this.refreshBasicExpenseByOrg();
          return v;
        });
      },
      render: h =>
        h(ModifyBasicExpense, {
          props: {
            expenseData: val
          }
        })
    });
  }

  /**
   * 复制模板
   */
  private copyTemplate() {
    this.basicExpenseService.copyTemplate().subscribe(
      val => {
        this.$Message.success("模板复制成功！");

        this.refreshBasicExpenseByOrg();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }

  /**
   * 删除费用项
   */
  deleteBasicExpense(row) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除此费用项吗？",
      onOk: () => {
        this.basicExpenseService.deleteBasicExpense(row.id).subscribe(
          val => {
            this.$Message.success("删除成功！");

            this.refreshBasicExpenseByOrg();
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
  private refreshBasicExpenseByOrg() {
    this.basicExpenseService
      .findBasicExpenseByOrg()
      .subscribe(
        data => (this.expenseDataSet = data),
        err => this.$Message.error(err.msg)
      );
  }
}
</script>

<style lang="less" scoped>
.page.basic-expense-manage {
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