<template>
  <section class="component choose-customer">
    <data-form :model="model" :page="pageService" @on-search="refreshData" hidden-date-search>
      <template slot="input">
        <i-form-item prop="name" label="客户姓名">
          <i-input placeholder="请输入客户姓名" v-model="model.name"></i-input>
        </i-form-item>
        <i-form-item prop="phone" label="联系电话">
          <i-input placeholder="请输入客户联系电话" v-model="model.phone"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="身份证号">
          <i-input placeholder="请输入客户身份证号" v-model="model.idCard"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :show-config-column="false" :height="400" :columns="columns" highlightRow :data="dataSet" ref="databox" :page="pageService" @on-current-change="onDataBoxSelectedChange" @on-page-change="refreshData"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Dependencies } from '~/core/decorator';
import { PageService } from "~/utils/page.service";
import { Prop, Emit } from "vue-property-decorator";
import { BasicCustomerCenterService } from "~/services/manage-service/basic-customer-center.service";

const CustomerOrderModule = namespace("customerOrderSpace")

@Component({
  components: {}
})
export default class ChooseCustomer extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(BasicCustomerCenterService) private basicCustomerCenterService: BasicCustomerCenterService;
  @CustomerOrderModule.Action showCustomerInfo;
  @Prop() customerId: Number;

  /**
   * 当前选中行的数据
   */
  public selectData: {
    customerId: Number,
    name: String,
    phone: String,
    idCard: String
  } = null;


  private columns: any;
  private dataSet: any = [];

  private model = {
    name: "",
    phone: "",
    idCard: ""
  }


  activated() {
    this.refreshData();
  }

  mounted() {
    this.refreshData();
  }

  created() {
    this.columns = [
      {
        title: "操作",
        Width: this.$common.getOperateWidth(1),
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h("i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.showCustomerInfo({ id: row.id })
                  }
                }
              },
              "查看")
          ])
        }
      },
      {
        align: "center",
        editable: true,
        title: "客户姓名",
        key: "customerName",
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        align: "center",
        editable: true,
        title: "性别",
        key: "customerSex",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.customerSex))
      },
      {
        align: "center",
        editable: true,
        title: "客户类型",
        key: "customerStatus",
        minWidth: this.$common.getColumnWidth(3),
        render: (h, { row }) => h('p', {}, this.$filter.dictConvert(row.customerStatus))
      },
      {
        align: "center",
        editable: true,
        title: "证件号码",
        key: "idCard",
        minWidth: this.$common.getColumnWidth(6)
      },
      {
        title: '手机号码',
        editable: true,
        align: 'center',
        key: 'customerPhone',
        minWidth: this.$common.getColumnWidth(3)
      }
    ];
  }

  /**
   * dataBox 选中项变更
   */
  private onDataBoxSelectedChange(currentRow, oldRow) {
    this.selectData = {
      customerId: currentRow.customerId,
      name: currentRow.customerName,
      phone: currentRow.customerPhone,
      idCard: currentRow.idCard
    }
  }


  /**
   * 获取正式客户列表
   */
  private refreshData() {
    this.basicCustomerCenterService.findNotBlackCustomerList(this.model, this.pageService)
      .subscribe(
        data => {
          data.forEach(v => {
            v._highlight = v.customerId === this.customerId
          })
          this.dataSet = data
        },
        err => this.$Message.error(err.msg)
      );
  }

}
</script>


<style lang="less" scoped>
</style>
