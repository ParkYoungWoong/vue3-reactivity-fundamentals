import { reactive, render } from './vue.js'
import { state } from './store.js'

const _this = reactive(state)
const reverseMsg = () => {
  _this.msg = _this.msg.split('').reverse().join('')
}

render(state, h => {
  return h('h1', {
    onclick: reverseMsg
  }, _this.msg)
})