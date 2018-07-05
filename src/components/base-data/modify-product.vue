<!-- 产品维护 -->
<template>
  <section class="component modify-product">
    <i-form :label-width="110" :model="model" ref="add-modify-product-form" :rules="rules" inline>
      <i-form-item label="产品名称" prop="productName">
        <i-input v-model="model.productName" placeholder="请输入产品名称"></i-input>
      </i-form-item>
      <i-form-item label="产品类型" prop="schemeType">
        <i-input value="融资租赁" readonly></i-input>
      </i-form-item>
      <i-form-item label="还款方案名称" prop="schemeName">
        <i-input v-model="model.schemeName" readonly @on-focus="onSelectSchemeFocus" placeholder="请选择还款方案"></i-input>
      </i-form-item>
      <i-form-item label="车型名称" prop="carName">
        <i-input v-model="carName" readonly></i-input>
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
import ChooseScheme from '~/components/base-data/choose-scheme.vue'
import uploadProductEnclosure from '~/components/base-data/upload-product-enclosure.vue';
import { ProdSchemeDetailType } from "~/config/enum.config";

@Component({
  components: {
    ChooseScheme
  }
})
export default class ModifyProduct extends Vue {
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
    schemeId: null, // 方案id
    id: 0 // 产品id
  }

  private rules = {
    productName: { required: true, message: '请输入产品名称', trigger: 'blur' },
    schemeName: { required: true, message: '请选择还款方案', trigger: 'change' }
  }

  /**
   * 反显数据
   */
  revertData() {
    this.model.productName = this.productData.productName
    this.model.fileUrl = this.productData.fileUrl
    this.model.schemeName = this.productData.schemeName
    this.model.schemeId = this.productData.schemeId
    this.model.id = this.productData.id
  }

  mounted() {
    this.form = this.$refs['add-modify-product-form']
    if (this.productData) this.revertData()
    if (this.carId) this.model.configId = this.carId
  }
  /**
    * 确定新增产品
    */
  addProduct() {
    return new Promise((resolve) => {
      this.form.validate(valid => {
        if (!valid) return resolve(false)
        this.basicProductService.addBasicProduct(this.model)
          .subscribe(
            data => {
              this.$Message.success("操作成功！");
              resolve(true)
            },
            err => {
              this.$Message.error(err.msg);
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
  private onSelectSchemeFocus() {
    this.$dialog.show({
      title: "还款方案选择",
      footer: true,
      width: 1000,
      onOk: (chooseScheme: ChooseScheme) => {
        if (!chooseScheme.selecedData) return
        this.model.schemeName = chooseScheme.selecedData.schemeName
        this.model.schemeId = chooseScheme.selecedData.schemeId
      },
      render: h => h(ChooseScheme, {
        props: {
          schemeId: this.model.schemeId,
          schemeType: ProdSchemeDetailType.FINANCE
        }
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
