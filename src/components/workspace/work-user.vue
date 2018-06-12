<template>
  <div class="component work-theme">
     <Poptip title="提示标题" content="提示内容">
        <Button>
          <Icon type="contrast"></Icon>
        </Button>
    </Poptip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class WorkTheme extends Vue {

}
</script>
