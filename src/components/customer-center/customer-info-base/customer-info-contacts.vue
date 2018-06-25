<!--联系人信息-->
<template>
  <section class="component customer-info-contacts">
    <data-grid class="contacts-info" :labelWidth="90" labelAlign="right" contentAlign="left" v-for="item of dataSet" :key="item.id">
      <data-grid-item label="姓名" :span="4">{{item.contactName }}</data-grid-item>
      <data-grid-item label="电话" :span="4">{{item.contactPhone}}</data-grid-item>
      <data-grid-item label="性别" :span="4">{{item.contactSex | dictConvert}}</data-grid-item>
      <data-grid-item label="身份关系" :span="4">{{item.contactRelation | dictConvert}}</data-grid-item>
      <data-grid-item label="电子邮箱" :span="4">{{item.contactEmail}}</data-grid-item>
      <data-grid-item label="备注" :span="4">{{item.remark}}</data-grid-item>
    </data-grid>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerContactService } from "~/services/manage-service/basic-customer-contact.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";

@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class CustomerInfoContacts extends Vue {
  @Dependencies(BasicCustomerContactService) private basicCustomerContactService: BasicCustomerContactService
  @Prop() id: Number

  private dataSet: Array<any> = [];

  mounted() {
    this.basicCustomerContactService.findCustomerContactList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }

}
</script>
<style lang="less" scoped>
.component.customer-info-contacts {
  .contacts-info {
    margin: 10px;
  }
}
</style>
