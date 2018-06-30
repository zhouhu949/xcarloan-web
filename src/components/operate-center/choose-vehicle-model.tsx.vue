<!--选择车辆-->
<template>
  <section class="component choose-vehicle-model">
    <data-form :model="model" :page="pageService" @on-search="refreshData" hiddenDateSearch>
      <template slot="input">
        <i-form-item prop="brand" label="品牌:">
          <i-input v-model="model.brand" placeholder="请输入品牌名称"></i-input>
        </i-form-item>
        <i-form-item prop="series" label="系列:">
          <i-input v-model="model.series" placeholder="请输入系列名称"></i-input>
        </i-form-item>
        <i-form-item prop="model" label="车型:">
          <i-input v-model="model.model" placeholder="请输入车型名称"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :show-config-column="false" :height="400" :columns="columns" highlightRow :data="dataSet" ref="databox" :page="pageService" @on-current-change="onCurrentChange" @onPageChange="refreshData"></data-box>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCarManageService } from "~/services/manage-service/basic-car-manage.service";
import { PageService } from "~/utils/page.service";
import CarParams from "~/components/base-data/car-params.vue";
import { Button } from "iview";

@Component({
  components: {}
})
export default class ChooseVehicleModel extends Vue {
  @Dependencies(BasicCarManageService) private basicCarManageService: BasicCarManageService;
  @Dependencies(PageService) private pageService: PageService;
  // 选中的车辆ID
  @Prop() carId: Number;

  /**
   * 当前选中行的数据
   */
  public selectData: {
    carId: Number,
    carName: String
  } = null;

  private columns: Array<any> = [];
  private dataSet: Array<any> = [];
  private model = {
    brand: "", //品牌
    series: "", //系列
    model: "" // 车型
  }

  created() {
    this.columns = [
      {
        align: "center",
        title: "品牌",
        key: 'brandName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "系列",
        key: 'seriesName',
        minWidth: this.$common.getColumnWidth(4)
      },
      {
        align: "center",
        title: "车型",
        key: 'modelName',
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row }) => ( <i-button type="text" class="row-command-button" onClick={() => this.showCarDetail(row.modelId)}>{row.modelName}</i-button> )
      }
    ]
  }

  mounted() {
    this.refreshData();
  }

  /**
   * 选中行发生改变
   */
  private onCurrentChange(currentRow, oldRow) {
    this.selectData = {
      carId: currentRow.modelId,
      carName: `${currentRow.brandName} ${currentRow.seriesName} ${currentRow.modelName}`
    }
  }

  /**
   * 更新数据
   */
  private refreshData() {
    this.basicCarManageService.queryCarModel(this.model, this.pageService).subscribe(
      data => {
        data.forEach(v => { v._highlight = v.modelId === this.carId })
        this.dataSet = data
      },
      err => this.$Message.error(err.msg)
    )
  }

  /**
   * 查看车辆详情
   */
  private showCarDetail(carId: Number) {
    this.$dialog.show({
      title: "车型详情",
      isView: true,
      width: 1000,
      render: h => (<CarParams carId={carId} isView={true} ></CarParams>)
    })
  }

}
</script>

<style lang="less">
.component.choose-vehicle-model {
  .money-align {
    text-align: right;
    padding-right: 5%;
  }
}
</style>
