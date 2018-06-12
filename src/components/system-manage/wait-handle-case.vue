<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <div class="data-form">
      <i-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</i-checkbox>
    </div>
    <i-checkbox-group v-model="waitHanleList" @on-change="handleCheckedItemChange">
      <ul>
        <li v-for="item in checkboxList" :key="item.id">
          <i-checkbox class="data-checkbox" :label="item.id">{{item.type?$dict.getDictName(item.type):''}}</i-checkbox>
        </li>
      </ul>
    </i-checkbox-group>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { DataDictService } from "~/services/manage-service/data-dict.service";
import { Prop } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";


@Component({
  components: {
    DataBox
  }
})
export default class WaitHandleCase extends Vue {
  @Dependencies(DataDictService) private dataDictService: DataDictService;
  @Dependencies(PageService) private pageService: PageService;

  @Prop() row: Object;
  private checkboxList: Array<any> = [];
  private waitHanleList: Array<any> = [];
  private isIndeterminate: Boolean = false;
  private checkAllGroup: Array<any> = [];
  private indeterminate: Boolean = false;
  private roleConfig: any = {
    backlogIds: [],
    roleId: ""
  };
  created() { }

  refreshData() {
    this.checkboxList = [];
  }
  /**
   * 获取所有待办事项和已选待办事项
   */
  getData(roleIds) {
    // 查询所有待办事项
  
  }
  /**
   * 获取角色下待办事项配置
   */
  getRoleWaitHanleCase() { }

  /**
   * 确定配置待办事项
   */
  configWaitHandle(roleId) {
    this.roleConfig.backlogIds = this.waitHanleList;
    this.roleConfig.roleId = roleId;
    
  }

  get checkAll() {
    return this.waitHanleList.length === this.checkboxList.length;
  }

  set checkAll(val) {
    this.waitHanleList = val ? this.checkboxList.map(v => v.id) : [];
    this.handleCheckedItemChange();
    console.log(this.waitHanleList);
  }

  handleCheckedItemChange() {
    this.isIndeterminate =
      this.waitHanleList.length < this.checkboxList.length &&
      this.waitHanleList.length !== 0;
  }
}

</script>
<style lang="less" scoped>
.component.wait-handle-case {
  .data-form {
    padding-bottom: 3px;
    margin-bottom: 3px;
  }
  //   .data-checkbox {
  //     width: 400px;
  //   }
}
</style>
<style lang="less">
.component.wait-handle-case {
  .ivu-checkbox-group {
    overflow: hidden;
  }
}
</style>
