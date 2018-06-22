<template>
  <section class="component work-menu row">
    <i-menu ref="menu" theme="light" @on-select="onSelectMenuItem" accordion v-show="isExpand" @on-open-change="onOpenChange">
      <work-menu-item :level="1" v-for="node  in  menuList" :key="node.id" :data="node"></work-menu-item>
    </i-menu>
    <div class="expand row middle-span">
      <div class="button" @click="isExpand=!isExpand">
        <i-icon class="icon" :class="{expand:isExpand}" type="arrow-right-b"></i-icon>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import WorkMenuItem from "~/components/workspace/work-menu-item.vue";

@Component({
  components: {
    WorkMenuItem
  }
})
export default class WorkMenu extends Vue {
  @State pageList;
  @Mutation openPage;
  @State menuResource;
  @State currentPage;
  private currentMenuItem: any = null;
  private showMenuPoptip = false;
  private isExpand = true;
  updatePoptipState(state) {
    this.showMenuPoptip = state;
  }

  private menuList = [];

  @Watch("menuResource", { immediate: true })
  onMenuResourceChange() {
    let menuData = this.menuResource.map(v => Object.assign({}, v))
    this.createMenuList(menuData);
  }

  @Watch("currentPage")
  onCurrentPageChange(value) { }

  createMenuList(menuData) {
    // 生成菜单项
    let createMenus = item => {
      let children = menuData
        .filter(x => x.resourcePid === item.id)
        .map(x => {
          return createMenus(Object.assign({}, x));
        })
        .sort((x: any, y: any) => x.resourceOrder - y.resourceOrder);

      if (children && children.length) {
        item.children = children;
      }
      return item;
    };
    // 过滤菜单项
    let menus = menuData
      .filter(x => x.resourceFileType === 10029)
      .sort((x: any, y: any) => x.resourceOrder - y.resourceOrder)
      .map(createMenus);
    this.menuList = menus;
  }

  onSelectMenuItem(path) {
    if (this.currentPage === path) {
      return;
    }

    // 打开页面
    if (path) {
      this.openPage(path);
    }
  }
  
  /**
   * 菜单打开状态变化监听
   */
  onOpenChange(names) {
    if (names.length > 1) {
      let menu = this.$refs['menu'] as any
      menu.openedNames = names.slice(-1)
      menu.updateOpened()
    }
  }
}
</script>

<style lang="less" scoped>
.work-menu.component {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .menu-container {
    height: 100%;
    display: inline-block;
  }
}
</style>

<style lang="less">
.work-menu.component {
  .ivu-menu {
    min-height: 110%;
  }
  // TODO: 颜色没有移到主题里
  .expand {
    height: 100%;
    .button {
      width: 8px;
      position: absolute;
      background-color: #4b79bd;
      height: 100px;
      line-height: 100px;
      border-radius: 0 10px 10px 0;
      .icon {
        height: unset;
        color: #fff;
        &.expand {
          transform: rotate(180deg);
        }
      }
      &:hover {
        background-color: #6d98d0;
      }
    }
  }
}
</style>
