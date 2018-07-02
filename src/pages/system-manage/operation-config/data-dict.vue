<!--数据字典-->
<template>
  <section class="page data-dict">
    <page-header title="系统字典" hiddenPrint hiddenExport></page-header>
    <i-row class="data-form">
      <i-row type="flex" align="top" justify="start">
        <i-col :span="4">
          <div class="data-form-item">
            <div class="data-form-item-icon"></div>
            <span>数据类型</span>
          </div>
          <div class="data-form-list">
            <div class="data-form-datatypelist" v-for="item in dataType" :key="item.id" :value="item.dictName" :class="{'dataTypeCss':checkId===item.id}" @click="checkDataType(item)">
              <span style="">{{item.dictName}}</span>
            </div>
          </div>
        </i-col>
        <i-col class="command" :span="20">
          <data-form hidden-date-search :model="dictAguments" @on-search="seach">
            <template slot="input">
              <i-form-item prop="dictItemName" label="数据名称">
                <i-input v-model="dictAguments.dictItemName"></i-input>
              </i-form-item>
            </template>
          </data-form>
          <data-box :columns="columns1" :data="dataNames" :noDefaultRow="true"></data-box>
        </i-col>
      </i-row>
    </i-row>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { SysDictService } from "~/services/manage-service/sys-dict.service";
import { setTimeout } from "core-js";

@Layout("workspace")
@Component({
  components: {
    DataBox
  }
})
export default class SysDict extends Page {
  @Dependencies(SysDictService) private sysDictService: SysDictService;
  private data1: Array<Object> = [];
  private dataType: Array<any> = [];
  private dataNames: Array<any> = [];
  private searchOptions: Boolean = false;
  private checkId: Number = 1;
  private item: any;
  private columns1: any;
  private dictAguments: any = {};
  private id: any = "";
  private rulesAddDate: any = {};
  private rulesAddDataType: any = {};
  private warnStatus: any = null;
  private clickCount: number = 0;
  private dictCodes: any = 0;
  private checked: any = {};
  private addDataModel: any = {};

  created() {
    this.dataNames = [];
    this.item = {
      dictCode: "",
      id: ""
    };
    this.dictAguments = {
      dictItemName: "",
      id: ""
    };
    this.getAllDictType();
    this.columns1 = [
      {
        title: "序号",
        type: "index",
        fixed: "left",
        align: "center",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        title: " 名称",
        key: "dictItemName",
        minWidth: this.$common.getColumnWidth(5)
      }
    ];
  }

  openSearch() {
    this.searchOptions = !this.searchOptions;
  }

  /**
   * 查询所有数据字典类型
   */
  getAllDictType() {
    this.sysDictService.getAllSysDictType().subscribe(val => {
      this.dataType = val;
      this.item.id = this.dataType[0].id
      this.item.dictCode = this.dataType[0].dictCode
      this.checkDataType(this.item)
    });
  }
  /**
   * 根据数字字典查询对应的数据字典
   */
  checkDataType(item) {
    this.checked = item;
    this.checkId = item.id;
    this.dictCodes = item.dictCode;
    this.dictAguments.id = item.id;
    this.sysDictService
      .getSysItemBySysDictType(this.dictAguments)
      .subscribe(val => {
        this.dataNames = val;
      });
  }

  /**
   * 搜索
   */
  seach() {
    this.checkDataType(this.checked);
  }

  /**
   * 重置搜索
   */
  resetSeach() {
    this.dictAguments = {
      // dictCode: '',
      dictItemName: "",
      id: ""
    };
  }

  mounted() {
    this.checkId = 10000;
  }
}
</script>
<style lang="less" scoped>
.page.data-dict {
  .data-form {
    margin-top: 10px;
    .data-form-item {
      width: 100%;
      height: 30px;
      border: 1px solid #dddd;
      line-height: 30px;
      font-size: 16px;
      .data-form-item-icon {
        width: 4px;
        height: 15px;
        background: rgb(38, 94, 162);
        display: inline-block;
        margin-left: 10px;
        position: relative;
        top: 2px;
      }
    }
    .command {
      .command-item {
        width: 20%;
      }
      .command-add {
        margin-left: 10px;
        position: absolute;
        right: 13px;
      }
    }
    .data-form-list {
      width: 100%;
      height: 600px;
      border: 1px solid #dddd;
      border-top: 0;
      overflow: auto;
      .data-form-datatypelist {
        cursor: pointer;
        width: 100%;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        position: relative;
        margin: auto;
      }
    }
  }
}

.dataTypeCss {
  background: #e4f4fa;
}
</style>
<style lang="less">
.page.data-dict {
  .toViewModalClass {
    .ivu-modal-footer {
      display: none !important;
    }
  }
  .ivu-select.ivu-select-single.ivu-select-small,
  .ivu-select-single .ivu-select-selection {
    width: 80px !important;
    display: inline-block;
  }
}
</style>
