import Vue from 'vue'
import { DialogService } from '~/utils/dialog.service'
export default {
  install() {
    Vue.prototype.$dialog = DialogService
  }
}
