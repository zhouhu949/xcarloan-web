<!--银行卡信息-->
<template>
  <section class="component customer-info-bank">
    <i-row :gutter="16">
      <i-col class="col-card" v-for="item of dataSet" :key="item.id" :span="12">
        <i-card class="card" :title="item.bankName">
          <p class="card-no">{{item.cardNo}}</p>
          <p class="card-branch">{{item.bankBranch}}</p>
          <p class="card-clientno">{{item.clientNumber}}</p>
          <p class="card-state">{{item.accountStatus | dictConvert}}</p>
        </i-card>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerService } from "~/services/manage-service/basic-customer.service";


@Component({})
export default class CustomerInfoBank extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number
  @Prop() edit:Boolean;

  private dataSet: Array<any> = []

  private refreshData(){
     this.basicCustomerService.findCustomerBankInfo(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

  mounted() {
    this.refreshData()
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
