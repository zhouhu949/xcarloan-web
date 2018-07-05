<!--联系人信息-->
<template>
  <section class="component customer-info-contacts">
    <div class="no-data-notice" v-if="dataSet.length === 0" key="no-data">
      暂无数据
    </div>
    <i-card class="contacts" v-else v-for="item of dataSet" :key="item.id" :title="item.contactName">
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
      <data-grid class="contacts-info" :labelWidth="90" labelAlign="right" contentAlign="left">
        <data-grid-item label="姓名" :span="4">{{item.contactName }}</data-grid-item>
        <data-grid-item label="电话" :span="4">{{item.contactPhone}}</data-grid-item>
        <data-grid-item label="性别" :span="4">{{item.contactSex | dictConvert}}</data-grid-item>
        <data-grid-item label="身份关系" :span="4">{{item.contactRelation | dictConvert}}</data-grid-item>
        <data-grid-item label="电子邮箱" :span="4">{{item.contactEmail}}</data-grid-item>
        <data-grid-item label="备注" :span="4">{{item.remark}}</data-grid-item>
      </data-grid>
    </i-card>
    <div class="add-customer-info" v-if="edit" key="edit">
      <a @click="addContactInfo">
        <svg-icon iconClass="add"></svg-icon>
        新增联系人信息
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerContactService } from "~/services/manage-service/basic-customer-contact.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import ModifyCustomerInfoContacts from "./modify-customer-info-contacts.vue";

@Component({
  components: {
    DataGrid, DataGridItem
  }
})
export default class CustomerInfoContacts extends Vue {
  @Dependencies(BasicCustomerContactService) private basicCustomerContactService: BasicCustomerContactService
  @Prop() id: Number

  /** 是否可编辑 */
  @Prop({ default: false }) edit: Boolean

  private dataSet: Array<any> = [];

  mounted() {
    this.refreshData()
  }

  /**
     * 刷新数据
     */
  private refreshData() {
    this.basicCustomerContactService.findCustomerContactList(this.id).subscribe(
      data => this.dataSet = data,
      err => this.$Message.error(err.msg)
    )
  }
  /**
   * 新增联系人信息
   */
  private addContactInfo() {
    this.$dialog.show({
      title: '新增联系人信息',
      footer: true,
      width: 700,
      onOk: addCustomerInfoContacts => {
        return addCustomerInfoContacts.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      render: h => h(ModifyCustomerInfoContacts, {
        props: {
          customerId: this.id
        }
      })
    })
  }
  /**
   * 修改联系人信息
   */
  private onModifyClick(contactInfo) {
    contactInfo.customerId = this.id
    let tmpData = Object.assign({}, contactInfo)
    this.$dialog.show({
      title: "修改联系人信息",
      footer: true,
      width: 700,
      onOk: modifyCustomerInfoContacts => {
        return modifyCustomerInfoContacts.submit().then(v => {
          if (v) this.refreshData()
          return !!v
        })
      },
      onCancel: () => {
        this.refreshData()
      },
      render: h => h(ModifyCustomerInfoContacts, {
        props: {
          data: tmpData
        }
      })
    })
  }
  /**
  * 删除联系人信息
  */
  onDeleteClick(contactInfo) {
    this.$Modal.confirm({
      title: '提示',
      content: `确定删除联系人<b>${contactInfo.contactName}</b>的信息吗？`,
      onOk: () => {
        this.basicCustomerContactService.deleteCustomContant(contactInfo.id)
          .subscribe(val => {
            this.$Message.success(`删除联系人<b>${contactInfo.contactName}</b>的信息成功！`)
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
.component.customer-info-contacts {
  .customer-no {
    margin: 0 auto 5px 40px;
  }
  .contacts {
    margin-bottom: 20px;
  }
}
</style>
