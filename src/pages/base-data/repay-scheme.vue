<template>
  <section class="page repay-scheme">
    <page-header title="还款方案管理" hidden-print hidden-export>
      <div v-if="currentNode">
        <command-button label="发布" v-if="!currentNode._disabled" @click="publish"></command-button>
        <command-button label="取消发布" v-else @click="unPublish"></command-button>
      </div>
      <command-button label="新增方案" @click="addRepayScheme"></command-button>
    </page-header>

    <i-row>
      <i-col :span="6" class="scheme-table-cell">
        <data-tree :data="treeData" showEdit :editConfig="editConfig" @on-select-change="val => currentNode = val" @on-edit="onEditClick" @on-delete="onDeleteClick"></data-tree>
      </i-col>
      <i-col :span="18" class="scheme-table-cell">
        <scheme-detail v-if="isRefreshDetails" :schemeId="schemeId" ref="schemeDetail"></scheme-detail>
      </i-col>
    </i-row>

  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import DataTree from "~/components/common/data-tree.vue";
import { EditType } from "~/config/enum.config";
import { RepaySchemeService } from "~/services/manage-service/basic-repay-scheme.service";
import ModifySchemeInfo from "~/components/base-data/modify-scheme-info.vue";
import SchemeDetail from "~/components/base-data/scheme-detail.vue";

@Layout("workspace")
@Component({
  components: {
    DataTree,
    SchemeDetail
  }
})
export default class RepayScheme extends Page {
  @Dependencies(RepaySchemeService)
  private repaySchemeService: RepaySchemeService;

  // 编辑类型
  private readonly editConfig = [EditType.MODIFY, EditType.DELETE];
  private treeData: Array<any> = [];
  // 当前选中项
  private currentNode: any = null;

  private dataType: Array<any> = [];
  private checkId: Number = 1;
  private item: any;
  private dialogTitle: String;
  private isRelease: Boolean = false;
  private isRefreshDetails: boolean = true;

  get schemeId(): Number {
    return this.currentNode && this.currentNode.id;
  }

  mounted() {
    this.refreshData();
  }
  /**
   * 获取当前用户下组织机构下所有的还款方案
   */
  refreshData() {
    // 初始化页面处理
    this.isRefreshDetails = this.currentNode ? false : true;

    this.repaySchemeService.getAllBasicSchemeByOrgId().subscribe(
      val => {
        this.treeData = val.map(v => {
          return {
            title: v.schemeName,
            id: v.id,
            pid: 0,
            _disabled: v.schemeStatus === 10057 // 禁止编辑
          };
        });

        if (this.currentNode) {
          this.currentNode = this.treeData.filter(
            v => v.id === this.currentNode.id
          )[0];

          // 动态刷新页面
          this.isRefreshDetails = true;
        }
      },
      err => this.$Message.error(err.msg)
    );
  }

  /**
   * 新增还款方案
   */
  addRepayScheme() {
    this.$dialog.show({
      title: "新增还款方案",
      footer: true,
      onOk: addScheme => {
        return addScheme.submit().then(v => {
          if (v) this.refreshData();
          return v;
        });
      },
      render: h => h(ModifySchemeInfo)
    });
  }
  /**
   * 编辑还款方案
   */
  onEditClick(data) {
    this.$dialog.show({
      title: "编辑还款方案",
      footer: true,
      onOk: modifyScheme => {
        return modifyScheme.submit().then(v => {
          if (v) {
            let schemeDetail = this.$refs.schemeDetail as SchemeDetail
            schemeDetail.getSchemeInfo()
            this.refreshData()
          }
          return v;
        });
      },
      render: h =>
        h(ModifySchemeInfo, {
          props: {
            id: this.schemeId
          }
        })
    });
  }
  /**
   * 删除还款方案
   */
  onDeleteClick(data) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除此还款方案吗？",
      onOk: () => {
        this.repaySchemeService.deleteRepayScheme(data.id).subscribe(
          () => {
            this.$Message.success("删除成功！");
            this.refreshData();
          },
          err => {
            this.$Message.error(err.msg);
          }
        );
      }
    });
  }

  /**
   * 取消发布还款方案
   */
  unPublish() {
    this.$Modal.confirm({
      content: `确定取消发布此还款方案吗？`,
      onOk: () => {
        this.repaySchemeService
          .releaseRepayScheme(this.schemeId, 10056)
          .subscribe(
            val => {
              this.$Message.success(`取消成功！`);
              this.refreshData();
            },
            err => this.$Message.error(err.msg)
          );
      }
    });
  }

  /**
   * 发布还款方案
   */
  publish() {
    this.repaySchemeService.releaseRepayScheme(this.schemeId, 10057).subscribe(
      val => {
        this.$Message.success(`发布成功！`);
        this.refreshData();
      },
      err => this.$Message.error(err.msg)
    );
  }
}
</script>

<style lang="less" scoped>
.page.repay-scheme {
  .scheme-table-cell {
    border: solid 1px #ddd;
    min-height: 850px;
  }
}
</style>