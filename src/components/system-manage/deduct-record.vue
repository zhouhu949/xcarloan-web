<!--划扣记录-->
<template>
  <section class="component deduct-record draw-record">
    <i-row class="form-row">
      <span>支付日期：</span>
      <i-date-picker class="form-picker" placeholder="起始日期"></i-date-picker>~
      <i-date-picker class="form-picker" placeholder="终止日期"></i-date-picker>
      <span class="form-periods">期数：</span>
      <i-input class="form-input" placeholder="请输入证件号码"></i-input>
      <i-select class="form-select" placeholder="全部交易状态">
        <i-option label="初始" value="初始" key="初始"></i-option>
        <i-option label="失败" value="失败" key="失败"></i-option>
        <i-option label="成功" value="成功" key="成功"></i-option>
        <i-option label="处理中" value="处理中" key="处理中"></i-option>
      </i-select>
      <i-button class="blue-button" @click="getDeductRecordList">搜索</i-button>
      <div class="command">
        <div class="command-item">
          <svg-icon iconClass="daochu"></svg-icon>
          <span>导出</span>
        </div>
      </div>
    </i-row>
    <div class="form-col-two">
      <span class="col-two-name">客户姓名：陈丽</span>
      <span class="col-tow-account">出账客户号：2017101001</span>
    </div>
    <data-box :columns="columns1" :data="data1" :noDefaultRow="true" @onPageChange="getDeductRecordList" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    DataGrid,
    DataGridItem
  } from "@zct1989/vue-component";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";

  @Component({
    components: {
      DataBox,
      DataGrid,
      DataGridItem,
      SvgIcon
    }
  })
  export default class DeductRecord extends Vue {
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private data1: Array < Object > = [];
    @Prop() row: Object;

    created() {
      this.columns1 = [{
          type: "index",
          title: "序号",
          align: "center",
          minWidth: 60
        },
        {
          title: "期数",
          key: "periods",
          align: "center",
          minWidth: 60
        },
        {
          title: "支付日期",
          key: "payDate",
          align: "center",
          minWidth: 120
        },
        {
          title: "出账卡号",
          key: "outAccountId",
          align: "center",
          minWidth: 170
        },
        {
          title: "支付银行",
          key: "payBank",
          align: "center"
        },
        {
          title: "支付金额",
          key: "payMoney",
          align: "center"
        },
        {
          title: "汇款交易单号",
          key: "remittanceDealId",
          align: "center"
        },
        {
          title: "交易状态",
          key: "dealStatus",
          align: "center"
        },
        {
          title: "失败原因",
          key: "failReason",
          align: "center"
        },
        {
          title: "操作人",
          key: "operator",
          align: "center"
        }
      ];

      this.data1 = [{
        periods: "12",
        payDate: "2017-12-01",
        outAccountId: "6227004171150038350",
        payBank: "建行",
        payMoney: "500",
        remittanceDealId: "610303201710100214",
        dealStatus: "成功",
        failReason: "",
        operator: "胡开甲"
      }];
    }
    /**
     * 获取划扣记录列表
     */
    getDeductRecordList() {}
    cancel() {}
    confirm() {}
  }

</script>
<style lang="less" scoped>
  .component.deduct-record.draw-record{
    .form-row {
      margin: 6px;
      .form-picker {
        display: inline-block;
        width: 10%;
      }
      .form-periods {
        margin-left: 10px;
      }
      .form-input {
        display: inline-block;
        width: 10%;
      }
      .form-select {
        margin-left: 10px;
        width: 16%;
      }
      .blue-button {
        margin-left: 10px;
        background: #265ea2;
        color: #fff;
      }
      .command {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        .command-item {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          color: #3367A7;
          span {
            font-size: 12px;
          }
        }
      }
    }
    .form-col-two{
        .col-two-name{
            margin-left:10px
        }
        .col-tow-account{
            float:right;
            margin-right:10px;
        }
    }
  }

</style>
