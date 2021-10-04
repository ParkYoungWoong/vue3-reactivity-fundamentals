import { reactive, render } from './vue.js'
import { state } from './store.js'

const _this = reactive(state)

setTimeout(() => {
  _this.msg = 'Wow~'
}, 5000)

render(state, h => {
  return h('h2', {}, _this.msg)
})