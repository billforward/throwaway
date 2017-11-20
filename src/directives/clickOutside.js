export default {
  bind: (el, binding, vnode) => {
    this.event = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', this.event)
  },
  unbind: () => {
    document.body.removeEventListener('click', this.event)
  }
}
