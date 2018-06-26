<!--基础信息-->
<template>
  <section class="component customer-info-basedata">
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户编号" :span="4">{{customerBaseInfo.customerCode}}</data-grid-item>
      <data-grid-item label="开户状态" :span="4">{{customerBaseInfo.accountStatus | dictConvert}}</data-grid-item>
      <template v-if="edit">
        <data-grid-item required label="客户姓名" :span="4">
          <i-input v-model="customerBaseInfo.customerName"></i-input>
        </data-grid-item>
        <data-grid-item required label="客户性别" :span="4">
          <i-select v-model="customerBaseInfo.customerSex">
            <i-option v-for="{label,value} of $dict.getDictData(10008)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </data-grid-item>
        <data-grid-item required label="电话" :span="4">
          <i-input v-model="customerBaseInfo.customerPhone"></i-input>
        </data-grid-item>
        <data-grid-item label="出生日期" :span="4">
          <i-date-picker class="form-picker" v-model="customerBaseInfo.birthTime"></i-date-picker>
        </data-grid-item>
        <data-grid-item label="QQ" :span="4">
          <i-input v-model="customerBaseInfo.qq"></i-input>
        </data-grid-item>
        <data-grid-item label="微信" :span="4">
          <i-input v-model="customerBaseInfo.wechat"></i-input>
        </data-grid-item>
        <data-grid-item label="邮箱" :span="4">
          <i-input v-model="customerBaseInfo.email"></i-input>
        </data-grid-item>
        <data-grid-item label="邮政编码" :span="4">
          <i-input v-model="customerBaseInfo.postalCode"></i-input>
        </data-grid-item>
        <data-grid-item required label="身份证号" :span="4">
          <i-input v-model="customerBaseInfo.idCard"></i-input>
        </data-grid-item>
        <data-grid-item label="发证机关" :span="4">
          <i-input v-model="customerBaseInfo.customerIssuer"></i-input>
        </data-grid-item>
        <data-grid-item label="有效期类型" :span="4">
          <i-select v-model="customerBaseInfo.idCardValidityPeriodType">
            <i-option v-for="{label,value} of $dict.getDictData(10008)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </data-grid-item>
        <data-grid-item label="有效期区间" :span="4">
          <i-input v-model="customerBaseInfo.idCardValidityPeriodSection"></i-input>
        </data-grid-item>
        <data-grid-item label="身份证地址" :span="4">
          <i-input v-model="customerBaseInfo.idCardAddress"></i-input>
        </data-grid-item>
        <data-grid-item label="详细地址" :span="4">
          <i-input v-model="customerBaseInfo.idCardAddressDetail"></i-input>
        </data-grid-item>
        <data-grid-item label="教育程度" :span="4">
          <i-select v-model="customerBaseInfo.education">
            <i-option v-for="{label,value} of $dict.getDictData(10028)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </data-grid-item>
        <data-grid-item label="毕业院校" :span="4">
          <i-input v-model="customerBaseInfo.school"></i-input>
        </data-grid-item>
        <data-grid-item label="婚姻状况" :span="4">
          <i-select v-model="customerBaseInfo.marital">
            <i-option v-for="{label,value} of $dict.getDictData(10029)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </data-grid-item>
        <data-grid-item label="现居住地址" :span="4">
          <i-input v-model="customerBaseInfo.localHomeAddr"></i-input>
        </data-grid-item>
        <data-grid-item label="地址详细" :span="4">
          <i-input v-model="customerBaseInfo.localHomeAddrDetail"></i-input>
        </data-grid-item>
        <data-grid-item label="家庭座机" :span="4">
          <i-input v-model="customerBaseInfo.localHomePhone"></i-input>
        </data-grid-item>
        <data-grid-item label="是否接受勘查" :span="4">
          <i-select v-model="customerBaseInfo.houseProspecting">
            <i-option v-for="{label,value} of $dict.getDictData(10001)" :key="value" :label="label" :value="value"></i-option>
          </i-select>
        </data-grid-item>
        <data-grid-item label="民族" :span="4">
          <i-input v-model="customerBaseInfo.nation"></i-input>
        </data-grid-item>
        <data-grid-item label="健康状况" :span="4">
          <i-input v-model="customerBaseInfo.healthStatus"></i-input>
        </data-grid-item>
        <data-grid-item label="居住状况" :span="4">{{customerBaseInfo.homeStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="通讯地址" :span="4">
          <i-input v-model="customerBaseInfo.messageAddr"></i-input>
        </data-grid-item>
      </template>
      <template v-else>
        <data-grid-item label="客户姓名" :span="4">{{customerBaseInfo.customerName}}</data-grid-item>
        <data-grid-item label="客户性别" :span="4">{{customerBaseInfo.customerSex | dictConvert}}</data-grid-item>
        <data-grid-item label="电话" :span="4">{{customerBaseInfo.customerPhone}}</data-grid-item>
        <data-grid-item label="出生日期" :span="4">{{customerBaseInfo.birthTime}}</data-grid-item>
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
        <data-grid-item label="现居住地址" :span="4">{{customerBaseInfo.localHomeAddr | dictConvert}}</data-grid-item>
        <data-grid-item label="地址详细" :span="4">{{customerBaseInfo.localHomeAddrDetail}}</data-grid-item>
        <data-grid-item label="家庭座机" :span="4">{{customerBaseInfo.localHomePhone}}</data-grid-item>
        <data-grid-item label="是否接受勘查" :span="4">{{customerBaseInfo.houseProspecting | dictConvert}}</data-grid-item>
        <data-grid-item label="民族" :span="4">{{customerBaseInfo.nation}}</data-grid-item>
        <data-grid-item label="健康状况" :span="4">{{customerBaseInfo.healthStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="居住状况" :span="4">{{customerBaseInfo.homeStatus | dictConvert}}</data-grid-item>
        <data-grid-item label="通讯地址" :span="4">{{customerBaseInfo.messageAddr }}</data-grid-item>
      </template>
    </data-grid>
    <div class="save-basedata" v-if="edit">
      <i-button type="primary" @click="onBaseDataSaveClick">保存</i-button>
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

@Component({
  components: { DataGrid, DataGridItem }
})
export default class CustomerInfoBasedata extends Vue {
  @Dependencies(BasicCustomerService) private basicCustomerService: BasicCustomerService;
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean

  private customerBaseInfo: any = {
    customerName: "",
    customerSex: "",
    customerPhone: "",
    birthTime: "",
    qq: "",
    wechat: "",
    email: "",
    postalCode: "",
    idCard: "",
    customerIssuer: "",
    idCardValidityPeriodType: "",
    idCardValidityPeriodSection: "",
    idCardAddress: "",
    idCardAddressDetail: "",
    education: "",
    school: "",
    marital: "",
    localHomeAddr: "",
    localHomeAddrDetail: "",
    localHomePhone: "",
    houseProspecting: "",
    nation: "",
    healthStatus: "",
    homeStatus: "",
    messageAddr: ""
  }

  private refreshData() {
    this.basicCustomerService.findCustomerById(this.id).subscribe(
      data => this.customerBaseInfo = data,
      err => this.$Message.error(err.msg)
    )
  }

  mounted() {
    if (this.edit) return
    this.refreshData()
  }

  private onBaseDataSaveClick() {
    this.basicCustomerService.addBasicCustomer(this.customerBaseInfo).subscribe(
      data => {
        this.$Message.success('添加成功')
        this.refreshData()
      },
      err => this.$Message.error(err.msg)
    )
  }
}
</script>
<style lang="less">
.component.customer-info-basedata {
  .save-basedata {
    text-align: right;
    margin: 10px 30px 0px auto;
  }
}
</style>
