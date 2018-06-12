<template>
  <section class="page home-page">
    <div class="row command">
      <div class="col-span">
        <!--左上-->
        <div class="command-left">
          <div class="command-left-up">
            <div class="command-left-up-icon"></div>
            <span>快速上手</span>
            <div class="command-left-up-item">
              <div class="quick-start-container" @click="financeLeaseApply">
                <div class="quick-start">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quick-text">抵押贷款申请</div>
              </div>
              <div class="quick-start-container" @click="customerAccountClick">
                <div class="quick-start">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quick-text">客户开户</div>
              </div>

              <div class="quick-start-container" @click="customerSignClick">
                <div class="quick-start">
                  <svg-icon class="svg" iconClass="tianxie"></svg-icon>
                </div>
                <div class="quick-text">客户签约</div>
              </div>
            </div>
          </div>
        </div>
        <!--左下-->
        <div class="command-down">
          <zmap></zmap>
        </div>
      </div>
      <!--右边待办事项 洒洒水-->
      <div class="command-right" style="min-width:250px">
        <div class="container">
          <div class="command-right-icon"></div>
          <span>待办事项</span>
          <div class="command-right-content" v-for="item in waitToHandle" :key="item.index">
            <div class="row between-span command-right-content-item">
              <div class="command-right-content-item-code">{{$dict.getDictName(item.itemCode)}}</div>
              <i-button class="command-right-content-item-value" type="text" @click="pageToOrderQuery">{{item.itemValue}}</i-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Test2 from "./test2.vue";
import SvgIcon from "~/components/common/svg-icon.vue";
import Map from "~/components/common/map.vue";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { Layout } from "~/core/decorator";
import { Mutation } from "vuex-class";
import { Dependencies } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataGrid,
    DataGridItem,
    SvgIcon,
    zmap: Map
  }
})
export default class Home extends Vue {
  private waitToHandle: any = [];
  @Mutation openPage;


  pageToOrderQuery() {
    this.openPage("purchase/purchase-query/order-query");
  }
  financeLeaseApply() {
    this.openPage( "purchase/mortgage/personal-mortgage-application");
  }
  customerAccountClick() {
    this.openPage("purchase/purchase-manage/open-account");
  }
  customerSignClick() {
    this.openPage("purchase/purchase-manage/customer-sign")
  }
}
</script>

<style lang="less">
.home-page {
  .body {
    border: none;
  }
}

.page.home-page {
  .command {
    width: 100%;
    background: #eff3f5;
    display: flex;
    justify-content: space-around;
    .command-left {
      width: 100%;
      border: 1px solid #dddddd;
      height: 200px;
      background: #fff;
      .command-left-up {
        margin-top: 20px;
        margin-left: 20px;
        span {
          margin-left: 10px;
          font-size: 16px;
          color: #333333;
          position: relative;
          bottom: 3px;
        }
        .command-left-up-icon {
          width: 7px;
          height: 18px;
          background: #265ea2;
          display: inline-block;
        }
        .command-left-up-item {
          width: 600px;
          height: 145px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .quick-start-container {
            text-align: center;
            cursor: pointer;
            .quick-start {
              background: #598ac5;
              border-radius: 50%;
              width: 56px;
              height: 56px;
              display: flex;
              align-items: center;
              justify-content: center;
              .svg {
                font-size: 30px;
                color: #fff;
              }
            }
            .quick-text {
              margin-top: 6px;
            }
            .quick-text:hover {
              color: #265ea2;
            }
          }
        }
      }
    }
    .command-down {
      width: 100%;
      border: 1px solid #dddddd;
      height: 630px;
      margin-top: 10px;
      background: #fff;
      padding: 10px;
    }
    .command-right {
      border: 1px solid #dddddd;
      height: 840px;
      background: #fff;
      .container {
        margin: 10px;
      }
      .command-right-icon {
        width: 7px;
        height: 18px;
        background: #265ea2;
        display: inline-block;
      }
      span {
        margin-left: 10px;
        font-size: 16px;
        color: #333333;
        position: relative;
        bottom: 3px;
      }
      .command-right-content {
        min-width: 200px;
        width: 100%;
        height: 42px;
        margin-top: 10px;
        background: #f5f5f5;
        text-align: center;
        line-height: 12px;
        .command-right-content-item {
          padding-top: 6px;
          flex-wrap: nowarp;
          .command-right-content-item-code {
            font-size: 12px;
            color: #666666;
            line-height: 35px;
            margin-left: 45px;
            float: left;
          }
          .command-right-content-item-value {
            color: #265ea2;
            font-size: 14px;
            float: right;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

.mapContainer {
  margin: 10px;
  width: 98%;
  height: 98%;
  background-repeat: no-repeat !important;
  background-size: 100% 98%;
  background-image: url("/static/images/common/china.png");
}
</style>
