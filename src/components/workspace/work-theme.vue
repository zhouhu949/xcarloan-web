<template>
  <div class="component work-theme">
     <Poptip v-model="showTheme" placement="bottom-end">
        <!-- <Button type="ghost">click 激活</Button> -->
        <!--<i-button type="text" style="color:white">主题</i-button>-->
        <div slot="content" class="row center-span">
            <div class="theme-item" v-for="item in themeList" :key="item.name" :style="{background:item.color}" @click="showTheme=false,updateTheme(item.name)">
              <Icon type="checkmark-round" color="white" v-if="theme === item.name"></Icon>
            </div>
        </div>
    </Poptip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import { Prop } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";

@Component({})
export default class WorkTheme extends Vue {
  @State('theme')
  theme:String
  @State('themeList')
  themeList:String
  @Mutation('updateTheme')
  updateTheme:Function

  private showTheme:boolean = false
}
</script>

<style lang="less" scoped>
.theme-item{
  // display:inline-block;
  width:20px;
  height:20px;
  margin:10px;
  border-radius:100%;
}
</style>
