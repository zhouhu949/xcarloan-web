<!--查看跟进记录-->
<template>
  <section class="component customer-info-follow-record">
    <data-box :columns="columns" :data="dataSet" :height="500" ref="databox"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";

@Component({})
export default class CustomerInfoFollowRecord extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;

  // 意向id
  @Prop() intentionId

  private dataSet: Array<any> = [];
  private columns: Array<any> = []

  created() {
    this.columns = [
      {
        align: "center",
        title: "跟进方式",
        key: "followType",
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.followType))
      },
      {
        align: "center",
        title: '跟进结果',
        key: 'followResult',
        minWidth: this.$common.getColumnWidth(2),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.followResult))
      }, 
      {
        align: "center",
        title: '跟进时间',
        key: 'followDate',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => h('p', {}, this.$filter.dateFormat(row.followDate))
      },
      {
        align: "center",
        title: '备注',
        key: 'remark',
        minWidth: this.$common.getColumnWidth(4)
      }
    ]
  }

  mounted() {
    this.refreshData()
  }

  /**
   * 刷新数据
   */
  refreshData() {
    this.basicCustomerService.findCustomerFollowList(this.intentionId).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
}
</script>
<style lang="less" scoped>
</style>
