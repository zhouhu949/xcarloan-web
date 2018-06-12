<!--功能模块-->
<template>
  <section class="component function-module">
    <span>功能名称：</span>
    <i-input class="form-input"></i-input>
    <span class="form-function-name" >功能名称：</span>
    <i-input></i-input>
    <i-select class="form-function-state" placeholder="全部状态">
      <i-option label="已启用" value="已启用" key="已启用"></i-option>
      <i-option label="未启用" value="未启用" key="未启用"></i-option>
    </i-select>
    <i-button class="blue-button">搜索</i-button>
    <i-button class="blue-button">添加</i-button>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";

  @Component({
    components: {
      DataBox
    }
  })

  export default class FunctionModule extends Vue {
    private columns1: any;
    private data1: Array < Object > = [];

    created() {
      this.columns1 = [{
          title: '序号',
          type: 'index',
          minWidth: 60,
          align: 'center'
        },
        {
          title: '操作',
          fixed:'left',
          minWidth: 170,
          align: 'center',
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: "#265EA2"
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: "#265EA2"
                }
              }, '移除')
            ])
          }
        },
        {
          title: '功能名称',
          key: 'functionName',
          align: 'center',
          minWidth: 120
        },
        {
          title: '功能标记',
          key: 'functionMark',
          align: 'center'
        },
        {
          title: '功能状态',
          key: 'functionStatus',
          align: 'center',
          minWidth: 100
        },
        {
          title: '操作人',
          key: 'operator',
          align: 'center',
          minWidth: 100
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          minWidth: 160
        },
        {
          title: '修改时间',
          key: 'modifyTime',
          align: 'center',
          minWidth: 160
        }
      ]
      this.data1 = [{
        functionName: '提交申请',
        functionMark: 'customerFileBtn',
        functionStatus: '启用',
        operator: '超级管理员',
        createTime: '2017-12-01 13:56:45',
        modifyTime: '2017-12-01 14:31:40'
      }]
    }
  }
</script>
<style lang="less" scoped>
    .component.function-module{
        .form-input{
            width:10%;
            display:inline-block;
        }
        .form-function-name{
            margin-left:10px;
        }
        .form-function-state{
            margin-left:10px;
            width:10%;
        }
        .blue-button{
            margin-left:10px;
            background: #265ea2;
            color: #fff;
        }

    }

</style>
