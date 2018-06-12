<template>
  <section class="component work-tab full">
    <Tabs type="card" v-model="currentPage" closable :animated="false" @on-tab-remove="closePage">
      <div slot="extra" class="extra-container">
        <i-icon type="close" @click.native="closeAllTabs"></i-icon>
      </div>
      <TabPane v-for="page in pageList" :key="page.path" :label="page.resoname" :name="page.path" :closable="page.path !== 'home'">
        <component ref="pages" :is="getComponentName(page.path)"></component>
      </TabPane>
    </Tabs>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { CommonService } from "~/utils/common.service";
import Home from "~/pages/home.vue";
import appConfig from "~/config/app.config";
@Component({
  name: "work-tab",
  components: {
    Home
  },
  beforeCreate() {
    // 动态导入组件
    let importComponents = path => {
      if (path) {
        let componentName = CommonService.getComponentName(path);
        let components = this.$options.components;
        if (components) {
          components[componentName] = () => import("~/pages/" + path);
        }
      }
    };
    appConfig.registerPageList.forEach(importComponents);
  }
})
export default class WorkTab extends Vue {
  @State("currentPage") _currentPage: any; // 当前page
  @State("pageList") pageList: Array<any>;
  @Mutation("openPage") openPage: Function;
  @Mutation("closePage") closeTab: Function;
  @Mutation("closeAllPage") closeAllPage: Function;
  private getComponentName = CommonService.getComponentName;

  /**
   * 获取当前页面路径
   */
  get currentPage() {
    return this._currentPage;
  }

  /**
   * 设置当前页面路径
   */
  set currentPage(path) {
    this.openPage(path);
  }

  closeAllTabs(path) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定关闭所有已打开页面吗？",
      onOk: () => {
        this.closeAllPage(path);
      }
    });
  }
  /**
   * 监听当前页面变化
   */
  @Watch("currentPage")
  onPageChanged(value: string) {
    let components = <Array<Vue>>this.$refs["pages"];

    let getTargetComponent = () => {
      return components.find(x => x.$options.name === this.getComponentName(value));
    }

    let component = getTargetComponent();

    // 处理页面切换回调
    if (
      component &&
      component.$options.activated &&
      component.$options.activated.length > 0
    ) {
      let activated = component.$options.activated[0];
      activated.call(component);
    }
    let page = this.pageList.find(x => x.path === value) || {};
    // 处理页面传参情况
    if (page.params) {
      this.$nextTick(() => {
        setTimeout(() => {
          let component = getTargetComponent();
          if (component && component["loaded"]) {
            let loaded = component["loaded"];
            loaded.call(component, Object.assign({}, page.params));
            page.params = null;
          }
        }, 100)
      });
    }
  }

  /**
   * 关闭页面
   */
  closePage(path) {
    this.closeTab(path);
  }
}
</script>
<style lang="less" scoped>
.component.work-tab {
  .extra-container {
    padding: 7px 10px;
    cursor: pointer;
  }
}
</style>


<style lang="less">
.component.work-tab {
  & > .ivu-tabs {
    height: 100%;
    @tab-bar-height: 45px;
    & > .ivu-tabs-bar {
      background: #fff;
      border-bottom: 1px solid #dedede;
      height: @tab-bar-height;
      padding: 10px 5px;
      margin-bottom: 0;

      .ivu-tabs-nav-container {
        background: #fff;

        .ivu-tabs-tab {
          min-width: 100px;
          text-align: center;
        }
      }
    }
    & > .ivu-tabs-content {
      height: calc(~"100% - @{tab-bar-height}");
      padding: 10px;
      overflow: auto;
      & > .ivu-tabs-tabpane {
        height: 100%;
        min-height: 100%;
      }
    }
  }
}
</style>
