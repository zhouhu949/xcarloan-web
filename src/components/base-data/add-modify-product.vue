<!-- 新增产品 -->
<template>
  <section class="component add-modify-product">
    <i-form :label-width="110" :model="model" ref="add-modify-product-form" :rules="rules" inline>
      <i-form-item label="产品名称" prop="productName">
        <i-input v-model="model.productName" placeholder="请输入产品名称"></i-input>
      </i-form-item>
      <i-form-item label="产品类型" prop="schemeType">
        <i-input value="融资租赁" disabled></i-input>
      </i-form-item>
      <i-form-item label="还款方案名称" prop="schemeName">
        <i-input v-model="model.schemeName" readonly @on-focus="selectScheme" placeholder="请选择还款方案"></i-input>
      </i-form-item>
      <i-form-item label="车型名称" prop="carName">
        <i-input v-model="carName" disabled></i-input>
      </i-form-item>
      <i-form-item label="上传附件" prop="fileUrl">
        <i-input v-model="model.fileUrl" readonly @on-focus="uploadFile" placeholder="请选择附件"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from "vue-property-decorator";
import { Dependencies } from '~/core/decorator';
import { Form } from "iview";
import { BasicProductService } from "~/services/manage-service/basic-product.service";
import { RepaySchemeService } from '~/services/manage-service/basic-repay-scheme.service';
import SlectScheme from '~/components/base-data/select-scheme.vue'
import uploadProductEnclosure from '~/components/base-data/upload-product-enclosure.vue';

@Component({
  components: {
  }
})
export default class AddModifyProduct extends Vue {
  @Dependencies(BasicProductService) private basicProductService: BasicProductService
  @Dependencies(RepaySchemeService) private repaySchemeService: RepaySchemeService

  @Prop() carName
  @Prop() carId
  @Prop() productData

  private form: Form
  private dataSet: Array<any> = [];
  private schemeData: Array<Number> = []
  private model: any = {
    productName: '', // 产品名称
    productType: 10049, // 产品类型
    fileUrl: '', // 附件地址
    schemeName: '', // 还款方案名称
    configId: 0, // 车型id
    schemeId: 0, // 方案id
    id: 0 // 产品id
  }

  private rules = {
    productName: { required: true, message: '请输入产品名称', trigger: 'blur' },
    schemeName: { required: true, message: '请选择还款方案', trigger: 'blur' }
  }

  created() {
    this.model.configId = this.carId
    if (Object.keys(this.productData).length != 0) {
      this.model.productName = this.productData.productName
      this.model.fileUrl = this.productData.fileUrl
      this.model.schemeName = this.productData.schemeName
      this.model.schemeId = this.productData.schemeId
      this.model.id = this.productData.id
    }
  }
  mounted() {
    this.form = this.$refs['add-modify-product-form']
  }
  /**
    * 确定新增产品
    */
  addProduct() {
    return new Promise((resolve, reject) => {
      this.form.validate(valid => {
        if (!valid) return reject()
        this.basicProductService.addBasicProduct(this.model)
          .subscribe(
            data => {
              this.$Message.success("操作成功！");
              resolve(true)
            },
            ({ msg }) => {
              this.$Message.error(msg);
              resolve(false)
            }
          );
      })
    })
  }
  /**
    * 编辑产品
    */
  editProduct() {
    return new Promise((resolve, reject) => {
      this.form.validate(valid => {
        if (!valid) return reject()
        this.basicProductService.editBasicProduct(this.model)
          .subscribe(
            data => {
              this.$Message.success("操作成功！");
              resolve(true)
            },
            ({ msg }) => {
              this.$Message.error(msg);
              resolve(false)
            }
          );
      })
    })
  }
  /**
   * 选择还款方案
   */
  selectScheme() {
    this.repaySchemeService.getAllBasicSchemeByOrgId().subscribe(val => {
      this.schemeData = val.filter(v => {
        return v.schemeStatus === 10057 && v.schemeType === 10049
      })
      if (this.schemeData.length === 0) {
        this.$Message.warning('您还没有已发布的还款方案！')
        return
      }
      this.$dialog.show({
        title: '选择还款方案',
        footer: true,
        width: 1000,
        render: h => h(SlectScheme, {
          props: {
            schemeData: this.schemeData,
            productData: this.model
          }
        })
      })
    })
  }
  /**
   * 选择附件
   */
  uploadFile() {
    this.$dialog.show({
      title: '上传附件',
      footer: true,
      width: 700,
      onOk: upload => {
        return upload.addProduct().then(v => {

        })
      },
      render: h => h(uploadProductEnclosure, {
        props: {

        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.component.add-modify-product {
  .plan-item {
    width: 200px;
    display: flex;
    justify-content: space-between;
    > span {
      margin-right: 20px;
    }
  }
}
</style>
