<!--用户列表-->
<template>
  <section class="component user-list">
    <span class="title">用户名：</span>
    <i-input class="form-input" v-model="userListModel.username"></i-input>
    <span  class="title" >姓名：</span>
    <i-input class="form-input" v-model="userListModel.realname"></i-input>
    <i-button class="blue-button"  @click="search">搜索</i-button>
    <data-box :columns="columns1" :data="userList" @onPageChange="search" :page="pageService" :noDefaultRow="true"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { ManageService } from "~/services/manage-service/manage.service";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    DataBox
  }
})
export default class UserList extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(ManageService) private manageService: ManageService;
  @Prop() roleId;
  private columns1: any;
  private userList: Array<Object> = [];
  private userListModel: any = {
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
        minWidth: 60
      },
      {
        align: "center",
        title: "用户名",
        key: "userName"
      },
      {
        align: "center",
        title: "姓名",
        key: "realName"
      },
      {
        align: "center",
        title: "所属部门",
        key: "deptName",
        minWidth: 120
      },
      {
        align: "center",
        title: "电话",
        key: "userPhone"
      },
      {
        align: "center",
        title: "邮箱",
        key: "userEmail"
      }
    ];
  }
  getUserListByRole(roleId) {
    this.userListModel.roleId = roleId;
    this.manageService
      .getUserByRoleIdPage(this.userListModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  resetFrom() {
    this.userListModel.username = "";
    this.userListModel.realname = "";
  }
  search() {
    this.manageService
      .getUserByRoleIdPage(this.userListModel, this.pageService)
      .subscribe(
        data => {
          this.userList = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
}
</script>
<style lang="less" scoped>
    .component.user-list{
        .title{
            margin-left:20px;
        }
        .form-input{
            display:inline-block;
            width:12%;
        }
        .blue-button{
            margin-left:10px;
            background: #265ea2;
            color: #fff;
        }
    }

</style>
