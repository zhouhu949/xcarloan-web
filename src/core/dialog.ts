import Vue from "vue";

import Component from "vue-class-component";
import { Prop, Emit, Model } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";
import { Watch } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";

@Component({})
export default class Dialog extends Vue {
  @Model('visibleChange') visible: boolean

  @Emit('visibleChange')
  closeDialog(visible = false) { }

  @Watch('visible')
  onVisibleChange(value) {
    console.log(value)
    console.log(this)
  }
}
