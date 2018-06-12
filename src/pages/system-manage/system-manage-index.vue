<template>
  <section class="page system-manage-index">
    <!--#EFF3F5-->
    <div class="data-form-menu">
      <div class="form-menu-item">
        <span>点击</span>
        <svg-icon iconClass="weiguanzhu" class="weiguanzhu"></svg-icon>
        <span>可加入常用菜单</span>
      </div>
    </div>
    <div v-for="item in system" :key="item.index">
      <div class="purchase-container">
        <div class="icon-container" :style="{background:item.color}">
          <svg-icon :iconClass="item.icon" class="icon-img"></svg-icon>
        </div>
        <div :style="{color:item.color}" class="iconName">{{item.iconName}}</div>
        <div class="vertical-line"></div>
        <div v-for="val in item.pageList" :key="val.pageName" class="item-pageList">
          <div class="page-list-page-name" @click="redirectToPage(val)">{{val.pageName}}</div>
          <div @click="val.isAttention=!val.isAttention" class="item-attention">
            <svg-icon iconClass="yiguanzhu" class="icon-yiguanzhu" v-show="val.isAttention"></svg-icon>
            <svg-icon iconClass="weiguanzhu" class="icon-weiguanzhu" v-show="!val.isAttention"></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Mutation
  } from "vuex-class";
  @Component({
    components: {
      SvgIcon
    }
  })
  export default class SystemManageIndex extends Vue {
    private system: Array < Object > = []
    @Mutation("openPage") openPage;
    redirectToPage(val) {
      this.openPage({
        title: val.pageName,
        path: val.path
      })
    }
    created() {
      this.system = [{
        index: 1,
        color: '#598AC5',
        iconName: '权限设置',
        icon: 'quanxianshezhi',
        pageList: [{
          pageName: '模块功能',
          isAttention: true,
          path: 'system-manage/power-config/module-function'
        }, {
          pageName: '角色维护',
          isAttention: false,
          path: 'system-manage/power-config/role-maintenance'
        }, {
          pageName: '机构与用户管理',
          isAttention: false,
          path: 'system-manage/power-config/org-user-manage'
        }]
      }, {
        index: 2,
        color: '#36B48C',
        iconName: '运维设置',
        icon: 'yunweishezhi',
        pageList: [{
          pageName: '订单状态变更',
          isAttention: false,
          path: 'system-manage/operation-config/order-status-change'
        }, {
          pageName: '客户还款撤销',
          isAttention: false,
          path: 'system-manage/operation-config/customer-repay-revert'
        }]
      }, {
        index: 3,
        color: '#47AAB6',
        iconName: '其他设置',
        icon: 'qitashezhi',
        pageList: [{
          pageName: '系统参数管理',
          isAttention: false,
          path: 'system-manage/operation-config/system-param-manage'
        }, {
          pageName: '系统备份',
          isAttention: false,
          path: 'system-manage/operation-config/system-backups'
        }, {
          pageName: '批量管理',
          isAttention: false,
          path: 'system-manage/operation-config/batch-manage'
        }, {
          pageName: '系统日志',
          isAttention: false,
          path: 'system-manage/operation-config/system-log-download'
        }]
      }]
    }
  }

</script>

<style lang="less" scoped>
  .page.system-manage-index{
    height: 846px;
    .data-form-menu{
    margin:0 auto;
    margin-top: 20px;
    width:96%;
    height:60px;
    background:#F5F5F5;
    margin-top:10px;
    border:1px solid #DDDDDD;
    
    .form-menu-item{
      font-size:14px;
      margin-top: 18px;
      margin-left: 57px;
      .weiguanzhu{
        font-size:16px;
    }
   } 
  }
  .purchase-container{
    width: 96%;
    height: 130px;
    background: #fff;
    margin: 30px auto;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    .vertical-line{
        width: 1px;
        height: 78px;
        background-color: #DDDDDD;
        position: relative;
        left: 60px;
    }
    .page-list-page-name{
    font-size: 14px;
    display: inline-block;
    }
    .page-list-page-name:hover{
    font-size: 14px;
    color: #265ea2;
    cursor: pointer;
    }
    .icon-name{
    font-size: 18px;
    margin-left: 10px; 
    }
    .icon-container{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 60px;
    .icon-img{
    color:#fff;
    font-size:50px;
    position:relative;
    left:6px;top:4px;
    }
    }
    .item-pageList{
    margin-left:100px;
    .item-attention{
      display:inline-block;
      cursor:pointer;
       .icon-yiguanzhu{
         font-size:16px;
         color:#F8B551
    }
       .icon-weiguanzhu{
       font-size:16px;
        }
       }
      }
    }

    }
</style>

