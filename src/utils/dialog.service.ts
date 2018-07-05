import validator from 'async-validator'
import DialogBox from '~/components/common/dialog-box.vue'
import Vue from 'vue'
import { WSAESHUTDOWN } from 'constants';


export class DialogService {
  static instances = []
  /**
   * 显示弹出框
   * @param type 
   * @param option 
   */
  static show(option) {
    let store = window['__store']
    let router = window['__router']

    const Instance = new Vue({
      store,
      router,
      render(h) {
        let contentVNodes = option.render(h)
        let bodyVNodes = [contentVNodes]
        let footerVNodes = []
        if (option.footer && typeof option.footer === 'function') {
          footerVNodes.push(h('template', { slot: 'footer' }, [option.footer(h)]))
        }

        let vnode = h(DialogBox, {
          props: {
            width: option.width,
            title: option.title,
            footer: !!option.footer,
            value: true,
            okText: option.okText,
            onOk: option.onOk,
            cancelText: option.cancelText,
            onCancel: option.onCancel,
            onRemove: option.onRemove,
            isView: option.isView
          },
          on: {
            "on-remove": () => {
              let instance: any = vnode.componentInstance
              if (instance) {
                instance.remove()
              }
            }
          }
        }, [
            ...bodyVNodes,
            ...footerVNodes
          ])

        return vnode
      },
      computed: {

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
          this.onRemove();
        },
        onOk() { },
        onCancel() { },
        onRemove() {
          if (option.onRemove) option.onRemove()
        }
      }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const modal: any = Instance.$children[0];

    modal.remove = () => {
      let index = DialogService.instances.indexOf(x => x === modal)
      DialogService.instances.splice(index, 1)
      modal.$parent.remove()
    }

    DialogService.instances.push(modal)

    return modal
  }

  remove(modal) {
    let index = DialogService.instances.indexOf(x => x === modal)
    DialogService.instances.splice(index, 1)
    modal.visible = false;
    modal.$parent.remove();
  }

  public static clear() {
    DialogService.instances.forEach(modal => {
      modal.remove()
    })
  }
}
