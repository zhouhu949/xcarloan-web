<!--用户列表-->
<template>
  <section class="component user-list">
    <data-form ref="user-search-form" hidden-date-search :model="model" @on-search="search" :page="pageService">
      <template slot="input">
        <i-form-item prop="username" label="用户名：">
          <i-input v-model="model.username" placeholder="请输入用户名"></i-input>
        </i-form-item>
        <i-form-item prop="realname" label="姓名：">
          <i-input v-model="model.realname" placeholder="请输入姓名"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="columns1" :data="userList" @on-page-change="search" :page="pageService" :noDefaultRow="true"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { SysRoleService } from "~/services/manage-service/sys-role.service";
import { PageService } from "~/utils/page.service";

@Component({
  components: {}
})
export default class UserList extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(SysRoleService) private sysRoleService: SysRoleService;
  @Prop() roleId;
  private columns1: any;
  private userList: Array<Object> = [];
  private model: any = {
    username: "",
    realname: "",
    roleId: ""
  };

  created() {
    this.columns1 = [
      {
        align: "center",
        type: "index",
        title: "序号",
        width: 60
      },
      {
        align: "center",
        title: "用户名",
        key: "userName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "姓名",
        key: "realName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "所属部门",
        key: "deptName",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "电话",
        key: "userPhone",
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "邮箱",
        key: "userEmail",
        minWidth: this.$common.getColumnWidth(4)
      }
    ];
  }

  mounted() {
    if (this.roleId) this.model.roleId = this.roleId
    this.search()
  }

  private search() {
    this.sysRoleService.queryUserByRoleIdPage(this.model, this.pageService).subscribe(
      data => this.userList = data,
      err => this.$Message.error(err.msg)
    );
  }

}
</script>
<style lang="less" scoped>
</style>
