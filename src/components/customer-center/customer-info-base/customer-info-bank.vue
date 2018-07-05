<!--银行卡信息-->
<template>
  <section class="component customer-info-bank">
    <div class="no-data-notice" v-if="dataSet.length === 0" key="no-data">
      暂无数据
    </div>
    <i-card class="card" v-else v-for="item of dataSet" :key="item.id" :title="item.bankName">
      <div slot="extra" v-if="edit">
        <a @click.prevent="onEditClick(item)">
          <svg-icon iconClass="tianxie"></svg-icon>
          修改
        </a>
        <a @click.prevent="onRemoveClick(item)">
          <svg-icon iconClass="delete-bold"></svg-icon>
          删除
        </a>
      </div>
      <p class="card-no">{{item.cardNo}}</p>
      <p class="card-branch">{{item.bankBranch}}</p>
      <p class="card-clientno">{{item.clientNumber}}</p>
      <p class="card-state">{{item.accountStatus | dictConvert}}</p>
    </i-card>

    <div class="add-customer-info" v-if="edit" key="edit">
      <a @click="onAddCardClick">
        <svg-icon iconClass="add"></svg-icon>
        新增银行卡
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";
import ModifyCustomerInfoBank from "./modify-customer-info-bank.vue";


@Component({})
export default class CustomerInfoBank extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number
  @Prop() edit: Boolean;

  private dataSet: Array<any> = []

  private refreshData() {
    this.basicCustomerService.findCustomerBankInfo(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  mounted() {
    this.refreshData()
  }

  private onEditClick(data) {
    data.customerId = this.id
    let tmpData = Object.assign({}, data)
    this.$dialog.show({
      title: "维护银行卡",
      footer: true,
      onOk: modify => {
        return modify.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoBank, { props: { data: tmpData } })
    })
  }

  /**
   * 删除银行卡
   */
  private onRemoveClick(data) {
    let cardNo = data.cardNo;
    this.$Modal.confirm({
      content: `是否删除尾号为 <b>${cardNo.substr(cardNo.length - 4)}</b> 的银行卡?`,
      onOk: () => {
        this.basicCustomerService.deleteCustomerBankInfo(data.id).subscribe(
          data => {
            this.$Message.success('删除成功')
            this.refreshData()
          },
          err => this.$Message.error(err.msg)
        )
      }
    })
  }

  /**
   * 新增银行卡
   */
  private onAddCardClick() {
    this.$dialog.show({
      title: "新增银行卡",
      footer: true,
      onOk: add => {
        return add.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoBank, { props: { customerId: this.id } })
    })
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-bank {
  .card {
    background-color: #9c9430d1;
    margin: 10px 30px;
    height: 200px;
    width: 350px;
    &-no {
      margin-top: 20px;
      padding-left: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    &-branch {
      margin-top: 10px;
    }
    &-clientno {
      font-size: 12px;
      text-align: right;
      padding-right: 10px;
    }
    &-state {
      padding-left: 10px;
    }
  }
}
</style>
