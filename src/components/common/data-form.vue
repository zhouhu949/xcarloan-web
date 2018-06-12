<template>
  <section class="component data-form">
    <div class="date-query-list row middle-span" v-if="!hiddenDateSearch">
      <div v-for="(value, key) in dateQueryTypes" :key="key" class="data-query-item" :class="{active:currentDateType===key}" @click="onSelectQueryDate(key)">
        <label>{{value}}</label>
      </div>
      <div class="row middle-span center-span collapse-icon" style="flex-basis:40px;" @click="onCollapseChange">
        <svg-icon :class="[showCollapseContext ? 'arrow-up':'arrow-down']" v-if="showCollapseIcon" iconClass="xiala"></svg-icon>
      </div>
    </div>
    <i-form ref="data-form" inline :rules="rules" label-position="left" :model="model">
      <div class="row" style="flex-wrap:nowrap;width:100%;">
        <div class="row middle-span col-span form-item-container" v-show="showCollapseContext||hiddenDateSearch">
          <slot name="input"></slot>
          <i-button v-if="!hiddenSearch" @click="onSubmitForm" class="search-button" style="vertical-align:top">搜索</i-button>
          <i-button v-if="!hiddenReset" @click="onResetForm" class="reset-button" style="vertical-align:top">重置</i-button>
          <div :style="{width:buttonWrap?'100%':'10px'}"></div>
          <slot name="button"></slot>
          <div class="col-span" v-show="showAppendContext">
          </div>
          <slot name="append">
          </slot>
        </div>
      </div>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch, Prop, Emit } from "vue-property-decorator";
import { Form } from "iview";
import { PageService } from "~/utils/page.service";

@Component({
  components: {}
})
export default class DataForm extends Vue {
  // 验证规则
  @Prop({})
  rules: any;
  // 数据模型
  @Prop({})
  model: any;
  // 数据模型
  @Prop({})
  page: PageService;
  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false
  })
  buttonWrap: boolean;
  //隐藏搜索按钮
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenSearch: boolean;
  // 隐藏重置按钮
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenReset: boolean;

  // 隐藏日期列表
  @Prop({
    type: Boolean,
    default: false
  })
  hiddenDateSearch: boolean;

  // 隐藏日期列表
  @Prop({
    type: String,
    default: "timeSearch"
  })
  dateProp: string;

  // 发送查询事件
  @Emit("on-search")
  emitSearch(option: { dateSearchType?: number } = {}) {}
  // 发送重置事件
  @Emit("on-reset") // 手动清空输入框
  emitReset() {}

  private showCollapseIcon: boolean = false;
  private showCollapseContext: boolean = false;
  private showAppendContext: boolean = false;
  private dateQueryTypes = {
    0: "昨日",
    1: "今日",
    2: "本周",
    // 3: "本月",
    // 4: "上月",
    // 5: "最近三月",
    // 6: "本季度",
    // 7: "本年"
  };
  private currentDateType = null;

  /**
   * 提交输入表单
   */
  onSubmitForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.validate(success => {
      if (!success) {
        return;
      }

      if (this.page) {
        this.page.reset();
      }
      this.currentDateType = undefined;
      this.model[this.dateProp] = undefined;
      this.emitSearch();
    });
  }

  /**
   * 重置输入表单
   */
  onResetForm() {
    let dataForm = <Form>this.$refs["data-form"];
    dataForm.resetFields();
    this.emitReset();
    this.currentDateType = undefined;
    this.model[this.dateProp] = undefined;
  }

  /**
   * 折叠状态改变
   */
  onCollapseChange() {
    if (this.showCollapseIcon) {
      this.showCollapseContext = !this.showCollapseContext;
    }
  }

  onSelectQueryDate(key) {
    this.onResetForm();
    this.currentDateType = key;
    this.model[this.dateProp] = key;
    this.emitSearch();
  }

  /**
   * 初始化
   */
  mounted() {
    if (this.$slots["input"] || this.$slots["button"]) {
      this.showCollapseIcon = true;
    }

    if (this.$slots["append"]) {
      this.showAppendContext = true;
    }
  }
}
</script>

<style lang="less" scoped>
.component.data-form {
  padding: 0 10px;

  .date-query-list {
    padding: 5px 0;
    .data-query-item {
      & > * {
        cursor: pointer;
      }
      height: 35px;
      line-height: 35px;
      padding: 0 15px;
      border-style: solid;
      border-width: 1px;
      border-color: transparent;
      &.active {
        border-color: #ccc;
        border-radius: 5px;
      }
      &:hover {
        color: rgb(56, 188, 250);
      }
    }
  }

  .arrow-down {
    transform: rotate(0deg);
    transition: transform ease-in 0.2s;
  }
  .arrow-up {
    transform: rotate(180deg);
    transition: transform ease-in 0.2s;
  }
  .collapse-icon {
    height: 40px;
  }
}
</style>

<style lang="less">
.component.data-form {
  .el-radio-group {
    padding-left: 10px;
  }

  .date-query-list {
    .ivu-btn {
      outline-color: red;
    }
  }

  .ivu-form {
    .form-item-container {
      & > * {
        margin: 0 5px;
      }

      .ivu-form-item {
        margin: 5px 10px;
      }

      .ivu-form-item-content {
        display: inline;
      }
    }
  }
}
</style>
