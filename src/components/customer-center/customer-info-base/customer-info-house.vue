<!--房产信息-->
<template>
  <section class="component customer-info-house">
    <div class="no-data-notice" v-if="dataSet.length === 0" key="no-data">
      暂无数据
    </div>
    <i-card class="house" v-else v-for="item of dataSet" :key="item.id" :span="24" :title="item.houseAddress">
      <div slot="extra" v-if="edit">
        <a @click="onDeleteClick(item)">
          <svg-icon iconClass="delete-bold"></svg-icon>
          删除
        </a>
        <a @click="onModifyClick(item)" style="margin-left: 20px;">
          <svg-icon iconClass="tianxie"></svg-icon>
          修改
        </a>
      </div>
      <data-grid class="house-info" :labelWidth="90" labelAlign="right" contentAlign="left">
        <data-grid-item label="户型" :span="4">{{item.houseType | dictConvert}}</data-grid-item>
        <data-grid-item label="房产面积" :span="4">{{item.houseArea}}</data-grid-item>
        <data-grid-item label="房屋地址" :span="4">{{item.houseAddress}}</data-grid-item>
        <data-grid-item label="备注" :span="12">{{item.remark}}</data-grid-item>
      </data-grid>
    </i-card>
    <div class="add-customer-info" v-if="edit" key="edit">
      <a @click="onAddHouseInfo">
        <svg-icon iconClass="add"></svg-icon>
        新增房产信息
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerHouseService } from "~/services/manage-service/basic-customer-house.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import ModifyCustomerInfoHouse from "./modify-customer-info-house.vue";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoHouse extends Vue {
  @Dependencies(BasicCustomerHouseService) private basicCustomerHouseService: BasicCustomerHouseService;
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean

  private dataSet: Array<any> = []

  mounted() {
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  private refreshData() {
    this.basicCustomerHouseService.findCustomerHouseList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
  /**
   * 新增房产信息
   */
  private onAddHouseInfo() {
    this.$dialog.show({
      title: '新增房产信息',
      footer: true,
      width: 700,
      onOk: addCustomerInfoHouse => {
        return addCustomerInfoHouse.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoHouse, {
        props: {
          customerId: this.id
        }
      })
    })
  }
  /**
   * 修改房产信息
   */
  private onModifyClick(houseInfo) {
    houseInfo.customerId = this.id
    let tmpData = Object.assign({}, houseInfo)
    this.$dialog.show({
      title: "修改房产信息",
      footer: true,
      width: 700,
      onOk: modifyCustomerInfoHouse => {
        return modifyCustomerInfoHouse.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      onCancel: () => {
        this.refreshData()
      },
      render: h => h(ModifyCustomerInfoHouse, {
        props: {
          data: tmpData
        }
      })
    })
  }
  /**
  * 删除房产信息
  */
  onDeleteClick(houseInfo) {
    this.$Modal.confirm({
      title: '提示',
      content: `确定删除该房产信息吗？`,
      onOk: () => {
        this.basicCustomerHouseService.deleteCustomHouse(houseInfo.id)
          .subscribe(val => {
            this.$Message.success(`删除成功！`)
            this.refreshData()
          },
            err => this.$Message.error(err.msg)
          )
      }
    })
  }
}
</script>
<style lang="less" scoped>
.component.customer-info-house {
  .customer-no {
    margin: 0 auto 5px 40px;
  }
  .house {
    margin-bottom: 20px;
  }
}
</style>
