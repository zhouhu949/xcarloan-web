import validator from 'async-validator'
import Loading from '~/components/common/loading.vue'
import Vue from 'vue'

export class LoadingService {
  /**
   * 显示弹出框
   * @param type 
   * @param option 
   */
  static show() {
    const Instance = new Vue({
      render(h) {
        let vnode = h(Loading, {
          props: {

          }
        })
        return vnode
      },
      methods: {
        remove() {
          setTimeout(() => {
            this.destroy();
          }, 300);
        },
        destroy() {
          this.$destroy();
          document.body.removeChild(this.$el);
        }
      }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal: any = Instance.$children[0];

    modal.remove = () => {
      modal.$parent.remove()
    }

    return modal
  }

  remove(modal) {
    modal.visible = false;
    modal.$parent.remove();
  }
}
