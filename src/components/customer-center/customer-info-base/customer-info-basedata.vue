<!--基础信息-->
<template>
  <section class="component customer-info-basedata">
    <div class="customer-no">
      客户编号：
      <b>{{customerBaseInfo.customerCode}}</b>
    </div>
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="4">{{customerBaseInfo.customerName}}</data-grid-item>
      <data-grid-item label="客户性别" :span="4">{{customerBaseInfo.customerSex | dictConvert}}</data-grid-item>
      <data-grid-item label="民族" :span="4">{{customerBaseInfo.nation}}</data-grid-item>
      <data-grid-item label="电话" :span="4">{{customerBaseInfo.customerPhone}}</data-grid-item>
      <data-grid-item label="出生日期" :span="4">{{customerBaseInfo.birthTime | dateFormat}}</data-grid-item>
      <data-grid-item label="QQ" :span="4">{{customerBaseInfo.qq}}</data-grid-item>
      <data-grid-item label="微信" :span="4">{{customerBaseInfo.wechat}}</data-grid-item>
      <data-grid-item label="邮箱" :span="4">{{customerBaseInfo.email}}</data-grid-item>
      <data-grid-item label="邮政编码" :span="4">{{customerBaseInfo.postalCode }}</data-grid-item>
      <data-grid-item label="身份证号" :span="4">{{customerBaseInfo.idCard}}</data-grid-item>
      <data-grid-item label="发证机关" :span="4">{{customerBaseInfo.customerIssuer}}</data-grid-item>
      <data-grid-item label="有效期类型" :span="4">{{customerBaseInfo.idCardValidityPeriodType | dictConvert}}</data-grid-item>
      <data-grid-item label="有效期区间" :span="4">{{customerBaseInfo.idCardValidityPeriodSection}}</data-grid-item>
      <data-grid-item label="身份证地址" :span="4">{{customerBaseInfo.idCardAddress}}</data-grid-item>
      <data-grid-item label="详细地址" :span="4">{{customerBaseInfo.idCardAddressDetail}}</data-grid-item>
      <data-grid-item label="教育程度" :span="4">{{customerBaseInfo.education | dictConvert}}</data-grid-item>
      <data-grid-item label="毕业院校" :span="4">{{customerBaseInfo.school}}</data-grid-item>
      <data-grid-item label="婚姻状况" :span="4">{{customerBaseInfo.marital | dictConvert}}</data-grid-item>
      <data-grid-item label="现居住地址" :span="4">{{customerBaseInfo.localHomeAddr}}</data-grid-item>
      <data-grid-item label="地址详细" :span="4">{{customerBaseInfo.localHomeAddrDetail}}</data-grid-item>
      <data-grid-item label="家庭座机" :span="4">{{customerBaseInfo.localHomePhone}}</data-grid-item>
      <data-grid-item label="是否接受勘查" :span="4">{{customerBaseInfo.houseProspecting | dictConvert}}</data-grid-item>
      <data-grid-item label="健康状况" :span="4">{{customerBaseInfo.healthStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="居住状况" :span="4">{{customerBaseInfo.homeStatus | dictConvert}}</data-grid-item>
      <data-grid-item label="通讯地址" :span="4">{{customerBaseInfo.messageAddr }}</data-grid-item>
      <data-grid-item label="开户状态" :span="4">{{customerBaseInfo.accountStatus | dictConvert}}</data-grid-item>
    </data-grid>
    <div class="udpate-basedata" v-if="edit">
      <a @click="onModifyClick">
        <svg-icon iconClass="tianxie"></svg-icon>
        修改资料
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
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import ModifyCustomerInfoBasedata from "./modify-customer-info-basedata.vue";

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoBasedata extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean
  @Prop({ default: () => {} }) callBack: () => void

  private customerBaseInfo: any = {}

  private refreshData() {
    this.basicCustomerService.findCustomerById(this.id).subscribe(
      data => this.customerBaseInfo = data,
      err => this.$Message.error(err.msg)
    )
  }

  mounted() {
    this.refreshData()
  }

  private onModifyClick() {
    this.$dialog.show({
      title: "修改客户资料",
      footer: true,
      width: 1050,
      onOk: modifyCustomerInfoBasedata => {
        return modifyCustomerInfoBasedata.submit().then(v => {
          if (v){
            this.refreshData()
            if(this.callBack) this.callBack(); 
          } 
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoBasedata, {
        props: {
          data: Object.assign({}, this.customerBaseInfo)
        }
      })
    })
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-basedata {
  .udpate-basedata {
    text-align: right;
    margin: 10px 30px 0px auto;
  }
  .customer-no {
    margin: 0 auto 5px 40px;
  }
}
</style>
