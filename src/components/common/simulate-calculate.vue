<template>
    <section class="component simulate-calculate">
        <i-row style="margin-top:10px;">
            <i-col :span="5">
                <div style="border:1px solid #dddddd;height:30px;line-height:30px;">
                    <span style="margin-left:6px;color:#666666">产品分类</span>
                </div>
                <div style="border-left:1px solid #dddddd;border-right:1px solid #dddddd;border-bottom:1px solid #dddddd;position:relative;bottom:10px;height:520px;">
                    <i-tree :data="treeData" style="padding:10px;"></i-tree>
                </div>
            </i-col>
            <i-col :span="19">
                <!--<span>开呗参考价/成交价</span>-->
                <i-form :labelWidth="130" class="fromInput" style="position:relative;left:30px;">
                    <i-row class="bigFont">
                        <i-col :span="24">
                            <i-form-item label="开呗参考价/成交价">
                                <i-input style="display:inline-block;width:80%;"></i-input>
                            </i-form-item>
                        </i-col>
                    </i-row>

                    <i-row style="position:relative;bottom:20px;right:66px;">
                        <i-row>
                            <i-col :span="24" style="position:relative;top:20px;">
                                <i-form-item label="融资额">
                                    <i-input style="display:inline-block;width:37%"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col :span="12">
                                <i-form-item label="首付比例">
                                    <i-select>
                                        <i-option label="10%" value="10%" key="10%"></i-option>
                                        <i-option label="15%" value="15%" key="15%"></i-option>
                                        <i-option label="20%" value="20%" key="20%"></i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col :span="12">
                                <i-form-item label="首付金额">
                                    <i-input style="display:inline-block;"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row style="position:relative;bottom:19px;">
                            <i-col :span="12">
                                <i-form-item label="保证金比例">
                                    <i-select>
                                        <i-option label="10%" value="10%" key="10%"></i-option>
                                        <i-option label="15%" value="15%" key="15%"></i-option>
                                        <i-option label="20%" value="20%" key="20%"></i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col :span="12">
                                <i-form-item label="保证金金额">
                                    <i-input style="display:inline-block;"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row style="position:relative;bottom:36px;">
                            <i-col :span="24">
                                <i-form-item label="尾付金额">
                                    <i-input style="display:inline-block;width:37%"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row style="position:relative;bottom:53px;">
                            <i-col :span="12">
                                <i-form-item label="管理费率">
                                    <i-select>
                                        <i-option label="10%" value="10%" key="10%"></i-option>
                                        <i-option label="15%" value="15%" key="15%"></i-option>
                                        <i-option label="20%" value="20%" key="20%"></i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col :span="12">
                                <i-form-item label="管理费金额">
                                    <i-input style="display:inline-block;"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row style="position:relative;bottom:70px;">
                            <i-col :span="12">
                                <i-form-item label="融资期数">
                                    <i-select>
                                        <i-option label="12期" value="12期" key="12期"></i-option>
                                        <i-option label="24期" value="24期" key="24期"></i-option>
                                        <i-option label="36期" value="36期" key="36期"></i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col :span="12">
                                <i-form-item label="月供金额">
                                    <i-input style="display:inline-block;"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row style="position:relative;bottom:87px;">
                            <i-col :span="12">
                                <i-form-item label="月利率">
                                    <i-select>
                                        <i-option label="0.99" value="0.99" key="0.99"></i-option>
                                        <i-option label="1.03" value="1.03" key="1.03"></i-option>
                                        <i-option label="1.25" value="1.25" key="1.25"></i-option>
                                    </i-select>
                                </i-form-item>
                            </i-col>
                            <i-col :span="12">
                                <i-form-item label="还款方式">
                                    <i-input style="display:inline-block;"></i-input>
                                </i-form-item>
                            </i-col>
                        </i-row>
                    </i-row>
                    <i-row style="position:relative;bottom:40px;right:46px;" class="bigFont">
                        <i-col :span="24">
                            <i-form-item label="前期共支付">
                                <i-input style="display:inline-block;width:80%;margin-right:10px;"></i-input>
                                <i-button class="blueButton">计算</i-button>
                            </i-form-item>
                        </i-col>
                    </i-row>
                </i-form>
            </i-col>
        </i-row>

    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
@Component({
  components: {}
})
export default class SimulateCalculate extends Vue {
  private treeData: Array<Object>

  created() {
    this.treeData = [
      {
        title: '开呗融资租赁',
        expand: true,
        children: [
          {
            title: '直租',
            expand: true,
            children: [
              {
                title: '群泰融资'
              },
              {
                title: '开呗长租'
              },
              {
                title: '开呗长租'
              },
              {
                title: '龙江'
              },
              {
                title: '中金'
              }
            ]
          }
        ]
      }
    ]
  }
}
</script>
<style lang="less" scoped>
.simulate-calculate {
  .ivu-input,
  .ivu-select-selection {
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
  .blueButton {
    background: #265ea2;
    color: #fff;
  }
  .blueButton:hover {
    background: #1d4f8b;
    color: #fff;
  }
  .bigFont {
    .ivu-form-item-label {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>