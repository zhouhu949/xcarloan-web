<!--修改订单-->
<template>
  <section class="component modify-order">
    <i-form :mdoel="model" :rules="rules" ref="form" :label-width="110">
      <i-form-item prop="amt" label="订单金额">
        <i-input-number v-model.lazy="model.amt" placeholder="请输入订单" :min="0" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"></i-input-number>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { BasicCustomerOrderService } from "~/services/manage-service/basic-customer-order.service";

@Component({
  components: {}
})
export default class ModifyOrder extends Vue {
  @Dependencies(BasicCustomerOrderService) private basicCustomerOrderService: BasicCustomerOrderService;
  // 价格
  @Prop() price: number;
  // 订单ID
  @Prop() id: Number;

  private model = {
    amt: 0
  }
  private rules = {
    amt: { requeried: true, message: "请输入订单金额", trigger: "blur", type: "number" }
  }

  mounted() {
    if (this.price) {
      this.model.amt = this.price
    }
  }

  /**
   * 提交修改
   */
  submit() {
    return new Promise((resolve) => {
      if (this.model.amt === this.price) {
        this.$Message.info('与原金额一致，请重新填写')
        return resolve(false)
      }
      let form: any = this.$refs.form
      form.validate(v => {
        if (!v) return resolve(false)
        this.basicCustomerOrderService.updateOrderPrice(this.id, this.model.amt).subscribe(
          data => {
            this.$Message.success('操作成功')
            resolve(true)
          },
          err => {
            this.$Message.error(err.msg)
            resolve(false)
          }
        )
      })
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
